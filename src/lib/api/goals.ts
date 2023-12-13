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
  playerId?: number;
}

export interface GetGoalsRequest {
  pagination: Pagination;
  filter?: GetGoalsFilter;
}

export interface GetGoalsResponse {
  goals: Goal[];
  total: number;
}

export interface GetGoalResponse {
  goal: Goal;
}

export async function getGoals(pagination?: Pagination, filter?: GetGoalsFilter) {
  if (!pagination) {
    pagination = {skip: 0, limit: 5};
  }

  const request: GetGoalsRequest = {pagination, filter};
  const json = encodeURIComponent(JSON.stringify(request));
  const url = `${API_BASE_URL}/goals?json=${json}`;

  const response = await axios.get<GetGoalsResponse>(url);
  return response.data;
}

export async function getGoal(id: string) {
  const response = await axios.get<GetGoalResponse>(`${API_BASE_URL}/goals/${id}`);
  return response.data;
}
