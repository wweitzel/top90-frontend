import {API_BASE_URL, Pagination} from './core';

import axios from 'axios';

export interface Goal {
  id: string;
  redditFullname: string;
  redditLinkUrl: string;
  redditPostTitle: string;
  redditPostCreatedAt: Date;
  s3ObjectKey: string;
  presignedUrl: string;
  createdAt: string;
  fixtureId: number;
  thumbnailPresignedUrl: string;
  thumbnailS3Key: string;
}

export interface GetGoalsFilter {
  searchTerm?: string;
  startDate?: Date;
  leagueId?: number;
  season?: number;
  teamId?: number;
  fixtureId?: number;
}

export interface GetGoalsResponse {
  goals: Goal[];
  total: number;
}

export interface GetGoalResponse {
  goal: Goal;
}

export const getGoals = async (
  pagination: Pagination = {skip: 0, limit: 5},
  getGoalsFilter: GetGoalsFilter = {searchTerm: '', leagueId: 0, season: 0, teamId: 0}
): Promise<GetGoalsResponse> => {
  let {searchTerm, leagueId, season, teamId, fixtureId} = getGoalsFilter;

  if (!searchTerm) {
    searchTerm = '';
  }
  if (!leagueId) {
    leagueId = 0;
  }
  if (!season) {
    season = 0;
  }
  if (!teamId) {
    teamId = 0;
  }
  if (!fixtureId) {
    fixtureId = 0;
  }

  const response = await axios.get<GetGoalsResponse>(
    `${API_BASE_URL}/goals?skip=${pagination.skip}&limit=${pagination.limit}&search=${searchTerm}&leagueId=${leagueId}&season=${season}&teamId=${teamId}&fixtureId=${fixtureId}`
  );
  return response.data;
};

export const getGoal = async (id: string): Promise<GetGoalResponse> => {
  const response = await axios.get<GetGoalResponse>(`${API_BASE_URL}/goals/${id}`);
  return response.data;
};
