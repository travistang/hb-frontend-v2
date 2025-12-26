import {
  Attendance,
  Event,
  EventDetails,
  EventServiceProvider,
  NewsFeedPicture,
  Route,
  RouteDetails,
  User,
} from "./types";
import { mockRouteDetails } from "./mock-route-details";

// Mock data storage (in-memory)
const mockEvents: EventDetails[] = [
  {
    id: 1,
    routeDetails: mockRouteDetails[0],
    title: "Sunrise Hike to Mount Peak",
    description: "Join us for an early morning hike to catch the sunrise",
    start: "2024-12-25T06:00:00Z",
    meeting_point: "Trailhead parking lot",
    city: "San Francisco",
    activity: "hiking",
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
    pictures_uploaded: [],
    route: {
      id: 1,
      name: "Mount Peak Trail",
      distance: 9.7,
      elevation_gain: 1200,
      duration: 240,
      sac_scale: 2,
    },
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
    start: "2024-12-30T08:00:00Z",
    meeting_point: "Main campground entrance",
    city: "Lake Tahoe",
    activity: "camping",
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
    route: {
      id: 2,
      name: "Mountain Loop Trail",
      distance: 12.0,
      elevation_gain: 800,
      duration: 360,
      sac_scale: 1,
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
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [...mockEvents];
  }

  async getEvent(id: number): Promise<EventDetails | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 50));
    const event = mockEvents.find((e) => e.id === id);
    if (!event) {
      return null;
    }
    return event;
  }

  async createEvent(
    event: Omit<Event, "id" | "created_at" | "updated_at">
  ): Promise<Event> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 150));
    const now = new Date().toISOString();
    const newEvent: Event = {
      ...event,
      id: nextId++,
      created_at: now,
      updated_at: now,
    };
    mockEvents.push({
      ...newEvent,
      organizer: newEvent.organizer as User,
      route: newEvent.route as Route,
      participants: [],
      waitingList: [],
      routeDetails: mockRouteDetails.find(
        (route) => route.id === newEvent.route?.id
      ) as RouteDetails,
      attendance: newEvent.attendance as Attendance,
      pictures_uploaded: newEvent.pictures_uploaded as NewsFeedPicture[],
      num_of_days: newEvent.num_of_days as number,
      max_participants: newEvent.max_participants as number,
      created_at: newEvent.created_at as string,
      updated_at: newEvent.updated_at as string,
    });
    return { ...newEvent };
  }

  async updateEvent(
    id: number,
    event: Partial<Omit<Event, "id" | "created_at" | "updated_at">>
  ): Promise<Event> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));
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
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 80));
    const index = mockEvents.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`Event with id ${id} not found`);
    }
    mockEvents.splice(index, 1);
  }

  async getRouteDetails(routeId: number): Promise<RouteDetails | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockRouteDetails.find((route) => route.id === routeId) || null;
  }

  async getRouteDetailsList(): Promise<RouteDetails[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [...mockRouteDetails];
  }
}
