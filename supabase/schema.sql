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

-- ============================================
-- BLOGS TABLE SCHEMA
-- ============================================

-- Create the blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_blogs_slug
  ON blogs (slug);

CREATE INDEX IF NOT EXISTS idx_blogs_created_at
  ON blogs (created_at DESC);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Public can read blogs (both anon and authenticated)
CREATE POLICY "blogs_public_select"
  ON blogs
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can INSERT
CREATE POLICY "blogs_authenticated_insert"
  ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can UPDATE
CREATE POLICY "blogs_authenticated_update"
  ON blogs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can DELETE
CREATE POLICY "blogs_authenticated_delete"
  ON blogs
  FOR DELETE
  TO authenticated
  USING (true);

-- Automatically keep updated_at in sync
CREATE OR REPLACE FUNCTION update_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blogs_updated_at_trigger
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_blogs_updated_at();