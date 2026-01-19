import { useState, useEffect } from 'react';
import { Card, ProgressBar } from '../../components/UI';
import { Button } from '../../components/Form';
import { useAuthStore } from '../../stores/authStore';
import { BookOpen, Users, TrendingUp, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

/**
 * Instructor Dashboard Component
 * Main dashboard for instructors with course management and analytics
 */
export default function InstructorDashboard() {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    averageRating: 0,
    totalSubmissions: 0,
  });

  useEffect(() => {
    // Mock data
    setCourses([
      {
        id: 1,
        title: 'Introduction to React',
        students: 245,
        rating: 4.8,
        progress: 65,
        lastUpdated: '2025-11-20',
      },
      {
        id: 2,
        title: 'Advanced JavaScript',
        students: 189,
        rating: 4.6,
        progress: 42,
        lastUpdated: '2025-11-18',
      },
      {
        id: 3,
        title: 'Web Design Fundamentals',
        students: 312,
        rating: 4.9,
        progress: 88,
        lastUpdated: '2025-11-15',
      },
    ]);

    setStats({
      totalCourses: 3,
      totalStudents: 746,
      averageRating: 4.77,
      totalSubmissions: 234,
    });
  }, []);

  const enrollmentData = [
    { month: 'Jan', enrollments: 120 },
    { month: 'Feb', enrollments: 150 },
    { month: 'Mar', enrollments: 200 },
    { month: 'Apr', enrollments: 245 },
  ];

  const submissionData = [
    { assignment: 'A1', submitted: 85 },
    { assignment: 'A2', submitted: 72 },
    { assignment: 'A3', submitted: 68 },
    { assignment: 'A4', submitted: 91 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -m-6 p-6">
      <div className="space-y-8">
      {/* Welcome */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-2xl overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">Welcome back, {user?.name}! 👋</h1>
          <p className="text-blue-100 text-lg">You're making great progress in your learning journey. Keep it up!</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-4 p-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
              <BookOpen size={28} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Courses</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4 p-2">
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-4 rounded-xl shadow-lg">
              <Users size={28} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4 p-2">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg">
              <TrendingUp size={28} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Average Progress</p>
              <p className="text-3xl font-bold text-gray-900">65%</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4 p-2">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl shadow-lg">
              <FileText size={28} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Hours Spent</p>
              <p className="text-3xl font-bold text-gray-900">24.5</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card title="Enrollment Trends" subtitle="Last 4 months">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="enrollments"
                stroke="#0ea5e9"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Assignment Submissions */}
        <Card title="Assignment Submissions" subtitle="Submission rates">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={submissionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="assignment" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="submitted" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Courses */}
      <Card title="Your Courses" subtitle={`${courses.length} active courses`}>
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.students} students enrolled</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-warning-600">⭐ {course.rating}</p>
                  <p className="text-xs text-gray-500">
                    Updated {new Date(course.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <ProgressBar value={course.progress} max={100} showLabel={false} />
              <div className="flex gap-2 mt-3">
                <Button variant="secondary" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  View Submissions
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      </div>
    </div>
  );
}
