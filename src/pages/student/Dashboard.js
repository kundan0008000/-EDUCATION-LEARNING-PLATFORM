import { useState, useEffect } from 'react';
import { Card, ProgressBar, Skeleton, EmptyState } from '../../components/UI';
import { Button } from '../../components/Form';
import { useCourseStore } from '../../stores/courseStore';
import { useQuizStore } from '../../stores/quizStore';
import { useAuthStore } from '../../stores/authStore';
import { BookOpen, BarChart3, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

/**
 * Student Dashboard Component
 * Main dashboard for students showing courses, progress, and learning statistics
 * 
 * Features:
 * - Overview of enrolled courses
 * - Learning progress visualization
 * - Recent activity and upcoming assignments
 * - Performance analytics
 */
export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { isLoading } = useCourseStore();
  const [myCourses, setMyCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [availableQuizzes, setAvailableQuizzes] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    // Get store functions directly from store state to avoid dependency issues
    const { quizzes, fetchStudentResults } = useQuizStore.getState();
    
    // Fetch student results
    const studentResults = fetchStudentResults(user?.id);
    
    // Mock data for enrolled courses
    const courses = [
      {
        id: 1,
        title: 'Introduction to React',
        instructor: 'kundan kumar',
        progress: 65,
        nextDeadline: '2025-12-05',
        students: 245,
      },
      {
        id: 2,
        title: 'Advanced JavaScript',
        instructor: 'balwant singh',
        progress: 42,
        nextDeadline: '2025-12-10',
        students: 189,
      },
      {
        id: 3,
        title: 'Web Design Fundamentals',
        instructor: 'Gautam Govind',
        progress: 88,
        nextDeadline: '2025-12-15',
        students: 312,
      },
    ];

    // Build recent activity from quiz results and mock activities
    const activities = [];

    // Add recent quiz results
    if (studentResults && studentResults.length > 0) {
      studentResults.slice(0, 3).forEach((result) => {
        const quiz = quizzes.find(q => q.id === result.quizId);
        activities.push({
          type: 'quiz',
          course: quiz?.title || 'Quiz',
          score: result.score,
          date: result.completedAt,
          passed: result.passed,
        });
      });
    }

    // Add mock activities if not enough results
    if (activities.length < 3) {
      if (activities.length === 0) {
        activities.push(
          { type: 'quiz', course: 'React Basics', score: 92, date: '2025-11-20', passed: true },
          { type: 'assignment', course: 'JavaScript', submitted: true, date: '2025-11-19' },
          { type: 'lesson', course: 'Web Design', completed: true, date: '2025-11-18' }
        );
      }
    }

    // Update all state at once
    setMyCourses(courses);
    setAvailableQuizzes(quizzes);
    setRecentActivity(activities);
  }, [user?.id]);

  // Mock progress data for chart
  const progressData = [
    { week: 'Week 1', progress: 20 },
    { week: 'Week 2', progress: 35 },
    { week: 'Week 3', progress: 52 },
    { week: 'Week 4', progress: 68 },
    { week: 'Week 5', progress: 74 },
    { week: 'Week 6', progress: 82 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-primary-100">
          You're making great progress in your learning journey. Keep it up!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="bg-primary-100 p-3 rounded-lg">
              <BookOpen size={24} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">{myCourses.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="bg-success-100 p-3 rounded-lg">
              <BarChart3 size={24} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Progress</p>
              <p className="text-2xl font-bold text-gray-900">65%</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="bg-warning-100 p-3 rounded-lg">
              <Clock size={24} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Hours Spent</p>
              <p className="text-2xl font-bold text-gray-900">24.5</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="bg-accent-100 p-3 rounded-lg">
              <Users size={24} className="text-accent-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">746</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card title="Learning Progress" subtitle="Your progress over the last 6 weeks">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={{ fill: '#0ea5e9', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-2">
          <Card title="My Courses" subtitle={`${myCourses.length} active courses`}>
            <div className="space-y-4">
              {isLoading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} className="h-20" />)
              ) : myCourses.length === 0 ? (
                <EmptyState
                  icon={BookOpen}
                  title="No Courses Yet"
                  description="Explore available courses and enroll to get started"
                  action={<Button variant="primary">Browse Courses</Button>}
                />
              ) : (
                myCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">by {course.instructor}</p>
                      </div>
                      <span className="text-sm font-semibold text-primary-600">{course.progress}%</span>
                    </div>
                    <ProgressBar value={course.progress} max={100} showLabel={false} />
                    <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                      <Clock size={14} />
                      Next deadline: {new Date(course.nextDeadline).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Available Quizzes */}
          <Card title="Available Quizzes" subtitle={`${availableQuizzes.length} quizzes`} className="mt-6">
            <div className="space-y-3">
              {availableQuizzes.length === 0 ? (
                <p className="text-gray-600 text-center py-6">No quizzes available yet</p>
              ) : (
                availableQuizzes.slice(0, 5).map((quiz) => (
                  <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{quiz.title}</h4>
                        <p className="text-sm text-gray-600">{quiz.description}</p>
                      </div>
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        {quiz.questions?.length || 0} Q
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        {quiz.settings?.timeLimit && (
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {quiz.settings.timeLimit} min
                          </span>
                        )}
                        <span>Score: {quiz.settings?.passingScore || 60}% to pass</span>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/student/quizzes/${quiz.id}`)}
                      >
                        Take Quiz
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card title="Recent Activity" subtitle="Your latest actions">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 mt-1 ${
                      activity.type === 'quiz'
                        ? activity.passed ? 'text-success-500' : 'text-warning-500'
                        : activity.type === 'assignment'
                        ? 'text-success-500'
                        : 'text-primary-500'
                    }`}>
                      {activity.type === 'quiz' ? (
                        activity.passed ? <CheckCircle size={18} /> : <AlertCircle size={18} />
                      ) : activity.type === 'assignment' ? (
                        <CheckCircle size={18} />
                      ) : (
                        <CheckCircle size={18} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.type === 'quiz'
                          ? `Quiz: ${activity.course}`
                          : activity.type === 'assignment'
                          ? `Submitted: ${activity.course}`
                          : `Completed: ${activity.course}`}
                      </p>
                      {activity.score !== undefined && (
                        <p className="text-xs text-gray-600">
                          Score: {activity.score}%
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
