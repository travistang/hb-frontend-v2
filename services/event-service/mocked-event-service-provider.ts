import {
  Attendance,
  Event,
  EventDetails,
  EventServiceProvider,
  NewsFeedPicture,
  User,
} from "./types";
import { RouteDetails } from "../route-service/types";
import { mockRouteDetails } from "./mock-route-details";

// Mock data storage (in-memory)
const mockEvents: EventDetails[] = [
  {
    id: 1,
    routeDetails: mockRouteDetails[0],
    title: "Sunrise Hike to Mount Peak",
    description: "Join us for an early morning hike to catch the sunrise",
    start: "2025-01-15T06:00:00Z",
    meeting_point: "Trailhead parking lot",
    city: { name: "San Francisco", coordinates: [37.7749, -122.4194] },
    activity: "HI",
    activity_name: "Hiking",
    participants: [
      {
        id: 4,
        name: "Patrick",
        last_name: "Patrick",
        first_name: "Name",
        picture: "/avatars/patrick.jpg",
        experience_level_category: "Advanced",
      },
      {
        id: 5,
        name: "Max",
        last_name: "Max",
        first_name: "Jane",
        picture: "/avatars/max.jpg",
        experience_level_category: "Advanced",
      },
      {
        id: 6,
        name: "Alex",
        last_name: "Smith",
        first_name: "Alex",
        picture: "/avatars/alex.jpg",
        experience_level_category: "Intermediate",
      },
      {
        id: 7,
        name: "Sarah",
        last_name: "Johnson",
        first_name: "Sarah",
        picture: "/avatars/sarah.jpg",
        experience_level_category: "Beginner",
      },
      {
        id: 8,
        name: "Mike",
        last_name: "Wilson",
        first_name: "Mike",
        picture: "/avatars/mike.jpg",
        experience_level_category: "Intermediate",
      },
    ],
    waitingList: [],
    organizer: {
      id: 1,
      name: "John",
      last_name: "Doe",
      first_name: "John",
      picture: "/avatars/john.jpg",
      experience_level_category: "Intermediate",
    },
    attendance: {
      going: 5,
      spaces: 10,
      waiting: 0,
    },
    pictures_uploaded: [
      {
        id: 101,
        thumb: "https://picsum.photos/seed/hike1/200/150",
        url: "https://picsum.photos/seed/hike1/800/600",
        uploaded_at: "2025-01-10T14:30:00Z",
        owner: "John Doe",
      },
      {
        id: 102,
        thumb: "https://picsum.photos/seed/hike2/200/150",
        url: "https://picsum.photos/seed/hike2/800/600",
        uploaded_at: "2025-01-10T15:45:00Z",
        owner: "Patrick Patrick",
      },
      {
        id: 103,
        thumb: "https://picsum.photos/seed/hike3/200/150",
        url: "https://picsum.photos/seed/hike3/800/600",
        uploaded_at: "2025-01-10T16:20:00Z",
        owner: "Alex Smith",
      },
    ],
    cover_picture_url: "/events/mount-peak.jpg",
    num_of_days: 1,
    max_participants: 15,
    created_at: "2024-12-01T10:00:00Z",
    updated_at: "2024-12-01T10:00:00Z",
  },
  {
    id: 2,
    routeDetails: mockRouteDetails[1],
    title: "Weekend Camping Trip",
    description: "Two-day camping adventure in the mountains",
    start: "2025-01-25T08:00:00Z",
    meeting_point: "Main campground entrance",
    city: { name: "Lake Tahoe", coordinates: [39.0968, -120.0324] },
    activity: "HI",
    activity_name: "Camping",
    waitingList: [
      {
        id: 17,
        name: "Kevin",
        last_name: "Rodriguez",
        first_name: "Kevin",
        picture: "/avatars/kevin.jpg",
        experience_level_category: "Beginner",
      },
      {
        id: 18,
        name: "Maya",
        last_name: "Kim",
        first_name: "Maya",
        picture: "/avatars/maya.jpg",
        experience_level_category: "Intermediate",
      },
    ],
    participants: [
      {
        id: 9,
        name: "Emma",
        last_name: "Davis",
        first_name: "Emma",
        picture: "/avatars/emma.jpg",
        experience_level_category: "Intermediate",
      },
      {
        id: 10,
        name: "Chris",
        last_name: "Brown",
        first_name: "Chris",
        picture: "/avatars/chris.jpg",
        experience_level_category: "Advanced",
      },
      {
        id: 11,
        name: "Lisa",
        last_name: "Garcia",
        first_name: "Lisa",
        picture: "/avatars/lisa.jpg",
        experience_level_category: "Beginner",
      },
      {
        id: 12,
        name: "Tom",
        last_name: "Miller",
        first_name: "Tom",
        picture: "/avatars/tom.jpg",
        experience_level_category: "Advanced",
      },
      {
        id: 13,
        name: "Rachel",
        last_name: "Lee",
        first_name: "Rachel",
        picture: "/avatars/rachel.jpg",
        experience_level_category: "Intermediate",
      },
      {
        id: 14,
        name: "David",
        last_name: "Taylor",
        first_name: "David",
        picture: "/avatars/david.jpg",
        experience_level_category: "Intermediate",
      },
      {
        id: 15,
        name: "Anna",
        last_name: "Martinez",
        first_name: "Anna",
        picture: "/avatars/anna.jpg",
        experience_level_category: "Beginner",
      },
      {
        id: 16,
        name: "James",
        last_name: "Anderson",
        first_name: "James",
        picture: "/avatars/james.jpg",
        experience_level_category: "Advanced",
      },
    ],
    organizer: {
      id: 2,
      name: "Jane",
      last_name: "Smith",
      first_name: "Jane",
      picture: "/avatars/jane.jpg",
      experience_level_category: "Advanced",
    },
    pictures_uploaded: [],
    attendance: {
      going: 8,
      spaces: 7,
      waiting: 2,
    },
    cover_picture_url: "/events/camping.jpg",
    num_of_days: 2,
    max_participants: 15,
    created_at: "2024-12-05T14:00:00Z",
    updated_at: "2024-12-05T14:00:00Z",
  },
];

