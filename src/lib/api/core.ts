export const API_BASE_URL = import.meta.env.VITE_TOP90_API_BASE_URL || 'https://api.top90.io';
export const PUBLIC_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5173' : "https://top90.io"
export interface Pagination {
  skip: number;
  limit: number;
}
