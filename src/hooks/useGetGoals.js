import axios from 'axios';

import {useQuery} from '@tanstack/react-query';

const baseUrl = 'https://api.top90.io';

async function getGoals(pagination, search) {
  const url = `${baseUrl}/goals?skip=${pagination.itemOffset}&limit=${pagination.itemsPerPage}&search=${search}`;
  const response = await axios.get(url);
  return response.data;
}

function useGetGoals(pagination = {itemOffset: 0, itemsPerPage: 3}, search = '') {
  return useQuery(['goals', pagination.itemOffset, pagination.itemsPerPage, search], () =>
    getGoals(pagination, search)
  );
}

export default useGetGoals;
