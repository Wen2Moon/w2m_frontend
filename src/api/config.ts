import axios from 'axios';
import type { CustomRequestData } from '../api/model';
// import { ROUTES_CONFIG } from '@/enums/routesEnum';

const BASE_URL = process.env.NEXT_PUBLIC_PUBLICAPI_KEY;
const service = axios.create({
  baseURL: BASE_URL,
  headers: {
    // 'Accept-Language': 'en',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
  },
});

const setLanguage = (language: string) => {
  service.defaults.headers['Accept-Language'] = language;
};

const getLanguageFromLocalStorage = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('selectedLanguage') || 'en';
  }
  return 'en';
};


setLanguage(getLanguageFromLocalStorage());
service.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (config.headers) {
    config.headers['Accept-Language'] = getLanguageFromLocalStorage();
  }
  return config;
});

export function requestHttp(requestData: CustomRequestData): any {
  const { url, method, data, params, withCredentials, timeout } = requestData;
  return service({
    url,
    method,
    data,
    params,
    withCredentials,
    timeout: timeout || 10 * 1000,
  });
}

export default requestHttp;
