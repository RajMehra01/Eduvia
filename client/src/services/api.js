import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 8000
});

// Request interceptor to attach Bearer token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kairo_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for clean error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn(`API Notice [${error.config?.url}]:`, error.response?.data?.error || error.message);
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me')
};

export const projectApi = {
  getProjects: () => api.get('/projects'),
  getProjectInfo: (id) => api.get(`/projects/${id || 'info'}`),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`)
};

export const taskApi = {
  getTasks: (params) => api.get('/tasks', { params }),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  addSubtask: (id, data) => api.post(`/tasks/${id}/subtasks`, data),
  toggleSubtask: (id, subtaskId) => api.put(`/tasks/${id}/subtasks/${subtaskId}`),
  addComment: (id, data) => api.post(`/tasks/${id}/comments`, data)
};

export const teamApi = {
  getTeamMembers: () => api.get('/team')
};

export const analyticsApi = {
  getSprintAnalytics: () => api.get('/analytics')
};

export default api;
