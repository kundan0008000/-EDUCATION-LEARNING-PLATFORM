import { create } from 'zustand';

/**
 * Demo credentials for testing
 */
const DEMO_CREDENTIALS = {
  'student@demo.com': {
    password: 'password123',
    user: {
      id: 1,
      name: 'John Student',
      email: 'student@demo.com',
      role: 'student',
    },
    token: 'demo_token_student_123',
  },
  'teacher@demo.com': {
    password: 'password123',
    user: {
      id: 2,
      name: 'Sarah Teacher',
      email: 'teacher@demo.com',
      role: 'instructor',
    },
    token: 'demo_token_instructor_456',
  },
  'admin@demo.com': {
    password: 'password123',
    user: {
      id: 3,
      name: 'Admin User',
      email: 'admin@demo.com',
      role: 'admin',
    },
    token: 'demo_token_admin_789',
  },
};

/**
 * Authentication Store
 * Manages user authentication state, login, logout, and registration
 * Uses Zustand for state management
 * 
 * @typedef {Object} AuthStore
 * @property {Object|null} user - Current authenticated user object
 * @property {string} token - JWT authentication token
 * @property {boolean} isLoading - Loading state
 * @property {string|null} error - Error message
 * @property {Function} login - Login function
 * @property {Function} register - Register function
 * @property {Function} logout - Logout function
 * @property {Function} checkAuth - Check authentication status
 */
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<void>}
   */
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check demo credentials first
      if (DEMO_CREDENTIALS[email]) {
        const credential = DEMO_CREDENTIALS[email];
        if (credential.password === password) {
          localStorage.setItem('token', credential.token);
          localStorage.setItem('user', JSON.stringify(credential.user));

          set({
            user: credential.user,
            token: credential.token,
            isLoading: false,
          });
          return;
        } else {
          throw new Error('Invalid password');
        }
      }

      // Try API call if not demo credentials
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        set({
          user: data.user,
          token: data.token,
          isLoading: false,
        });
      } catch (apiError) {
        // If API fails and not demo credentials, show error
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  /**
   * Register new user
   * @param {Object} userData - User data (name, email, password, role)
   * @returns {Promise<void>}
   */
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Create mock user for demo
      const mockUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };
      const mockToken = `token_${Date.now()}`;

      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      set({
        user: mockUser,
        token: mockToken,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
      });
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, error: null });
  },

  /**
   * Check authentication status from localStorage
   */
  checkAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
      });
    }
  },
}));
