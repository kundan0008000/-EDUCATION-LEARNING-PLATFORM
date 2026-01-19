import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Breadcrumb, Badge } from '../../components/UI';
import { Button } from '../../components/Form';
import { useQuizStore } from '../../stores/quizStore';
import { Plus, Edit, Trash2, Eye, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Instructor Quizzes List Page Component
 * Displays all quizzes created by instructor with management options
 */
export default function InstructorQuizzes() {
  const navigate = useNavigate();
  const { deleteQuiz } = useQuizStore();
  const [displayQuizzes, setDisplayQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const { quizzes: updatedQuizzes } = useQuizStore.getState();
    let filtered = updatedQuizzes;
    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setDisplayQuizzes(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleDeleteQuiz = (id) => {
    if (window.confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      deleteQuiz(id);
      toast.success('Quiz deleted successfully');
    }
  };

  const getQuizStats = (quizId) => {
    const { fetchQuizResults: getResults } = useQuizStore.getState();
    const results = getResults(quizId);
    return {
      attempts: results.length,
      averageScore: results.length > 0
        ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
        : 0,
      passedCount: results.filter(r => r.passed).length,
    };
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Quizzes' }]} />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Quizzes</h1>
          <p className="text-gray-600">{displayQuizzes.length} quiz{displayQuizzes.length !== 1 ? 'zes' : ''}</p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/instructor/quizzes/create')}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Create Quiz
        </Button>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Quizzes List */}
      {displayQuizzes.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600 mb-4">No quizzes created yet</p>
          <Button
            variant="primary"
            onClick={() => navigate('/instructor/quizzes/create')}
          >
            Create Your First Quiz
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {displayQuizzes.map((quiz) => {
            const stats = getQuizStats(quiz.id);
            return (
              <Card key={quiz.id} className="hover:shadow-lg transition-all">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{quiz.title}</h3>
                      {quiz.settings.timeLimit && (
                        <Badge variant="secondary" className="text-xs">
                          {quiz.settings.timeLimit}m
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {quiz.questions.length} Q
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{quiz.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4 py-3 border-t border-b border-gray-200 my-3">
                      <div>
                        <p className="text-xs text-gray-600">Attempts</p>
                        <p className="text-lg font-bold text-gray-900">{stats.attempts}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Avg Score</p>
                        <p className="text-lg font-bold text-gray-900">{stats.averageScore}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Passed</p>
                        <p className="text-lg font-bold text-success-600">{stats.passedCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Pass Rate</p>
                        <p className="text-lg font-bold text-gray-900">
                          {stats.attempts > 0 ? Math.round((stats.passedCount / stats.attempts) * 100) : 0}%
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Created: {new Date(quiz.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Updated: {new Date(quiz.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/instructor/quizzes/${quiz.id}/results`)}
                      className="gap-1 flex items-center justify-center"
                      title="View Results"
                    >
                      <BarChart3 size={16} />
                      <span className="hidden sm:inline">Results</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/instructor/quizzes/${quiz.id}`)}
                      className="gap-1 flex items-center justify-center"
                      title="Preview"
                    >
                      <Eye size={16} />
                      <span className="hidden sm:inline">Preview</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/instructor/quizzes/${quiz.id}/edit`)}
                      className="gap-1 flex items-center justify-center"
                      title="Edit"
                    >
                      <Edit size={16} />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      className="gap-1 flex items-center justify-center"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
