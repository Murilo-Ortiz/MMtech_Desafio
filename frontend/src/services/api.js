import axios from 'axios';

export const api = axios.create({
  baseURL: '/', 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (config.url.startsWith('/data') || config.url.startsWith('/auth')) {
      config.url = `/api${config.url}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getContacts = (searchTerm = '') => {
  return api.get(`/data?search=${searchTerm}`);
};

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const register = (userData) => {
  return api.post('/auth/register', userData);
};

export const createContact = (contactData) => {
  return api.post('/data', contactData);
};

export const updateContact = (id, updatedData) => {
  return api.put(`/data/${id}`, updatedData);
};

export const deleteContact = (id) => {
  return api.delete(`/data/${id}`);
};
