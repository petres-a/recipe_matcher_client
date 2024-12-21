import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signUp = async (email: string, password: string, username: string) => {
  const response = await api.post('/signup', {
    user: { email, password, username },
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', {
    user: { email, password },
  });
  return response.data;
};

export const logout = async () => {
  await api.delete('/logout');
  localStorage.removeItem('token');
};

export const getRecipes = async (page = 1, perPage = 10) => {
  const response = await api.get(`/api/v1/recipes?page=${page}&per_page=${perPage}`);
  return response.data;
};
