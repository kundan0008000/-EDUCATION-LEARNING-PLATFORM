import { useState, useEffect, useMemo } from 'react';
import { Button } from '../../components/Form';
import { Card, Breadcrumb, Badge } from '../../components/UI';
import { Search, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCourseStore } from '../../stores/courseStore';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

/**
 * Mock courses to display alongside instructor-created courses
 */
const MOCK_COURSES = [
    {
      id: 1,
      title: 'Introduction to React',
      category: 'Frontend',
      level: 'Beginner',
      instructor: 'kundan kumar',
      rating: 4.8,
      students: 245,
      description: 'Learn React fundamentals from scratch',
      thumbnail: '⚛️',
      price: 'Free',
      lectures: [],
      materials: [],
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      category: 'Backend',
      level: 'Intermediate',
      instructor: 'balwant singh',
      rating: 4.6,
      students: 189,
      description: 'Master advanced JavaScript concepts',
      thumbnail: '📜',
      price: 'Free',
      lectures: [],
      materials: [],
    },
    {
      id: 3,
      title: 'Web Design Fundamentals',
      category: 'Design',
      level: 'Beginner',
      instructor: 'Gautam Govind',
      rating: 4.9,
      students: 312,
      description: 'Create beautiful web interfaces',
      thumbnail: '🎨',
      price: 'Free',
      lectures: [],
      materials: [],
    },
    {
      id: 4,
      title: 'Full Stack Development',
      category: 'Full Stack',
      level: 'Advanced',
      instructor: 'Sanoj Kumar',
      rating: 4.7,
      students: 156,
      description: 'Complete full stack web development',
      thumbnail: '🚀',
      price: 'Free',
      lectures: [],
      materials: [],
    },
  ];

/**
 * Browse Courses Page Component
 * Student view for discovering and enrolling in available courses
 * 
 * Features:
 * - Search and filter courses
 * - Course cards with ratings and enrollment info
 * - Easy enrollment process
 */
export default function BrowseCourses() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { courses, enrollCourse } = useCourseStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());
  const [isEnrolling, setIsEnrolling] = useState({});

  // Merge and memoize merged courses to prevent unnecessary recalculations
  const mergedCourses = useMemo(() => {
    const merged = [...MOCK_COURSES];
    
    // Add instructor-created courses that aren't mocks
    if (courses && courses.length > 0) {
      courses.forEach((course) => {
        if (!merged.find((c) => c.id === course.id)) {
          // Add default values for missing fields
          const enrichedCourse = {
            ...course,
            rating: course.rating || 4.5,
            students: course.students || 0,
            thumbnail: course.thumbnail || '📚',
            price: course.price || 'Free',
            category: course.category || 'Other',
            level: course.level || 'Beginner',
          };
          merged.push(enrichedCourse);
        }
      });
    }

    return merged;
  }, [courses]);

  // Update filtered courses when merged courses change
  useEffect(() => {
    setFilteredCourses(mergedCourses);
  }, [mergedCourses]);

  // Update enrolled status when dependencies change
  useEffect(() => {
    const { isEnrolled: checkEnrolled } = useCourseStore.getState();
    const enrolled = new Set();
    mergedCourses.forEach((course) => {
      if (checkEnrolled(course.id, user?.id)) {
        enrolled.add(course.id);
      }
    });
    setEnrolledCourseIds(enrolled);
  }, [mergedCourses, user?.id]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterCourses(query, selectedCategory);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterCourses(searchQuery, category);
  };

  const filterCourses = (query, category) => {
    let filtered = courses.length > 0 ? courses : filteredCourses;

    if (query) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((course) => course.category === category);
    }

    setFilteredCourses(filtered);
  };

  const handleEnroll = async (courseId) => {
    if (!user?.id) {
      toast.error('Please login to enroll in courses');
      return;
    }

    setIsEnrolling({ ...isEnrolling, [courseId]: true });
    try {
      await enrollCourse(courseId, user.id);
      setEnrolledCourseIds(new Set([...enrolledCourseIds, courseId]));
      toast.success('Successfully enrolled in course!');
      // Navigate to course details
      setTimeout(() => {
        navigate(`/student/courses/${courseId}`);
      }, 1000);
    } catch (error) {
      toast.error('Failed to enroll in course');
      console.error(error);
    } finally {
      setIsEnrolling({ ...isEnrolling, [courseId]: false });
    }
  };

  const categories = ['Frontend', 'Backend', 'Design', 'Full Stack', 'Mobile'];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Courses' }]} />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
        <p className="text-gray-600">
          Discover and enroll in {filteredCourses.length}+ courses from expert instructors
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryFilter('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === ''
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-xl transition-all">
            <div className="space-y-4">
              {/* Thumbnail */}
              <div className="text-5xl text-center py-8 bg-gray-100 rounded-lg">
                {course.thumbnail}
              </div>

              {/* Title and Info */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg flex-1">
                    {course.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{course.description}</p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge label={course.level} variant="primary" />
                  <Badge label={course.category} variant="secondary" />
                </div>

                {/* Instructor */}
                <p className="text-sm text-gray-600 mb-3">
                  by <span className="font-semibold">{course.instructor}</span>
                </p>

                {/* Rating and Students */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-warning-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">
                      {course.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users size={16} />
                    <span>{course.students}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant={enrolledCourseIds.has(course.id) ? 'secondary' : 'primary'}
                  className="w-full"
                  onClick={() => handleEnroll(course.id)}
                  disabled={isEnrolling[course.id] || enrolledCourseIds.has(course.id)}
                >
                  {isEnrolling[course.id]
                    ? 'Enrolling...'
                    : enrolledCourseIds.has(course.id)
                    ? 'Already Enrolled'
                    : 'Enroll Now'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No courses found matching your criteria</p>
          <Button
            variant="primary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
