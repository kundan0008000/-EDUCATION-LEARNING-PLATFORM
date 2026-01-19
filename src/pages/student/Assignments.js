import { useState } from 'react';
import { Card, Breadcrumb, Tabs, Badge } from '../../components/UI';
import { Button } from '../../components/Form';
import { Calendar, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Student Assignments Page Component
 * Manage and submit assignments
 */
export default function Assignments() {
  const [assignments] = useState([
    {
      id: 1,
      title: 'Build a Todo App with React',
      course: 'Introduction to React',
      dueDate: '2025-12-05',
      status: 'Pending',
      description: 'Create a functional todo application using React hooks',
      submitted: false,
    },
    {
      id: 2,
      title: 'JavaScript Array Methods Quiz',
      course: 'Advanced JavaScript',
      dueDate: '2025-11-30',
      status: 'Overdue',
      description: 'Complete the quiz covering array methods and practices',
      submitted: false,
    },
    {
      id: 3,
      title: 'Responsive Website Project',
      course: 'Web Design Fundamentals',
      dueDate: '2025-11-20',
      status: 'Submitted',
      description: 'Create a fully responsive website design',
      submitted: true,
      submittedDate: '2025-11-19',
      score: 95,
    },
  ]);

  const pendingAssignments = assignments.filter((a) => a.status !== 'Submitted');
  const submittedAssignments = assignments.filter((a) => a.status === 'Submitted');

  const AssignmentCard = ({ assignment }) => {
    const isOverdue = new Date(assignment.dueDate) < new Date() && !assignment.submitted;
    const daysLeft = Math.ceil(
      (new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
    );

    return (
      <Card className="hover:shadow-lg transition-all">
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg mb-1">{assignment.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{assignment.course}</p>
              <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
            </div>
            <Badge
              label={assignment.status}
              variant={
                assignment.status === 'Submitted'
                  ? 'success'
                  : assignment.status === 'Overdue'
                  ? 'danger'
                  : 'warning'
              }
            />
          </div>

          <div className="border-t border-gray-200 pt-3">
            {assignment.submitted ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-success-600" />
                  <span className="text-gray-700">
                    Submitted on {new Date(assignment.submittedDate).toLocaleDateString()}
                  </span>
                </div>
                {assignment.score && (
                  <div className="text-sm font-semibold text-success-600">
                    Score: {assignment.score}/100
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    isOverdue ? 'text-danger-600' : 'text-warning-600'
                  }`}
                >
                  {isOverdue ? (
                    <AlertCircle size={16} />
                  ) : (
                    <Calendar size={16} />
                  )}
                  <span>
                    {isOverdue
                      ? 'OVERDUE'
                      : daysLeft > 0
                      ? `Due in ${daysLeft} days`
                      : 'Due today'}{' '}
                    ({new Date(assignment.dueDate).toLocaleDateString()})
                  </span>
                </div>
                <Button variant="primary" className="w-full" size="sm">
                  Submit Assignment
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Assignments' }]} />

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignments</h1>
        <p className="text-gray-600">
          {pendingAssignments.length} pending • {submittedAssignments.length} submitted
        </p>
      </div>

      <Tabs
        tabs={[
          {
            label: `Pending (${pendingAssignments.length})`,
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
              </div>
            ),
          },
          {
            label: `Submitted (${submittedAssignments.length})`,
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {submittedAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
