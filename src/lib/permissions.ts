export type PermissionAction = string; // Dynamic action names

export type UserPermission = {
  user_id: string;
  menu_item_id: string;
  action_name: string;
  has_permission: boolean;
};

export type MenuAction = {
  id: string;
  menu_item_id: string;
  action_name: string;
  action_label: string;
  display_order: number;
};

/**
 * Check if a user has permission to perform a specific action
 * @param permissions - Array of user permissions
 * @param menuItemId - The menu item ID
 * @param action - The action name to check
 * @param isAdmin - If true, automatically grants all permissions
 * @returns boolean - True if user has permission, false otherwise
 */
export function checkPermission(
  permissions: UserPermission[],
  menuItemId: string,
  action: PermissionAction,
  isAdmin: boolean = false
): boolean {
  // Admin users have all permissions automatically
  if (isAdmin) return true;
  
  const permission = permissions.find(
    p => p.menu_item_id === menuItemId && p.action_name === action
  );
  
  return permission?.has_permission || false;
}

/**
 * Check if a user has any permissions for a menu item
 * @param permissions - Array of user permissions
 * @param menuItemId - The menu item ID
 * @param isAdmin - If true, automatically grants all permissions
 * @returns boolean - True if user has any permission, false otherwise
 */
export function hasAnyPermission(
  permissions: UserPermission[],
  menuItemId: string,
  isAdmin: boolean = false
): boolean {
  // Admin users have all permissions automatically
  if (isAdmin) return true;
  
  const menuPermissions = permissions.filter(p => p.menu_item_id === menuItemId);
  
  return menuPermissions.some(p => p.has_permission);
}

/**
 * Get all actions for a menu item that the user has permission for
 * @param permissions - Array of user permissions
 * @param menuItemId - The menu item ID
 * @param isAdmin - If true, returns all available actions
 * @returns Array of action names the user can perform
 */
export function getUserActions(
  permissions: UserPermission[],
  menuItemId: string,
  isAdmin: boolean = false
): string[] {
  // Admin users have all permissions
  if (isAdmin) {
    return permissions
      .filter(p => p.menu_item_id === menuItemId)
      .map(p => p.action_name);
  }
  
  return permissions
    .filter(p => p.menu_item_id === menuItemId && p.has_permission)
    .map(p => p.action_name);
}
