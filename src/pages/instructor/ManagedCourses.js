import { useState, useEffect } from 'react';
import { Card, Breadcrumb } from '../../components/UI';
import { Button } from '../../components/Form';
import { useNavigate } from 'react-router-dom';
import { useCourseStore } from '../../stores/courseStore';
import { Edit, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Managed Courses Page Component
 * List and manage all instructor courses
 */
export default function ManagedCourses() {
  const navigate = useNavigate();
  const [displayCourses, setDisplayCourses] = useState([]);

  useEffect(() => {
    const { courses: initialCourses } = useCourseStore.getState();
    setDisplayCourses(initialCourses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updatedCourses = displayCourses.filter(course => course.id !== id);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setDisplayCourses(updatedCourses);
      toast.success('Course deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'My Courses' }]} />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">{displayCourses.length} course{displayCourses.length !== 1 ? 's' : ''} created</p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/instructor/courses/create')}
          className="gap-2"
        >
          <Plus size={18} />
          New Course
        </Button>
      </div>

      {displayCourses.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600 mb-4">No courses created yet</p>
          <Button
            variant="primary"
            onClick={() => navigate('/instructor/courses/create')}
          >
            Create Your First Course
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6">
          {displayCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-all">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {course.title}
                    </h3>
                    <div className="flex gap-2">
                      <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                      <span className="inline-block bg-success-100 text-success-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {course.status || 'Draft'}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                  <div className="grid grid-cols-4 gap-4 my-4">
                    <div>
                      <p className="text-sm text-gray-600">Students</p>
                      <p className="text-xl font-bold text-gray-900">{course.students || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Level</p>
                      <p className="text-xl font-bold text-gray-900">{course.level}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="text-xl font-bold text-gray-900">{course.duration}w</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Capacity</p>
                      <p className="text-xl font-bold text-gray-900">{course.capacity}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/instructor/courses/${course.id}/edit`)}
                    className="gap-1"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                    className="gap-1"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


