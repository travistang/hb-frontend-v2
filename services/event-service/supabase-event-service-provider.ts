import { SupabaseClient } from "@supabase/supabase-js";
import { Event, EventDetails, EventServiceProvider } from "./types";

// Supabase-specific database event type
type DatabaseEvent = {
  id: number;
  title?: string;
  description?: string;
  event_start?: string;
  meeting_point?: string;
  city?: { name?: string; coordinates?: [number, number] } | string;
  activity?: string;
  activity_name?: string;
  organizer_id?: number;
  route_id?: number;
  cover_picture_url?: string;
  pictures_uploaded?: any;
  num_of_days?: number;
  max_participants?: number;
  created_at?: string;
  updated_at?: string;
  organizer?: {
    id: number;
    name?: string;
    last_name?: string;
    first_name?: string;
    picture?: string;
    experience_level_category?: string;
  };
  route?: {
    id: number;
    name?: string;
    distance?: number;
    elevationGain?: number;
    duration?: number;
    sacScale?: number;
  };
};

export class SupabaseEventServiceProvider implements EventServiceProvider {
  constructor(private readonly supabase: SupabaseClient) {}

  private convertDatabaseEventToEvent(
    dbEvent: DatabaseEvent,
    attendance?: {
      going?: number;
      spaces?: number;
      waiting?: number;
    }
  ): Event {
    // Parse city if it's a string (JSON)
    let city: { name?: string; coordinates?: [number, number] } | undefined;
    if (dbEvent.city) {
      if (typeof dbEvent.city === "string") {
        try {
          city = JSON.parse(dbEvent.city);
        } catch {
          city = { name: dbEvent.city };
        }
      } else {
        city = dbEvent.city;
      }
    }

    return {
      id: dbEvent.id,
      title: dbEvent.title,
      description: dbEvent.description,
      start: dbEvent.event_start,
      meeting_point: dbEvent.meeting_point,
      city: city?.name ?? "",
      activity: dbEvent.activity,
      activity_name: dbEvent.activity_name,
      organizer: dbEvent.organizer
        ? {
            id: dbEvent.organizer.id,
            name: dbEvent.organizer.name,
            last_name: dbEvent.organizer.last_name,
            first_name: dbEvent.organizer.first_name,
            picture: dbEvent.organizer.picture,
            experience_level_category:
              dbEvent.organizer.experience_level_category,
          }
        : undefined,
      attendance: attendance
        ? {
            going: attendance.going,
            spaces: attendance.spaces,
            waiting: attendance.waiting,
          }
        : undefined,
      route: dbEvent.route
        ? {
            id: dbEvent.route.id,
            name: dbEvent.route.name,
            distance: dbEvent.route.distance,
            elevationGain: dbEvent.route.elevationGain,
            duration: dbEvent.route.duration,
            sacScale: dbEvent.route.sacScale as
              | 0
              | 1
              | 2
              | 3
              | 4
              | 5
              | 6
              | undefined,
          }
        : undefined,
      cover_picture_url: dbEvent.cover_picture_url,
      pictures_uploaded: Array.isArray(dbEvent.pictures_uploaded)
        ? dbEvent.pictures_uploaded
        : undefined,
      num_of_days: dbEvent.num_of_days,
      max_participants: dbEvent.max_participants,
      created_at: dbEvent.created_at,
      updated_at: dbEvent.updated_at,
      organizer_id: dbEvent.organizer_id,
      route_id: dbEvent.route_id,
    };
  }

