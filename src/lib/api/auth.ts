import {API_BASE_URL} from './core';

import axios from 'axios';

export interface Token {
  admin: boolean;
  exp: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export async function login(username: string, password: string) {
  const request: LoginRequest = {username, password};
  const json = encodeURIComponent(JSON.stringify(request));
  const url = `${API_BASE_URL}/login?json=${json}`;

  const response = await axios.post<LoginResponse>(url, null, {withCredentials: true});
  return response.data;
}

export async function logout() {
  const url = `${API_BASE_URL}/logout`;

  const response = await axios.post<LoginResponse>(url, null, {withCredentials: true});
  return response.data;
}
