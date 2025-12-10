-- Create menu_actions table to store available actions per menu item
CREATE TABLE IF NOT EXISTS menu_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE NOT NULL,
  action_name text NOT NULL,
  action_label text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(menu_item_id, action_name)
);

-- Enable RLS on menu_actions
ALTER TABLE menu_actions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for menu_actions
CREATE POLICY "Anyone can view menu actions"
  ON menu_actions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage menu actions"
  ON menu_actions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create user_permissions table
CREATE TABLE IF NOT EXISTS user_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE NOT NULL,
  action_name text NOT NULL,
  has_permission boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, menu_item_id, action_name)
);

-- Enable RLS on user_permissions
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_permissions
CREATE POLICY "Users can view own permissions"
  ON user_permissions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all permissions"
  ON user_permissions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_permissions_updated_at
    BEFORE UPDATE ON user_permissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample menu items
INSERT INTO menu_items (title, path, icon, display_order) VALUES
  ('Dashboard', '/dashboard', 'Home', 1),
  ('Users', '/users', 'Users', 2),
  ('Employees', '/employees', 'Users', 3),
  ('User Permissions', '/user-permissions', 'Shield', 4),
  ('Menu Config', '/menu-config', 'Settings', 5),
  ('General Setup', null, 'Settings', 6),
  ('Area', '/masterfile/general-setup/area', 'MapPin', 7),
  ('Award', '/masterfile/general-setup/award', 'Award', 8)
ON CONFLICT DO NOTHING;

-- Get menu item IDs and insert default actions
DO $$
DECLARE
  area_id uuid;
  award_id uuid;
  employees_id uuid;
BEGIN
  -- Get existing menu item IDs
  SELECT id INTO area_id FROM menu_items WHERE title = 'Area' LIMIT 1;
  SELECT id INTO award_id FROM menu_items WHERE title = 'Award' LIMIT 1;
  SELECT id INTO employees_id FROM menu_items WHERE title = 'Employees' LIMIT 1;

  -- Default actions for Area module
  IF area_id IS NOT NULL THEN
    INSERT INTO menu_actions (menu_item_id, action_name, action_label, display_order) VALUES
      (area_id, 'view', 'View', 1),
      (area_id, 'add', 'Add', 2),
      (area_id, 'edit', 'Edit', 3),
      (area_id, 'delete', 'Delete', 4),
      (area_id, 'export', 'Export', 5)
    ON CONFLICT (menu_item_id, action_name) DO NOTHING;
  END IF;

  -- Default actions for Award module
  IF award_id IS NOT NULL THEN
    INSERT INTO menu_actions (menu_item_id, action_name, action_label, display_order) VALUES
      (award_id, 'view', 'View', 1),
      (award_id, 'add', 'Add', 2),
      (award_id, 'edit', 'Edit', 3),
      (award_id, 'delete', 'Delete', 4),
      (award_id, 'approve', 'Approve', 5),
      (award_id, 'export', 'Export', 6),
      (award_id, 'import', 'Import', 7)
    ON CONFLICT (menu_item_id, action_name) DO NOTHING;
  END IF;

  -- Default actions for Employees module
  IF employees_id IS NOT NULL THEN
    INSERT INTO menu_actions (menu_item_id, action_name, action_label, display_order) VALUES
      (employees_id, 'view', 'View', 1),
      (employees_id, 'add', 'Add', 2),
      (employees_id, 'edit', 'Edit', 3),
      (employees_id, 'delete', 'Delete', 4),
      (employees_id, 'export', 'Export', 5),
      (employees_id, 'print', 'Print', 6)
    ON CONFLICT (menu_item_id, action_name) DO NOTHING;
  END IF;
END $$;