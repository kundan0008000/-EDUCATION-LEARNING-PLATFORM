/**
 * API Service
 * Centralized API client with interceptors for authentication
 * Handles all HTTP requests to the backend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Make API request with authentication token
 * @param {string} endpoint - API endpoint path
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * API Service object with methods for different endpoints
 */
export const api = {
  // Auth endpoints
  auth: {
    login: (email, password) =>
      apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (userData) =>
      apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    logout: () => apiCall('/auth/logout', { method: 'POST' }),
    me: () => apiCall('/auth/me'),
  },

  // Course endpoints
  courses: {
    getAll: () => apiCall('/courses'),
    getById: (id) => apiCall(`/courses/${id}`),
    create: (data) =>
      apiCall('/courses', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      apiCall(`/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      apiCall(`/courses/${id}`, { method: 'DELETE' }),
    enroll: (id) =>
      apiCall(`/courses/${id}/enroll`, { method: 'POST' }),
  },

  // User endpoints
  users: {
    getAll: () => apiCall('/users'),
    getById: (id) => apiCall(`/users/${id}`),
    update: (id, data) =>
      apiCall(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      apiCall(`/users/${id}`, { method: 'DELETE' }),
    approve: (id) =>
      apiCall(`/users/${id}/approve`, { method: 'POST' }),
  },

  // Quiz endpoints
  quizzes: {
    create: (courseId, data) =>
      apiCall(`/courses/${courseId}/quizzes`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getById: (quizId) => apiCall(`/quizzes/${quizId}`),
    submit: (quizId, answers) =>
      apiCall(`/quizzes/${quizId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers }),
      }),
  },

  // Assignment endpoints
  assignments: {
    create: (courseId, data) =>
      apiCall(`/courses/${courseId}/assignments`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    submit: (assignmentId, data) =>
      apiCall(`/assignments/${assignmentId}/submit`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getSubmissions: (assignmentId) =>
      apiCall(`/assignments/${assignmentId}/submissions`),
  },

  // Progress endpoints
  progress: {
    get: (courseId) => apiCall(`/courses/${courseId}/progress`),
    update: (courseId, data) =>
      apiCall(`/courses/${courseId}/progress`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },
};
