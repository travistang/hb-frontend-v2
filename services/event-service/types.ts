export type Route = {
  id: number;
  name?: string;
  distance?: number;
  elevation_gain?: number;
  duration?: number; // in minutes
  rating?: number; // ELO-style rating (800-4000)
  sac_scale?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

// TODO: subject to change once clear
export enum Terrain {
  Gravel = "gravel",
  Dirt = "dirt",
  Grass = "grass",
  Pavement = "pavement",
  Snow = "snow",
}

export type RouteDetails = Route & {
  boundingBox: {
    minLatitude: number;
    maxLatitude: number;
    minLongitude: number;
    maxLongitude: number;
  };
  waypoints: { latitude: number; longitude: number; elevation: number }[];
  terrainSegments: { type: Terrain; start: number; end: number }[];
  sacScaleSegments: { sacScale: number; start: number; end: number }[];
  peaks: {
    index: number;
    name: string;
    elevation: number;
  }[];
  huts: {
    index: number;
    name: string;
    elevation: number;
  }[];
  elevationLost: number;
  highestPoint: number;
};

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

export type EventDetails = Event & {
  organizer: User;
  route: Route;
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
