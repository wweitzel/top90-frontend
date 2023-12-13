import {API_BASE_URL} from './core';

import axios from 'axios';

export interface Player {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
  photo: string;
  createdAt: string;
}

export interface SearchPlayersRequest {
  searchTerm: string;
}

export interface SearchPlayersResponse {
  players: Player[];
}

export async function searchPlayers(searchTerm: string) {
  const request: SearchPlayersRequest = {searchTerm};
  const json = encodeURIComponent(JSON.stringify(request));
  const url = `${API_BASE_URL}/players?json=${json}`;

  const response = await axios.get<SearchPlayersResponse>(url);
  return response.data;
}
