import {BASE_URL, Pagination} from './core';

import axios from 'axios';

export interface Goal {
  Id: string;
  RedditFullname: string;
  RedditLinkUrl: string;
  RedditPostTitle: string;
  RedditPostCreatedAt: Date;
  S3ObjectKey: string;
  PresignedUrl: string;
  CreatedAt: string;
  FixtureId: number;
  ThumbnailPresignedUrl: string;
}

export interface GetGoalsFilter {
  searchTerm?: string;
  startDate?: Date;
  leagueId?: number;
  season?: number;
  teamId?: number;
}

export interface GoalsResponse {
  goals: Goal[];
  total: number;
}

export interface GoalResponse {
  goal: Goal;
}

export const getGoals = async (
  pagination: Pagination = {skip: 0, limit: 5},
  getGoalsFilter: GetGoalsFilter = {searchTerm: '', leagueId: 0, season: 0, teamId: 0}
): Promise<GoalsResponse> => {
  const {searchTerm, leagueId, season, teamId} = getGoalsFilter;
  const response = await axios.get<GoalsResponse>(
    `${BASE_URL}/goals?skip=${pagination.skip}&limit=${pagination.limit}&search=${searchTerm}&leagueId=${leagueId}&season=${season}&teamId=${teamId}`
  );
  return response.data;
};

export const getGoal = async (id: string): Promise<GoalResponse> => {
  const response = await axios.get<GoalResponse>(`${BASE_URL}/goals/${id}`);
  return response.data;
};
