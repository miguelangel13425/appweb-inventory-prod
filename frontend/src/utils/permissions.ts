export const hasPermission = (role: string | undefined, allowedRoles: string[]): boolean => {
  if (!role) return false;
  return allowedRoles.includes(role);
};
