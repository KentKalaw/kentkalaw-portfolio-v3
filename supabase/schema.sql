-- Supabase SQL Schema for Chat Messages
-- Run this in your Supabase SQL Editor to create the necessary table

-- Create the chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on session_id for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);

-- Create an index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert messages (for anonymous chat)
CREATE POLICY "Allow anonymous inserts" ON chat_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a policy that allows anyone to read messages from their session
CREATE POLICY "Allow anonymous reads" ON chat_messages
  FOR SELECT
  TO anon
  USING (true);

-- Optional: Create a function to clean up old sessions (older than 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_chat_sessions()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM chat_messages
  WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$;

-- Optional: Schedule the cleanup function to run daily using pg_cron
-- Note: pg_cron needs to be enabled in your Supabase project settings
-- SELECT cron.schedule('cleanup-old-chats', '0 0 * * *', 'SELECT cleanup_old_chat_sessions()');
