import prismadb from "../utils/db.server";


// Define default permissions for each role
const rolePermissionsMap = {
  SUPER_ADMIN: ['manage_users', 'view_reports', 'edit_settings'],
  ADMIN: ['manage_users', 'view_reports'],
  CLIENT: ['view_own_data'],
  EMPLOYEE: ['view_own_data', 'edit_own_data'],
  MANAGER: ['view_reports', 'manage_team'],
};

export const  getPermissionsForRole= async (role: string) => {
  const defaultPermissions = rolePermissionsMap[role as keyof typeof rolePermissionsMap] || [];

  const permissions = await Promise.all(
    defaultPermissions.map(async (permissionName: string) => {
      return prismadb.permission.upsert({
        where: { name: permissionName },
        update: {},
        create: { name: permissionName },
      });
    })
  );

  return permissions.map((permission: { id: number }) => ({ id: permission.id }));
}

