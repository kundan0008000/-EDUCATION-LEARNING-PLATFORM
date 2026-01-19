import { create } from 'zustand';

/**
 * Course Store
 * Manages course data, filtering, and pagination
 * 
 * @typedef {Object} CourseStore
 * @property {Array} courses - Array of courses
 * @property {Array} filteredCourses - Filtered courses based on search/category
 * @property {boolean} isLoading - Loading state
 * @property {Object} filters - Active filters (search, category, level)
 * @property {Function} fetchCourses - Fetch all courses
 * @property {Function} setFilters - Set filter criteria
 * @property {Function} searchCourses - Search courses by query
 * @property {Function} createCourse - Create a new course
 */
export const useCourseStore = create((set, get) => ({
  courses: [],
  filteredCourses: [],
  enrolledCourses: [],
  isLoading: false,
  filters: {
    search: '',
    category: '',
    level: '',
  },

  /**
   * Fetch courses from localStorage or API
   * @returns {Promise<void>}
   */
  fetchCourses: async () => {
    set({ isLoading: true });
    try {
      // Try to get courses from localStorage first
      const storedCourses = localStorage.getItem('courses');
      if (storedCourses) {
        const courses = JSON.parse(storedCourses);
        set({ courses, filteredCourses: courses, isLoading: false });
        return;
      }

      // Fall back to API call
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch courses');

      const data = await response.json();
      localStorage.setItem('courses', JSON.stringify(data));
      set({ courses: data, filteredCourses: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching courses:', error);
      set({ isLoading: false });
    }
  },

  /**
   * Fetch enrolled courses for current user
   * @returns {void}
   */
  fetchEnrolledCourses: () => {
    try {
      const storedEnrolled = localStorage.getItem('enrolledCourses');
      const enrolled = storedEnrolled ? JSON.parse(storedEnrolled) : [];
      set({ enrolledCourses: enrolled });
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  },

  /**
   * Create a new course
   * @param {Object} courseData - Course data
   * @returns {Promise<Object>}
   */
  createCourse: async (courseData) => {
    try {
      // Get existing courses from localStorage
      const storedCourses = localStorage.getItem('courses');
      const courses = storedCourses ? JSON.parse(storedCourses) : [];

      // Create new course with ID and timestamp
      const newCourse = {
        id: Date.now(),
        ...courseData,
        createdAt: new Date().toISOString(),
        status: 'pending',
        students: 0,
        rating: 0,
        progress: 0,
        lectures: [],
        materials: [],
      };

      // Add to courses array
      const updatedCourses = [...courses, newCourse];

      // Save to localStorage
      localStorage.setItem('courses', JSON.stringify(updatedCourses));

      // Update state
      set({
        courses: updatedCourses,
        filteredCourses: updatedCourses,
      });

      return newCourse;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  /**
   * Update course with new lectures/materials
   * @param {number} courseId - Course ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<void>}
   */
  updateCourse: async (courseId, updateData) => {
    try {
      const storedCourses = localStorage.getItem('courses');
      const courses = storedCourses ? JSON.parse(storedCourses) : [];

      const updatedCourses = courses.map((course) =>
        course.id === courseId ? { ...course, ...updateData } : course
      );

      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      set({ courses: updatedCourses, filteredCourses: updatedCourses });

      return updatedCourses.find((c) => c.id === courseId);
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  },

  /**
   * Enroll student in a course
   * @param {number} courseId - Course ID
   * @param {string} userId - User ID
   * @returns {Promise<void>}
   */
  enrollCourse: async (courseId, userId) => {
    try {
      const storedEnrolled = localStorage.getItem('enrolledCourses');
      const enrolled = storedEnrolled ? JSON.parse(storedEnrolled) : [];

      // Check if already enrolled
      if (!enrolled.find((e) => e.courseId === courseId && e.userId === userId)) {
        enrolled.push({
          courseId,
          userId,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          completedLectures: [],
        });

        localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
        set({ enrolledCourses: enrolled });
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      throw error;
    }
  },

  /**
   * Check if user is enrolled in a course
   * @param {number} courseId - Course ID
   * @param {string} userId - User ID
   * @returns {boolean}
   */
  isEnrolled: (courseId, userId) => {
    const { enrolledCourses } = get();
    return enrolledCourses.some((e) => e.courseId === courseId && e.userId === userId);
  },

  /**
   * Add lecture to course
   * @param {number} courseId - Course ID
   * @param {Object} lectureData - Lecture data (title, url, type)
   * @returns {Promise<void>}
   */
  addLecture: async (courseId, lectureData) => {
    try {
      const storedCourses = localStorage.getItem('courses');
      const courses = storedCourses ? JSON.parse(storedCourses) : [];

      const updatedCourses = courses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            lectures: [
              ...(course.lectures || []),
              {
                id: Date.now(),
                ...lectureData,
                uploadedAt: new Date().toISOString(),
              },
            ],
          };
        }
        return course;
      });

      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      set({ courses: updatedCourses });
    } catch (error) {
      console.error('Error adding lecture:', error);
      throw error;
    }
  },

  /**
   * Add study material (PDF, notes) to course
   * @param {number} courseId - Course ID
   * @param {Object} materialData - Material data (title, url, type)
   * @returns {Promise<void>}
   */
  addMaterial: async (courseId, materialData) => {
    try {
      const storedCourses = localStorage.getItem('courses');
      const courses = storedCourses ? JSON.parse(storedCourses) : [];

      const updatedCourses = courses.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            materials: [
              ...(course.materials || []),
              {
                id: Date.now(),
                ...materialData,
                uploadedAt: new Date().toISOString(),
              },
            ],
          };
        }
        return course;
      });

      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      set({ courses: updatedCourses });
    } catch (error) {
      console.error('Error adding material:', error);
      throw error;
    }
  },

  /**
   * Set filter criteria and apply filters
   * @param {Object} newFilters - Filter object
   */
  setFilters: (newFilters) => {
    set((state) => {
      const filters = { ...state.filters, ...newFilters };
      const filtered = state.courses.filter((course) => {
        const matchesSearch = course.title
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        const matchesCategory = !filters.category || course.category === filters.category;
        const matchesLevel = !filters.level || course.level === filters.level;
        return matchesSearch && matchesCategory && matchesLevel;
      });
      return { filters, filteredCourses: filtered };
    });
  },

  /**
   * Search courses by query
   * @param {string} query - Search query
   */
  searchCourses: (query) => {
    set((state) => ({
      filters: { ...state.filters, search: query },
      filteredCourses: state.courses.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.description.toLowerCase().includes(query.toLowerCase())
      ),
    }));
  },
}));
