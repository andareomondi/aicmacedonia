import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Sermon {
  id: string
  title: string
  pastor: string
  youtube_url: string
  duration?: string
  category?: string
  date_preached: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description?: string
  event_date: string
  start_time?: string
  end_time?: string
  location?: string
  category?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  title: string
  image_url: string
  category?: string
  event_date?: string
  comment?: string
  created_at: string
  updated_at: string
}

export interface CEDGroup {
  id: string
  name: string
  description?: string
  leader_name?: string
  leader_phone?: string
  leader_email?: string
  meeting_day?: string
  group_song?: string
  mission?: string
  vision?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Choir {
  id: string
  name: string
  description?: string
  image_url?: string
  youtube_url?: string
  leader_name?: string
  leader_phone?: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type?: string
  read: boolean
  created_at: string
}