let nextId = 3;

export class MockedEventServiceProvider implements EventServiceProvider {
  async getEvents(): Promise<Event[]> {
    return [...mockEvents];
  }

  async getEventDetails(): Promise<EventDetails[]> {
    return [...mockEvents];
  }

  async getEvent(id: number): Promise<EventDetails | null> {
    const event = mockEvents.find((e) => e.id === id);
    if (!event) {
      return null;
    }
    return event;
  }

  async createEvent(
    event: Omit<Event, "id" | "created_at" | "updated_at">
  ): Promise<EventDetails> {
    const now = new Date().toISOString();
    const newEventId = nextId++;
    const routeDetails = event.route
      ? (mockRouteDetails.find(
          (route) => route.id === event.route?.id
        ) as RouteDetails)
      : mockRouteDetails[0];

    const newEventDetails: EventDetails = {
      id: newEventId,
      title: event.title,
      description: event.description,
      start: event.start,
      meeting_point: event.meeting_point,
      city: event.city,
      activity: event.activity,
      activity_name: event.activity_name,
      cover_picture_url: event.cover_picture_url,
      organizer: (event.organizer as User) || mockEvents[0].organizer,
      participants: [],
      waitingList: [],
      routeDetails: routeDetails,
      attendance: (event.attendance as Attendance) || {
        going: 0,
        spaces: 10,
        waiting: 0,
      },
      pictures_uploaded: (event.pictures_uploaded as NewsFeedPicture[]) || [],
      num_of_days: (event.num_of_days as number) || 1,
      max_participants: (event.max_participants as number) || 10,
      created_at: now,
      updated_at: now,
    };
    mockEvents.push(newEventDetails);
    return newEventDetails;
  }

  async updateEvent(
    id: number,
    event: Partial<Omit<Event, "id" | "created_at" | "updated_at">>
  ): Promise<Event> {
    const index = mockEvents.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`Event with id ${id} not found`);
    }
    const updatedEvent = {
      ...mockEvents[index],
      ...event,
      id,
      updated_at: new Date().toISOString(),
    };
    mockEvents[index] = updatedEvent;
    return { ...updatedEvent };
  }

  async deleteEvent(id: number): Promise<void> {
    const index = mockEvents.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`Event with id ${id} not found`);
    }
    mockEvents.splice(index, 1);
  }

  async getRouteDetails(routeId: number): Promise<RouteDetails | null> {
    return mockRouteDetails.find((route) => route.id === routeId) || null;
  }

  async getRouteDetailsList(): Promise<RouteDetails[]> {
    return [...mockRouteDetails];
  }
}
