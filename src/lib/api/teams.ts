import {API_BASE_URL} from './core';

import axios from 'axios';

export interface Team {
  id: number;
  name: string;
  aliases?: string[];
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
  createdAt: Date;
}

export interface Teams {
  home: Team;
  away: Team;
}

export interface GetTeamsFilter {
  leagueId?: number;
  season?: number;
  searchTerm?: string;
}

export interface GetTeamsResponse {
  teams: Team[];
}

export async function getTeams(filter?: GetTeamsFilter) {
  if (!filter) {
    filter = {};
  }

  const json = encodeURIComponent(JSON.stringify(filter));
  const url = `${API_BASE_URL}/teams?json=${json}`;

  const response = await axios.get<GetTeamsResponse>(url);
  return response.data;
}