  private async getAttendanceForEvents(
    eventIds: number[],
    events: DatabaseEvent[]
  ): Promise<
    Map<
      number,
      {
        going: number;
        spaces: number;
        waiting: number;
      }
    >
  > {
    if (eventIds.length === 0) {
      return new Map();
    }

    // Create a map of event_id -> max_participants for quick lookup
    const maxParticipantsMap = new Map<number, number | undefined>();
    for (const event of events) {
      maxParticipantsMap.set(event.id, event.max_participants);
    }

    // Get participation data with waitlisted field for events
    const { data: participations, error } = await this.supabase
      .from("participation")
      .select("event, waitlisted")
      .in("event", eventIds);

    if (error) {
      console.error("Error fetching participation data:", error);
      return new Map();
    }

    // Initialize counts for all events
    const counts = new Map<
      number,
      { going: number; spaces: number; waiting: number }
    >();

    for (const eventId of eventIds) {
      counts.set(eventId, { going: 0, spaces: 0, waiting: 0 });
    }

    // Count participations per event
    if (participations) {
      for (const participation of participations) {
        const eventId = participation.event;
        const maxParticipants = maxParticipantsMap.get(eventId);
        const current = counts.get(eventId) || {
          going: 0,
          spaces: 0,
          waiting: 0,
        };

        const isWaitlisted = participation.waitlisted === true;

        if (isWaitlisted) {
          // Count as waiting
          current.waiting = (current.waiting || 0) + 1;
        } else {
          // Count as going (up to max_participants)
          const currentGoing = current.going || 0;
          if (maxParticipants === undefined || currentGoing < maxParticipants) {
            current.going = currentGoing + 1;
          } else {
            // Beyond max_participants, count as waiting
            current.waiting = (current.waiting || 0) + 1;
          }
        }

        counts.set(eventId, current);
      }
    }

    // Calculate spaces for each event
    for (const eventId of eventIds) {
      const count = counts.get(eventId)!;
      const maxParticipants = maxParticipantsMap.get(eventId);
      if (maxParticipants !== undefined) {
        count.spaces = Math.max(0, maxParticipants - count.going);
      }
    }

    return counts;
  }

