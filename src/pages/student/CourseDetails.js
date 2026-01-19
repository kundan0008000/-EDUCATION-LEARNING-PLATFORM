import { useState, useEffect } from 'react';
import { Card, ProgressBar, Breadcrumb } from '../../components/UI';
import { Button } from '../../components/Form';
import { ArrowRight, FileText, Clock, Play, Download } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseStore } from '../../stores/courseStore';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

/**
 * Course Details Page Component
 * Shows detailed information about a specific course
 * Allows students to enroll and access course content
 */
export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { courses, enrollCourse } = useCourseStore();
  const [enrolled, setEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const course = courses.find((c) => c.id === parseInt(id)) || {
    id,
    title: 'Introduction to React',
    category: 'Frontend',
    level: 'Beginner',
    instructor: 'Kundan Kumar',
    rating: 4.8,
    students: 245,
    description: 'Learn React fundamentals from scratch and build modern web applications',
    fullDescription: 'This comprehensive course covers everything you need to know about React, including components, hooks, state management, and routing. Perfect for beginners!',
    duration: '12 weeks',
    thumbnail: '⚛️',
    price: 'Free',
    progress: 35,
    lectures: [],
    materials: [],
    modules: [
      {
        id: 1,
        title: 'Getting Started with React',
        lessons: 5,
        duration: '2 hours',
      },
      {
        id: 2,
        title: 'Components and Props',
        lessons: 8,
        duration: '4 hours',
      },
      {
        id: 3,
        title: 'State and Lifecycle',
        lessons: 6,
        duration: '3.5 hours',
      },
    ],
    syllabus: [
      'React basics and JSX',
      'Component types and lifecycle',
      'Hooks and state management',
      'Routing with React Router',
      'Building real projects',
    ],
  };

  useEffect(() => {
    if (user?.id) {
      const { isEnrolled: checkEnrolled } = useCourseStore.getState();
      setEnrolled(checkEnrolled(parseInt(id), user.id));
    }
  }, [id, user?.id]);

  const handleEnroll = async () => {
    if (!user?.id) {
      toast.error('Please login to enroll in courses');
      navigate('/login');
      return;
    }

    setIsEnrolling(true);
    try {
      await enrollCourse(parseInt(id), user.id);
      setEnrolled(true);
      toast.success('Successfully enrolled in course!');
    } catch (error) {
      toast.error('Failed to enroll in course');
      console.error(error);
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Courses', href: '/student/courses' }, { label: course.title }]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="text-6xl mb-4">{course.thumbnail}</div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-primary-100 mb-4">{course.fullDescription}</p>
            <div className="flex gap-4 text-sm">
              <span>⭐ {course.rating} ({course.students} students)</span>
              <span>📚 {course.duration}</span>
              <span>📊 {course.level}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-primary-100 mb-2">by</p>
            <p className="font-semibold text-lg mb-4">{course.instructor}</p>
            <Button
              variant={enrolled ? 'secondary' : 'primary'}
              size="lg"
              onClick={handleEnroll}
              className="w-full"
              disabled={enrolled || isEnrolling}
            >
              {isEnrolling
                ? 'Enrolling...'
                : enrolled
                ? 'Enrolled'
                : 'Enroll Now'}
            </Button>
          </div>
        </div>
      </div>

      {enrolled && (
        <Card title="Your Progress">
          <ProgressBar value={course.progress} max={100} />
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Lectures - Only visible to enrolled students */}
          {enrolled && course.lectures && course.lectures.length > 0 && (
            <Card title="Video Lectures" subtitle={`${course.lectures.length} lectures`}>
              <div className="space-y-3">
                {course.lectures.map((lecture, index) => (
                  <div
                    key={lecture.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3 flex-1">
                        <Play size={20} className="text-primary-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {index + 1}. {lecture.title}
                          </h3>
                          <p className="text-sm text-gray-600">{lecture.duration} minutes</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(lecture.url, '_blank')}
                      >
                        <Play size={18} className="text-primary-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Study Materials - Only visible to enrolled students */}
          {enrolled && course.materials && course.materials.length > 0 && (
            <Card title="Study Materials" subtitle={`${course.materials.length} files`}>
              <div className="space-y-3">
                {course.materials.map((material) => (
                  <div
                    key={material.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 flex-1">
                        <Download size={20} className="text-primary-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{material.title}</h3>
                          <p className="text-xs text-gray-600">{material.type?.toUpperCase()}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(material.url, '_blank')}
                      >
                        <Download size={18} className="text-primary-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Modules */}
          <Card title="Course Modules" subtitle={`${course.modules.length} modules`}>
            <div className="space-y-3">
              {course.modules.map((module, index) => (
                <div
                  key={module.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {index + 1}. {module.title}
                    </h3>
                    {enrolled && (
                      <Button variant="ghost" size="sm">
                        <ArrowRight size={18} />
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FileText size={16} /> {module.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} /> {module.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quizzes - Only visible to enrolled students */}
          {enrolled && (
            <Card title="Course Quizzes">
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-900 mb-2">Module 1 Quiz</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Test your knowledge of React fundamentals
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/student/quizzes/1`)}
                  >
                    Take Quiz
                  </Button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-900 mb-2">Module 2 Quiz</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Test your knowledge of components and props
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/student/quizzes/2`)}
                  >
                    Take Quiz
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Syllabus */}
          <Card title="What You'll Learn">
            <ul className="space-y-3">
              {course.syllabus.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Info Card */}
          <Card title="Course Information">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <p className="font-semibold text-gray-900">{course.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Level</p>
                <p className="font-semibold text-gray-900">{course.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="font-semibold text-gray-900">{course.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="font-semibold text-gray-900">{course.price}</p>
              </div>
              {enrolled && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lectures</p>
                  <p className="font-semibold text-gray-900">
                    {course.lectures?.length || 0} videos
                  </p>
                </div>
              )}
              {enrolled && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Materials</p>
                  <p className="font-semibold text-gray-900">
                    {course.materials?.length || 0} files
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Instructor Card */}
          <Card title="Instructor">
            <div className="text-center">
              <div className="text-6xl mb-4">👨‍🏫</div>
              <h3 className="font-semibold text-gray-900 mb-2">{course.instructor}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Expert instructor with 10+ years of experience
              </p>
              <Button variant="secondary" className="w-full" size="sm">
                View Profile
              </Button>
            </div>
          </Card>

          {/* Share Card */}
          <Card>
            <p className="text-sm text-gray-600 mb-4">Share this course</p>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1">
                📱 Share
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                💬 Message
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
