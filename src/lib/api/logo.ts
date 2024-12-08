import {API_BASE_URL} from './core';

function getIdFromMediaUrl(url: string): number | null {
  const regex = /\/(\d+)\.png$/;
  const match = url.match(regex);
  return match ? parseInt(match[1], 10) : null;
}

export function top90Url(url: string) {
  return API_BASE_URL + '/logo/' + getIdFromMediaUrl(url);
}
