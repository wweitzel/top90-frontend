import axios from 'axios';
import {useQuery} from '@tanstack/react-query';

const baseUrl = 'https://api.top90.io';

async function getOneGoal() {
  const endPoint = '/goals/';
  const goal_id = window.location.pathname.substring(endPoint.length);
  const {data} = await axios.get(`${baseUrl}/goals/${goal_id}`);
  return data;
}

export default function useGetOneGoal() {
  return useQuery(['goal'], getOneGoal);
}
