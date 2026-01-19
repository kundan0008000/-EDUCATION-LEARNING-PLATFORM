import { useState } from 'react';
import { Card, Breadcrumb, Badge } from '../../components/UI';
import { Button } from '../../components/Form';
import { useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';

/**
 * Manage Submissions Page Component
 */
export default function ManageSubmissions() {
  useParams();
  const [submissions] = useState([
    {
      id: 1,
      student: 'John Doe',
      assignment: 'Build Todo App',
      submittedDate: '2025-11-20',
      status: 'Pending Review',
      score: null,
    },
    {
      id: 2,
      student: 'Jane Smith',
      assignment: 'Build Todo App',
      submittedDate: '2025-11-19',
      status: 'Graded',
      score: 95,
    },
  ]);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Submissions' }]} />
      <h1 className="text-3xl font-bold text-gray-900">Student Submissions</h1>

      <Card>
        <div className="space-y-3">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{submission.student}</h3>
                  <p className="text-sm text-gray-600">{submission.assignment}</p>
                </div>
                <Badge
                  label={submission.status}
                  variant={submission.score ? 'success' : 'warning'}
                />
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Submitted: {new Date(submission.submittedDate).toLocaleDateString()}
              </p>
              {submission.score && (
                <p className="text-sm font-semibold text-success-600 mb-3">
                  Score: {submission.score}/100
                </p>
              )}
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="gap-2">
                  <FileText size={16} />
                  View
                </Button>
                {!submission.score && (
                  <Button variant="primary" size="sm">
                    Grade
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
