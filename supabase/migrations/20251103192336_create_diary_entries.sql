/*
  # Create diary entries table

  1. New Tables
    - `diary_entries`
      - `id` (uuid, primary key)
      - `content` (text, the diary entry content)
      - `created_at` (timestamptz, when entry was created)
      - `updated_at` (timestamptz, when entry was last modified)
      - `user_id` (uuid, reference to auth.users)
  
  2. Security
    - Enable RLS on `diary_entries` table
    - Add policy for authenticated users to read their own entries
    - Add policy for authenticated users to insert their own entries
    - Add policy for authenticated users to update their own entries
    - Add policy for authenticated users to delete their own entries
*/

CREATE TABLE IF NOT EXISTS diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own diary entries"
  ON diary_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diary entries"
  ON diary_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diary entries"
  ON diary_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own diary entries"
  ON diary_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS diary_entries_user_id_idx ON diary_entries(user_id);
CREATE INDEX IF NOT EXISTS diary_entries_created_at_idx ON diary_entries(created_at DESC);