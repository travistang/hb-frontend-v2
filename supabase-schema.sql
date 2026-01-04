-- Create hiking_users table
CREATE TABLE IF NOT EXISTS hiking_users (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  name TEXT,
  username TEXT UNIQUE,
  profile_picture TEXT[],
  experience_level_category TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create routes table
CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    name TEXT,
    distance NUMERIC(10, 2),
    elevationGain NUMERIC(10, 2),
    duration TEXT,
    sacScale INTEGER CHECK (
        sacScale >= 0
        AND sacScale <= 6
    ),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create hiking_events table
CREATE TABLE IF NOT EXISTS hiking_events (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    event_start TIMESTAMP,
    meeting_point TEXT,
    city JSONB, -- Stores {name: string, coordinates: [number, number]}
    activity TEXT,
    activity_name TEXT,
    organizer_id INTEGER NOT NULL REFERENCES hiking_users (id) ON DELETE RESTRICT,
    route_id INTEGER REFERENCES routes (id) ON DELETE SET NULL,
    cover_picture_url TEXT,
    pictures_uploaded JSONB, -- Array of picture objects
    num_of_days INTEGER,
    max_participants INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create participation table
CREATE TABLE IF NOT EXISTS participation (
    participant INTEGER NOT NULL REFERENCES hiking_users (id) ON DELETE CASCADE,
    event INTEGER NOT NULL REFERENCES hiking_events (id) ON DELETE CASCADE,
    waitlisted BOOLEAN DEFAULT FALSE,
    participated_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (participant, event)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_hiking_events_organizer_id ON hiking_events (organizer_id);

CREATE INDEX IF NOT EXISTS idx_hiking_events_route_id ON hiking_events (route_id);

CREATE INDEX IF NOT EXISTS idx_hiking_events_event_start ON hiking_events (event_start);

CREATE INDEX IF NOT EXISTS idx_participation_event ON participation(event);

CREATE INDEX IF NOT EXISTS idx_participation_participant ON participation (participant);

CREATE INDEX IF NOT EXISTS idx_hiking_users_username ON hiking_users (username);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_hiking_users_updated_at
  BEFORE UPDATE ON hiking_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routes_updated_at
  BEFORE UPDATE ON routes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hiking_events_updated_at
  BEFORE UPDATE ON hiking_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();