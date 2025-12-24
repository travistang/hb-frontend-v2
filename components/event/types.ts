import { Activity } from "@/services/event-service/validator";

export type EventData = {
  id?: number | string;
  title?: string;
  start?: string;
  city?: {
    name?: string;
  };
  activity_name?: string;
  activity?: Activity;
  organizer?: {
    name?: string;
    last_name?: string;
    picture?: string;
  };
  attendance?: {
    going?: number;
    spaces?: number;
    waiting?: number;
    is_car_pool?: boolean;
  };
  route?: {
    distance?: number;
    elevation_gain?: number;
    duration?: string;
    sac_scale?: string | number;
  };
  cover_picture_url?: string;
  pictures_uploaded?: NewsFeedPicture[];
};

export type NewsFeedEvent = {
  id: number;
  title?: string;
  start?: string;
  attendance?: {
    going?: number;
    spaces?: number;
    waiting?: number;
    is_car_pool?: boolean;
    max_limit?: number;
  };
  activity?: Activity;
  num_of_days?: number;
  route?: any;
  organizer?: {
    last_name?: string;
    name?: string;
    picture?: string;
    id?: number;
    experience_level_category?: string;
  };
  city?: {
    name?: string;
    cordinates?: [number, number];
  };
  user_status?: any;
  pictures_uploaded?: NewsFeedPicture[];
};

export type EventCardProps = {
  event: EventData;
  variant?: "standard" | "community";
  onOpenGallery?: (pictures: NewsFeedPicture[], initialIndex: number) => void;
};

export type NewsFeedPicture = {
  id?: number;
  thumb?: string;
  url?: string;
  uploaded_at?: string;
  owner?: string;
};

export type NewsFeedResponse = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: NewsFeedEvent[];
};

export type DashboardResponse = {
  personal_info?: {
    first_name?: string;
    points?: number;
    experience_level_category?: string;
    profile_picture?: string[];
  };
  user_relevant_events?: Array<[boolean, any]>;
  user_upcoming_events?: Array<[boolean, any]>;
  user_recent_events?: Array<[boolean, any]>;
};
