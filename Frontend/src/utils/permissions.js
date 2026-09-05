export const ROLE_HIERARCHY_LEVELS = {
  'State Admin': 4,
  'District Admin': 3,
  'Divisional Admin': 2,
  'Pincode Admin': 1
};

export function getRoleDashboardPath(role) {
  switch (role) {
    case 'State Admin':
      return '/state-admin/dashboard';
    case 'District Admin':
      return '/district-admin/dashboard';
    case 'Divisional Admin':
      return '/divisional-admin/dashboard';
    case 'Pincode Admin':
      return '/pincode-admin/dashboard';
    default:
      return '/login';
  }
}
