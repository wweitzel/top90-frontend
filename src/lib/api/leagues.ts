import {API_BASE_URL} from './core';

import axios from 'axios';

export interface League {
  id: number;
  name: string;
  type: string;
  logo?: string;
  createdAt: string;
}

export interface GetLeaguesResponse {
  leagues: League[];
}

export async function getLeagues() {
  let url = `${API_BASE_URL}/leagues`;
  const response = await axios.get<GetLeaguesResponse>(url);
  return response.data;
}
