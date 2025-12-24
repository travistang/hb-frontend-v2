export type User = {
  id: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  username?: string;
  profile_picture?: string[];
  experience_level_category?: string;
  points?: number;
  created_at?: string;
  updated_at?: string;
};

export interface UserServiceProvider {
  getMe(): Promise<User | null>;
  login(username: string, password: string): Promise<boolean>;
  logout(): Promise<void>;
  getUserById(id: number): Promise<User | null>;
}
