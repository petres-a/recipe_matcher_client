import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

let navigate: NavigateFunction;

export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config.url?.includes('/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (navigate) navigate('/login');
    }
    return Promise.reject(error);
  }
);

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
  return (await api.get(`/api/v1/recipes?page=${page}&per_page=${perPage}`)).data;
};

export const getRecipe = async (id: string) => {
  return (await api.get(`/api/v1/recipes/${id}`)).data;
};

export const matchRecipes = async (ingredients: string) => {
  return (await api.post('/api/v1/recipes/matcher', { ingredients })).data;
};
