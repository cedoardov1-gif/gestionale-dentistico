import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://qzbrzqokeilypnhgmzeq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6YnJ6cW9rZWlseXBuaGdtemVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MjEwNjgsImV4cCI6MjA5MTM5NzA2OH0.0xJ0F7rJ0e9ph7Ga1c9pEW4otZbGcmYpogRFutZI4Ak',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true, // handles password reset redirect
    },
    realtime: {
      params: { eventsPerSecond: 10 }
    }
  }
)

