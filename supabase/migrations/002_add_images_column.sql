-- Add images column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'::jsonb;