import {BASE_URL} from './core';

import axios from 'axios';

export interface Team {
  Id: number;
  Name: string;
  Aliases?: string[];
  Code: string;
  Country: string;
  Founded: number;
  National: boolean;
  Logo: string;
  CreatedAt: Date;
}

export interface TeamsResponse {
  teams: Team[];
}

export const getTeams = async (leagueId = 0, season = 0) => {
  const response = await axios.get<TeamsResponse>(
    `${BASE_URL}/teams?leagueId=${leagueId}&season=${season}`
  );
  return response.data;
};
