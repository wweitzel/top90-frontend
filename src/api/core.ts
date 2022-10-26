export const BASE_URL = process.env.REACT_APP_TOP90_API_BASE_URL || 'https://api.top90.io';

export interface Pagination {
  skip: number;
  limit: number;
}
