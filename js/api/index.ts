import axios from 'axios';

const api = axios.create({
  baseURL: process.env.GRAPHCMS_URL,
  headers: {
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
  },
});

export default api;
