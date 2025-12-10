-- Add missing columns to menu_items table
ALTER TABLE public.menu_items
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS visible_to_roles TEXT[] DEFAULT ARRAY['admin', 'user'];