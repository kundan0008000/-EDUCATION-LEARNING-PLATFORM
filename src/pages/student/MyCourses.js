import { useState } from 'react';
import { Card, Breadcrumb, Tabs } from '../../components/UI';
import { Button } from '../../components/Form';

/**
 * My Courses Page Component
 * Display all courses the student is enrolled in
 */
export default function MyCourses() {
  const [courses] = useState([
    {
      id: 1,
      title: 'Introduction to React',
      instructor: 'kundan kumar',
      progress: 65,
      lastAccessed: '2025-11-20',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      instructor: 'balwant singh',
      progress: 42,
      lastAccessed: '2025-11-18',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Web Design Fundamentals',
      instructor: 'Gautam Govind',
      progress: 100,
      lastAccessed: '2025-11-15',
      status: 'Completed',
    },
  ]);

  const inProgressCourses = courses.filter((c) => c.status === 'In Progress');
  const completedCourses = courses.filter((c) => c.status === 'Completed');

  const CourseCard = ({ course }) => (
    <Card className="hover:shadow-lg transition-all">
      <div className="space-y-4">
        <div className="text-4xl">📚</div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-bold text-primary-600">{course.progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
          </p>
        </div>
        <Button variant="primary" className="w-full" size="sm">
          Continue Learning
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'My Courses' }]} />

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Path</h1>
        <p className="text-gray-600">
          {courses.length} total courses • {inProgressCourses.length} in progress
        </p>
      </div>

      <Tabs
        tabs={[
          {
            label: `In Progress (${inProgressCourses.length})`,
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ),
          },
          {
            label: `Completed (${completedCourses.length})`,
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
