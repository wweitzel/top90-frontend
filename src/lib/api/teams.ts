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

export interface TeamsResponse {
  teams: Team[];
}

export const getTeams = async (leagueId = 0, season = 0) => {
  const response = await axios.get<TeamsResponse>(
    `${API_BASE_URL}/teams?leagueId=${leagueId}&season=${season}`
  );
  return response.data;
};
