import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dophwxycytroikokijwn.supabase.co'
// Using the provided anon public key (client-safe)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcGh3eHljeXRyb2lrb2tpanduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODk3MDksImV4cCI6MjA4Nzk2NTcwOX0.RmKFxYz0wVPvkD8xT1HXHkpubGRV9vEh51yjk2l1D8k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
