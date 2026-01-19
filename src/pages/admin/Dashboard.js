import { Card } from '../../components/UI';
import { Button } from '../../components/Form';
import { useAuthStore } from '../../stores/authStore';
import { Users, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

/**
 * Admin Dashboard Component
 * System overview and analytics for administrators
 */
export default function AdminDashboard() {
  const { user } = useAuthStore();

  const stats = {
    totalUsers: 1250,
    totalCourses: 145,
    totalEnrollments: 5420,
    pendingApprovals: 8,
  };

  const userDistribution = [
    { name: 'Students', value: 1000, color: '#0ea5e9' },
    { name: 'Instructors', value: 200, color: '#22c55e' },
    { name: 'Admins', value: 50, color: '#f59e0b' },
  ];

  const activityData = [
    { date: 'Mon', users: 120, courses: 15 },
    { date: 'Tue', users: 150, courses: 18 },
    { date: 'Wed', users: 200, courses: 25 },
    { date: 'Thu', users: 180, courses: 20 },
    { date: 'Fri', users: 220, courses: 28 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-primary-100">System overview and management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Users size={24} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="bg-success-100 p-3 rounded-lg">
              <BookOpen size={24} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="bg-warning-100 p-3 rounded-lg">
              <TrendingUp size={24} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="bg-danger-100 p-3 rounded-lg">
              <AlertCircle size={24} className="text-danger-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card title="System Activity" subtitle="Last 5 days">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#0ea5e9" name="New Users" />
              <Line type="monotone" dataKey="courses" stroke="#22c55e" name="New Courses" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* User Distribution */}
        <Card title="User Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {userDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button variant="primary" className="w-full">
            Manage Users
          </Button>
          <Button variant="primary" className="w-full">
            Review Courses
          </Button>
          <Button variant="primary" className="w-full">
            View Analytics
          </Button>
        </div>
      </Card>
    </div>
  );
}
