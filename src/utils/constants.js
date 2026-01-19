/**
 * Constants used throughout the application
 */

/**
 * User Roles
 */
export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
};

/**
 * Course Levels
 */
export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
};

/**
 * Course Categories
 */
export const COURSE_CATEGORIES = [
  'Frontend',
  'Backend',
  'Full Stack',
  'Mobile',
  'Design',
  'DevOps',
  'Data Science',
];

/**
 * Assignment Status
 */
export const ASSIGNMENT_STATUS = {
  PENDING: 'Pending',
  SUBMITTED: 'Submitted',
  OVERDUE: 'Overdue',
  GRADED: 'Graded',
};

/**
 * Quiz Types
 */
export const QUIZ_TYPES = {
  MCQ: 'MCQ',
  SHORT_ANSWER: 'Short Answer',
  ESSAY: 'Essay',
};

/**
 * Notification Types
 */
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

/**
 * Validation Rules
 */
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MIN_LENGTH: 5,
  EMAIL_MAX_LENGTH: 100,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 50,
  COURSE_TITLE_MIN_LENGTH: 5,
  COURSE_TITLE_MAX_LENGTH: 100,
  COURSE_DESCRIPTION_MIN_LENGTH: 20,
  COURSE_DESCRIPTION_MAX_LENGTH: 1000,
};

/**
 * File Size Limits (in bytes)
 */
export const FILE_SIZE_LIMITS = {
  AVATAR: 5 * 1024 * 1024, // 5MB
  COURSE_MATERIAL: 100 * 1024 * 1024, // 100MB
  ASSIGNMENT_SUBMISSION: 50 * 1024 * 1024, // 50MB
};

/**
 * Allowed File Types
 */
export const ALLOWED_FILE_TYPES = {
  DOCUMENT: ['.pdf', '.doc', '.docx', '.txt'],
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif'],
  VIDEO: ['.mp4', '.avi', '.mov', '.mkv'],
  ARCHIVE: ['.zip', '.rar', '.7z'],
};

/**
 * Pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

/**
 * Cache Duration (in seconds)
 */
export const CACHE_DURATION = {
  SHORT: 5 * 60, // 5 minutes
  MEDIUM: 30 * 60, // 30 minutes
  LONG: 24 * 60 * 60, // 24 hours
};

/**
 * API Response Messages
 */
export const API_MESSAGES = {
  SUCCESS: 'Operation successful',
  ERROR: 'An error occurred',
  LOADING: 'Loading...',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Please login to continue',
  FORBIDDEN: 'You do not have permission',
  VALIDATION_ERROR: 'Please check your input',
};

/**
 * Local Storage Keys
 */
export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme_preference',
  LANGUAGE: 'language_preference',
};

/**
 * Date Formats
 */
export const DATE_FORMATS = {
  SHORT: 'MMM DD',
  MEDIUM: 'MMM DD, YYYY',
  LONG: 'MMMM DD, YYYY',
  FULL: 'MMMM DD, YYYY HH:mm',
};

/**
 * Routes
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  STUDENT_DASHBOARD: '/student/dashboard',
  STUDENT_COURSES: '/student/courses',
  INSTRUCTOR_DASHBOARD: '/instructor/dashboard',
  INSTRUCTOR_COURSES: '/instructor/courses',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
};

/**
 * Timers and Intervals (in milliseconds)
 */
export const TIMERS = {
  DEBOUNCE_DELAY: 500,
  API_TIMEOUT: 30000,
  TOAST_DURATION: 4000,
  ANIMATION_DURATION: 300,
};
