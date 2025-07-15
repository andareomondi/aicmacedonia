-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE event_category AS ENUM (
  'Sunday Service',
  'Youth Fellowship', 
  'Baptism',
  'Community Outreach',
  'CED Classes',
  'Choir Performance',
  'Wedding',
  'Conference',
  'Fellowship',
  'Children',
  'Worship',
  'Outreach'
);

CREATE TYPE sermon_category AS ENUM (
  'Faith',
  'Prayer',
  'Youth',
  'Love',
  'Hope',
  'Character',
  'Family',
  'Leadership',
  'Worship',
  'Service'
);

-- Sermons table
CREATE TABLE sermons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  pastor VARCHAR(100) NOT NULL,
  youtube_url TEXT NOT NULL,
  duration VARCHAR(20),
  category sermon_category,
  date_preached DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location VARCHAR(255),
  category event_category,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  category event_category,
  event_date DATE,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CED Groups table
CREATE TABLE ced_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  leader_name VARCHAR(100),
  leader_phone VARCHAR(20),
  leader_email VARCHAR(100),
  meeting_day VARCHAR(50),
  group_song VARCHAR(255),
  mission TEXT,
  vision TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Choirs table
CREATE TABLE choirs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT,
  youtube_url TEXT,
  leader_name VARCHAR(100),
  leader_phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE ced_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE choirs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for sermons" ON sermons FOR SELECT USING (true);
CREATE POLICY "Public read access for events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access for gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read access for ced_groups" ON ced_groups FOR SELECT USING (true);
CREATE POLICY "Public read access for choirs" ON choirs FOR SELECT USING (true);
CREATE POLICY "Public read access for notifications" ON notifications FOR SELECT USING (true);

-- Create policies for admin write access
CREATE POLICY "Admin write access for sermons" ON sermons FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin' OR 
  (auth.jwt() ->> 'raw_user_meta_data')::jsonb ->> 'role' = 'admin'
);

CREATE POLICY "Admin write access for events" ON events FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin' OR 
  (auth.jwt() ->> 'raw_user_meta_data')::jsonb ->> 'role' = 'admin'
);

CREATE POLICY "Admin write access for gallery" ON gallery FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin' OR 
  (auth.jwt() ->> 'raw_user_meta_data')::jsonb ->> 'role' = 'admin'
);

CREATE POLICY "Admin write access for ced_groups" ON ced_groups FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin' OR 
  (auth.jwt() ->> 'raw_user_meta_data')::jsonb ->> 'role' = 'admin'
);

CREATE POLICY "Admin write access for choirs" ON choirs FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin' OR 
  (auth.jwt() ->> 'raw_user_meta_data')::jsonb ->> 'role' = 'admin'
);

CREATE POLICY "Admin write access for notifications" ON notifications FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin' OR 
  (auth.jwt() ->> 'raw_user_meta_data')::jsonb ->> 'role' = 'admin'
);
