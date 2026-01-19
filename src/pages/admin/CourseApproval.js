import { useState } from 'react';
import { Card, Breadcrumb, Badge } from '../../components/UI';
import { Button } from '../../components/Form';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

/**
 * Course Approval Page Component
 * Review and approve new courses
 */
export default function CourseApproval() {
  const [courses] = useState([
    {
      id: 1,
      title: 'Python for Beginners',
      instructor: 'kundan kumar',
      category: 'Backend',
      status: 'Pending',
      submittedDate: '2025-11-20',
      description: 'Learn Python basics and fundamentals',
    },
    {
      id: 2,
      title: 'Mobile App Development',
      instructor: 'Balwant singh',
      category: 'Mobile',
      status: 'Approved',
      submittedDate: '2025-11-15',
      description: 'Create native mobile applications',
    },
  ]);

  const pendingCourses = courses.filter((c) => c.status === 'Pending');
  const approvedCourses = courses.filter((c) => c.status === 'Approved');

  const CourseCard = ({ course }) => (
    <Card className="hover:shadow-lg transition-all">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-1">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
            <p className="text-sm text-gray-600 mb-3">{course.description}</p>
            <Badge label={course.category} variant="primary" />
          </div>
          <Badge
            label={course.status}
            variant={course.status === 'Approved' ? 'success' : 'warning'}
          />
        </div>

        <div className="border-t border-gray-200 pt-3">
          <p className="text-xs text-gray-500 mb-3">
            Submitted: {new Date(course.submittedDate).toLocaleDateString()}
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1 gap-2">
              <Eye size={16} />
              Review
            </Button>
            {course.status === 'Pending' && (
              <>
                <Button variant="primary" size="sm" className="flex-1 gap-2">
                  <CheckCircle size={16} />
                  Approve
                </Button>
                <Button variant="secondary" size="sm" className="gap-2">
                  <XCircle size={16} />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Course Approval' }]} />

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Approval</h1>
        <p className="text-gray-600">
          {pendingCourses.length} pending • {approvedCourses.length} approved
        </p>
      </div>

      {/* Pending Courses */}
      {pendingCourses.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Pending Review</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}

      {/* Approved Courses */}
      {approvedCourses.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Approved Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approvedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
