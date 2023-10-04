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
    `${API_BASE_URL}/goals?skip=${pagination.skip}&limit=${pagination.limit}&search=${searchTerm}&leagueId=${leagueId}&season=${season}&teamId=${teamId}`
  );
  return response.data;
};

export const getGoal = async (id: string): Promise<GoalResponse> => {
  const response = await axios.get<GoalResponse>(`${API_BASE_URL}/goals/${id}`);
  return response.data;
};
