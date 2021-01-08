import axios from 'axios';
import { ResponseEnvelope } from '../types';

const api = axios.create({
  baseURL: process.env.GRAPHCMS_URL,
  headers: {
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
  },
});

export function requestGraphQL<T>(query: string) {
  return api.get<ResponseEnvelope<T>>('', {
    params: {
      query,
    }
  });
}

export default api;
