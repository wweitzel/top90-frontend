import {API_BASE_URL} from './core';

import axios from 'axios';
import {Teams} from './teams';

export interface Fixture {
  id: string;
  referee: string;
  date: string;
  timestamp: number;
  teams: Teams;
  leagueId: number;
  season: number;
  createdAt: string;
}

export interface GetFixturesFilter {
  leagueId?: number;
  todayOnly?: boolean;
  teamId?: number;
}

export interface GetFixturesResponse {
  fixtures: Fixture[];
}

export interface GetFixtureResponse {
  fixture: Fixture;
}

export async function getFixtures(filter?: GetFixturesFilter) {
  if (!filter) {
    filter = {};
  }

  const json = encodeURIComponent(JSON.stringify(filter));
  const url = `${API_BASE_URL}/fixtures?json=${json}`;

  const response = await axios.get<GetFixturesResponse>(url);
  return response.data;
}

export async function getFixture(id: string) {
  const response = await axios.get<GetFixtureResponse>(`${API_BASE_URL}/fixtures/${id}`);
  return response.data;
}
