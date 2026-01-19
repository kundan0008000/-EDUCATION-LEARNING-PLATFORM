import { Card, Breadcrumb } from '../../components/UI';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * System Analytics Page Component
 * Detailed analytics and reports for administrators
 */
export default function SystemAnalytics() {
  const courseEnrollmentData = [
    { month: 'Jan', enrollments: 120, completions: 45 },
    { month: 'Feb', enrollments: 150, completions: 65 },
    { month: 'Mar', enrollments: 200, completions: 89 },
    { month: 'Apr', enrollments: 245, completions: 120 },
  ];

  const topCourses = [
    { name: 'React Basics', enrollments: 245, rating: 4.8 },
    { name: 'JavaScript Advanced', enrollments: 189, rating: 4.6 },
    { name: 'Web Design', enrollments: 312, rating: 4.9 },
    { name: 'Python Basics', enrollments: 156, rating: 4.7 },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Analytics' }]} />

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Analytics</h1>
        <p className="text-gray-600">Platform performance and usage statistics</p>
      </div>

      {/* Enrollment Trends */}
      <Card title="Enrollment & Completion Trends" subtitle="Last 4 months">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={courseEnrollmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="enrollments" fill="#0ea5e9" />
            <Bar dataKey="completions" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Courses */}
      <Card title="Top Performing Courses">
        <div className="space-y-3">
          {topCourses.map((course, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{course.name}</h3>
                <span className="text-warning-600">⭐ {course.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{course.enrollments} enrollments</p>
                <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600"
                    style={{ width: `${(course.enrollments / 312) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
