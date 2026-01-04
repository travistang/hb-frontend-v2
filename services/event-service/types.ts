import { RouteDetails } from "../route-service/types";
import { Activity } from "./validator";

export type User = {
  id: number;
  name?: string;
  last_name?: string;
  picture?: string;
  first_name?: string;
  experience_level_category?: string;
};

export type Attendance = {
  going?: number;
  spaces?: number;
  waiting?: number;
  is_car_pool?: boolean;
  max_limit?: number;
};

export type NewsFeedPicture = {
  id?: number;
  thumb?: string;
  url?: string;
  uploaded_at?: string;
  owner?: string;
};

export type City = {
  name?: string;
  coordinates?: [number, number];
};

export type EventRoute = {
  id?: number;
  name?: string;
  distance?: number;
  elevationGain?: number;
  duration?: string;
  sacScale?: number | string;
};

export type Event = {
  id: number;
  title?: string;
  description?: string;
  start?: string;
  meeting_point?: string;
  city?: City;
  activity?: Activity;
  activity_name?: string;
  organizer?: User;
  attendance?: Attendance;
  route?: EventRoute;
  cover_picture_url?: string;
  pictures_uploaded?: NewsFeedPicture[];
  num_of_days?: number;
  max_participants?: number;
  created_at?: string;
  updated_at?: string;
  user_status?: unknown;
  // Foreign keys for create/update operations
  organizer_id?: number;
  route_id?: number;
};

export type EventDetails = Omit<Event, "route"> & {
  organizer: User;
  routeDetails: RouteDetails;
  participants: User[];
  waitingList: User[];
  attendance: Attendance;
  pictures_uploaded: NewsFeedPicture[];
  num_of_days: number;
  max_participants: number;
  created_at: string;
  updated_at: string;
};

// Types for API responses - consumed by frontend

export type NewsFeedResponse = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Event[];
};

export type PersonalInfo = {
  first_name?: string;
  points?: number;
  experience_level_category?: string;
  profile_picture?: string[];
};

export type DashboardResponse = {
  personal_info?: PersonalInfo;
  user_relevant_events?: Array<[boolean, Event]>;
  user_upcoming_events?: Array<[boolean, Event]>;
  user_recent_events?: Array<[boolean, Event]>;
};

export interface EventServiceProvider {
  getEvents(): Promise<Event[]>;
  getEventDetails(): Promise<EventDetails[]>;
  getEvent(id: number): Promise<EventDetails | null>;
  createEvent(
    event: Omit<Event, "id" | "created_at" | "updated_at">
  ): Promise<Event>;
  updateEvent(
    id: number,
    event: Partial<Omit<Event, "id" | "created_at" | "updated_at">>
  ): Promise<Event>;
  deleteEvent(id: number): Promise<void>;
}
