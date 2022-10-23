import axios from 'axios';

import {useQuery} from '@tanstack/react-query';

const baseUrl = 'https://api.top90.io';

interface PaginationOptions {
  itemOffset: number;
  itemsPerPage: number;
}

interface GoalApiObject {
  Id: string;
  RedditFullname: string;
  RedditLinkUrl: string;
  RedditPostTitle: string;
  RedditPostCreatedAt: Date;
  S3ObjectKey: string;
  PresignedUrl: string;
  CreatedAt: Date;
  FixtureId: number;
}

export interface Goal {
  id: string;
  redditFullName: string;
  redditLinkUrl: string;
  redditPostTitle: string;
  redditPostCreatedAt: Date;
  s3ObjectKey: string;
  presignedUrl: string;
  createdAt: Date;
  fixtureId: number;
}

interface GoalsResponse {
  goals: Goal[];
  total: number;
}

interface GoalApiResponse {
  goals: GoalApiObject[];
  total: number;
}

function normalizeGoal({
  Id,
  RedditFullname,
  RedditLinkUrl,
  RedditPostTitle,
  RedditPostCreatedAt,
  S3ObjectKey,
  PresignedUrl,
  CreatedAt,
  FixtureId,
}: GoalApiObject) {
  return {
    id: Id,
    redditFullName: RedditFullname,
    redditLinkUrl: RedditLinkUrl,
    redditPostTitle: RedditPostTitle,
    redditPostCreatedAt: RedditPostCreatedAt,
    s3ObjectKey: S3ObjectKey,
    presignedUrl: PresignedUrl,
    createdAt: CreatedAt,
    fixtureId: FixtureId,
  };
}

async function getGoals(
  paginationOptions: PaginationOptions,
  search: string
): Promise<GoalsResponse> {
  const response = await axios.get<GoalApiResponse>(
    `${baseUrl}/goals?skip=${paginationOptions.itemOffset}&limit=${paginationOptions.itemsPerPage}&search=${search}`
  );
  return {goals: response.data.goals.map(normalizeGoal), total: response.data.total};
}

export function useGetGoals(pagination: PaginationOptions, search: string) {
  return useQuery(['goals', pagination.itemOffset, pagination.itemsPerPage, search], () =>
    getGoals(pagination, search)
  );
}
