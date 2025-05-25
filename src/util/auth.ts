export function isAuthenticated(): boolean {
  const token = localStorage.getItem('accessToken');
  return !!token;
}