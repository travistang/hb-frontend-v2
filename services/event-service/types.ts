import { Route, RouteDetails, Terrain } from "../route-service/types";

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

export type Event = {
  id: number;
  title?: string;
  description?: string;
  start?: string;
  meeting_point?: string;
  city?: string;
  activity?: string;
  activity_name?: string;
  organizer?: User;
  attendance?: Attendance;
  route?: Route;
  cover_picture_url?: string;
  pictures_uploaded?: NewsFeedPicture[];
  num_of_days?: number;
  max_participants?: number;
  created_at?: string;
  updated_at?: string;
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

export interface EventServiceProvider {
  getEvents(): Promise<Event[]>;
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
