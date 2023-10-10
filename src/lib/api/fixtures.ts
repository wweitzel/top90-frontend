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
}

export interface GetFixturesResponse {
  fixtures: Fixture[];
}

export interface GetFixtureResponse {
  fixture: Fixture;
}

export const getFixtures = async (
  getGoalsFilter: GetFixturesFilter
): Promise<GetFixturesResponse> => {
  const {leagueId, todayOnly} = getGoalsFilter;

  let url = `${API_BASE_URL}/fixtures?`;
  if (leagueId) {
    url += `leagueId=${leagueId}`;
  }

  if (todayOnly) {
    url += `todayOnly=${todayOnly}`;
  }

  const response = await axios.get<GetFixturesResponse>(url);
  return response.data;
};

export const getFixture = async (id: string): Promise<GetFixtureResponse> => {
  const response = await axios.get<GetFixtureResponse>(`${API_BASE_URL}/fixtures/${id}`);
  return response.data;
};