  async getEvents(): Promise<Event[]> {
    // Query events with joins for organizer and route
    const { data: dbEvents, error } = await this.supabase
      .from("hiking_events")
      .select(
        `
        *,
        organizer:hiking_users!hiking_events_organizer_id_fkey (
          id,
          name,
          last_name,
          first_name,
          picture,
          experience_level_category
        ),
        route:routes!hiking_events_route_id_fkey (
          id,
          name,
          distance,
          elevationGain,
          duration,
          sacScale
        )
      `
      )
      .order("event_start", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch events: ${error.message}`);
    }

    if (!dbEvents || dbEvents.length === 0) {
      return [];
    }

    // Get attendance data for all events
    const eventIds = dbEvents.map((e: DatabaseEvent) => e.id);
    const attendanceMap = await this.getAttendanceForEvents(
      eventIds,
      dbEvents as DatabaseEvent[]
    );

    // Convert database events to Event type
    return dbEvents.map((dbEvent: DatabaseEvent) => {
      const attendance = attendanceMap.get(dbEvent.id);
      return this.convertDatabaseEventToEvent(dbEvent, attendance);
    });
  }

  async getEvent(id: number): Promise<EventDetails | null> {
    // Query single event with joins
    // const { data: dbEvent, error } = await this.supabase
    //   .from("hiking_events")
    //   .select(
    //     `
    //     *,
    //     organizer:hiking_users!hiking_events_organizer_id_fkey (
    //       id,
    //       name,
    //       last_name,
    //       first_name,
    //       picture,
    //       experience_level_category
    //     ),
    //     route:routes!hiking_events_route_id_fkey (
    //       id,
    //       name,
    //       distance,
    //       elevationGain,
    //       duration,
    //       sacScale
    //     )
    //   `
    //   )
    //   .eq("id", id)
    //   .single();

    // if (error) {
    //   throw new Error(`Failed to fetch event: ${error.message}`);
    // }

    // if (!dbEvent) {
    //   throw new Error(`Event with id ${id} not found`);
    // }

    // // Get attendance data
    // const attendanceMap = await this.getAttendanceForEvents(
    //   [id],
    //   [dbEvent as DatabaseEvent]
    // );
    // const attendance = attendanceMap.get(id);

    // return this.convertDatabaseEventToEvent(
    //   dbEvent as DatabaseEvent,
    //   attendance
    // );
    throw new Error("Not implemented");
  }

  async createEvent(
    event: Omit<Event, "id" | "created_at" | "updated_at">
  ): Promise<Event> {
    // Prepare data for insertion (convert camelCase to snake_case, handle nested objects)
    const insertData: any = {
      title: event.title,
      description: event.description,
      event_start: event.start,
      meeting_point: event.meeting_point,
      activity: event.activity,
      activity_name: event.activity_name,
      cover_picture_url: event.cover_picture_url,
      num_of_days: event.num_of_days,
      max_participants: event.max_participants,
      pictures_uploaded: event.pictures_uploaded,
    };

    // Handle city (convert to JSON string if object)
    if (event.city) {
      insertData.city =
        typeof event.city === "string"
          ? event.city
          : JSON.stringify(event.city);
    }

    // Handle foreign keys
    if (event.organizer_id !== undefined) {
      insertData.organizer_id = event.organizer_id;
    } else if (event.organizer?.id) {
      insertData.organizer_id = event.organizer.id;
    }

    if (event.route_id !== undefined) {
      insertData.route_id = event.route_id;
    } else if (event.route?.id) {
      insertData.route_id = event.route.id;
    }

    // Insert event
    const { data: dbEvent, error } = await this.supabase
      .from("hiking_events")
      .insert(insertData)
      .select(
        `
        *,
        organizer:hiking_users!hiking_events_organizer_id_fkey (
          id,
          name,
          last_name,
          first_name,
          picture,
          experience_level_category
        ),
        route:routes!hiking_events_route_id_fkey (
          id,
          name,
          distance,
          elevationGain,
          duration,
          sacScale
        )
      `
      )
      .single();

    if (error) {
      throw new Error(`Failed to create event: ${error.message}`);
    }

    if (!dbEvent) {
      throw new Error("Failed to create event: No data returned");
    }

    return this.convertDatabaseEventToEvent(dbEvent as DatabaseEvent);
  }

  async updateEvent(
    id: number,
    event: Partial<Omit<Event, "id" | "created_at" | "updated_at">>
  ): Promise<Event> {
    // Prepare update data
    const updateData: any = {};

    if (event.title !== undefined) updateData.title = event.title;
    if (event.description !== undefined)
      updateData.description = event.description;
    if (event.start !== undefined) updateData.event_start = event.start;
    if (event.meeting_point !== undefined)
      updateData.meeting_point = event.meeting_point;
    if (event.activity !== undefined) updateData.activity = event.activity;
    if (event.activity_name !== undefined)
      updateData.activity_name = event.activity_name;
    if (event.cover_picture_url !== undefined)
      updateData.cover_picture_url = event.cover_picture_url;
    if (event.num_of_days !== undefined)
      updateData.num_of_days = event.num_of_days;
    if (event.max_participants !== undefined)
      updateData.max_participants = event.max_participants;
    if (event.pictures_uploaded !== undefined)
      updateData.pictures_uploaded = event.pictures_uploaded;

    // Handle city
    if (event.city !== undefined) {
      updateData.city =
        typeof event.city === "string"
          ? event.city
          : JSON.stringify(event.city);
    }

    // Handle foreign keys
    if (event.organizer_id !== undefined) {
      updateData.organizer_id = event.organizer_id;
    } else if (event.organizer?.id !== undefined) {
      updateData.organizer_id = event.organizer.id;
    }

    if (event.route_id !== undefined) {
      updateData.route_id = event.route_id;
    } else if (event.route?.id !== undefined) {
      updateData.route_id = event.route.id;
    }

    // Update event
    const { data: dbEvent, error } = await this.supabase
      .from("hiking_events")
      .update(updateData)
      .eq("id", id)
      .select(
        `
        *,
        organizer:hiking_users!hiking_events_organizer_id_fkey (
          id,
          name,
          last_name,
          first_name,
          picture,
          experience_level_category
        ),
        route:routes!hiking_events_route_id_fkey (
          id,
          name,
          distance,
          elevationGain,
          duration,
          sacScale
        )
      `
      )
      .single();

    if (error) {
      throw new Error(`Failed to update event: ${error.message}`);
    }

    if (!dbEvent) {
      throw new Error(`Event with id ${id} not found`);
    }

    // Get attendance data
    const attendanceMap = await this.getAttendanceForEvents(
      [id],
      [dbEvent as DatabaseEvent]
    );
    const attendance = attendanceMap.get(id);

    return this.convertDatabaseEventToEvent(
      dbEvent as DatabaseEvent,
      attendance
    );
  }

  async deleteEvent(id: number): Promise<void> {
    // Delete participation records first (cascade delete should handle this, but being explicit)
    const { error: participationError } = await this.supabase
      .from("participation")
      .delete()
      .eq("event", id);

    if (participationError) {
      console.warn(
        `Warning: Failed to delete participation records: ${participationError.message}`
      );
    }

    // Delete the event
    const { error } = await this.supabase
      .from("hiking_events")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to delete event: ${error.message}`);
    }
  }
}
