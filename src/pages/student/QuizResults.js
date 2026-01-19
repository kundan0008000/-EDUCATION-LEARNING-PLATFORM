import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Breadcrumb, Badge } from '../../components/UI';
import { Button } from '../../components/Form';
import { CheckCircle, XCircle, ArrowLeft, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Quiz Results Page Component
 * Displays score, detailed results, correct answers, and performance analytics
 */
export default function QuizResults() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [quiz, setQuiz] = useState(null);

  // Fetch result on mount
  useEffect(() => {
    try {
      const storedResults = localStorage.getItem('quizResults');
      const results = storedResults ? JSON.parse(storedResults) : [];
      const foundResult = results.find(r => r.id === resultId);

      if (foundResult) {
        setResult(foundResult);

        // Get quiz details
        const storedQuizzes = localStorage.getItem('quizzes');
        const quizzes = storedQuizzes ? JSON.parse(storedQuizzes) : [];
        const foundQuiz = quizzes.find(q => q.id === foundResult.quizId);
        setQuiz(foundQuiz);
      } else {
        navigate('/student/dashboard');
      }
    } catch (error) {
      console.error('Error loading results:', error);
      navigate('/student/dashboard');
    }
  }, [resultId, navigate]);

  if (!result || !quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading results...</p>
      </div>
    );
  }

  // Score color determined by pass/fail status displayed in badge

  const categoryData = [
    {
      category: 'Correct',
      count: result.correctAnswers,
      percentage: Math.round((result.correctAnswers / result.totalQuestions) * 100),
    },
    {
      category: 'Incorrect',
      count: result.totalQuestions - result.correctAnswers,
      percentage: Math.round(((result.totalQuestions - result.correctAnswers) / result.totalQuestions) * 100),
    },
  ];

  const downloadResults = () => {
    const text = `Quiz Results Report
========================
Quiz: ${quiz.title}
Score: ${result.score}%
Correct Answers: ${result.correctAnswers}/${result.totalQuestions}
Time Taken: ${result.timeTaken}
Status: ${result.passed ? 'PASSED' : 'FAILED'}

Detailed Results:
${result.detailedResults.map((r, idx) => `
Question ${idx + 1}: ${r.questionText}
Your Answer: ${Array.isArray(r.studentAnswer) ? r.studentAnswer.join(', ') : r.studentAnswer}
Correct Answer: ${Array.isArray(r.correctAnswer) ? r.correctAnswer.join(', ') : r.correctAnswer}
Result: ${r.isCorrect ? 'CORRECT' : 'INCORRECT'}
Points: ${r.points}
`).join('')}`;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `quiz-results-${result.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/student/courses')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <Breadcrumb items={[{ label: 'Courses', href: '/student/courses' }, { label: 'Quiz Results' }]} />
      </div>

      {/* Score Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
          <p className="text-primary-100 mb-6">Quiz completed on {new Date(result.completedAt).toLocaleDateString()}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Score */}
            <div>
              <p className="text-primary-100 text-sm mb-2">Your Score</p>
              <div className="flex items-end gap-4">
                <div className="text-6xl font-bold">{result.score}%</div>
                <Badge
                  variant={result.passed ? 'success' : 'danger'}
                  className="text-lg px-4 py-2"
                >
                  {result.passed ? 'PASSED' : 'FAILED'}
                </Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-primary-100">Correct Answers:</span>
                <span className="font-semibold">{result.correctAnswers}/{result.totalQuestions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-100">Points Earned:</span>
                <span className="font-semibold">{result.totalPoints}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-100">Time Taken:</span>
                <span className="font-semibold">{result.timeTaken}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-100">Passing Score:</span>
                <span className="font-semibold">{quiz.settings.passingScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {categoryData.map((item) => (
              <div key={item.category} className="flex items-center gap-4">
                <div className="w-12">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                    item.category === 'Correct'
                      ? 'bg-success-100'
                      : 'bg-danger-100'
                  }`}>
                    {item.category === 'Correct' ? (
                      <CheckCircle size={20} className="text-success-600" />
                    ) : (
                      <XCircle size={20} className="text-danger-600" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.category}</p>
                  <p className="text-sm text-gray-600">
                    {item.count} question{item.count !== 1 ? 's' : ''} ({item.percentage}%)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Detailed Results */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Detailed Results</h2>

        <div className="space-y-4">
          {result.detailedResults.map((item, idx) => (
            <div
              key={idx}
              className={`border-2 rounded-lg p-4 ${
                item.isCorrect
                  ? 'border-success-200 bg-success-50'
                  : 'border-danger-200 bg-danger-50'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="mt-1">
                  {item.isCorrect ? (
                    <CheckCircle size={24} className="text-success-600" />
                  ) : (
                    <XCircle size={24} className="text-danger-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Question {idx + 1}: {item.questionText}</p>
                  <p className={`text-sm font-semibold mt-1 ${
                    item.isCorrect ? 'text-success-700' : 'text-danger-700'
                  }`}>
                    {item.isCorrect ? 'Correct' : 'Incorrect'} • {item.points} point{item.points !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Answers */}
              <div className="ml-9 space-y-3 text-sm">
                {/* Your Answer */}
                <div>
                  <p className="font-medium text-gray-700 mb-1">Your Answer:</p>
                  <p className="text-gray-900 bg-white px-3 py-2 rounded border border-gray-200">
                    {Array.isArray(item.studentAnswer)
                      ? item.studentAnswer.length > 0
                        ? item.studentAnswer.join(', ')
                        : 'Not answered'
                      : item.studentAnswer || 'Not answered'}
                  </p>
                </div>

                {/* Correct Answer */}
                {!item.isCorrect && (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Correct Answer:</p>
                    <p className="text-gray-900 bg-white px-3 py-2 rounded border border-gray-200 border-success-300 bg-success-50">
                      {Array.isArray(item.correctAnswer)
                        ? item.correctAnswer.join(', ')
                        : item.correctAnswer}
                    </p>
                  </div>
                )}

                {/* Explanation */}
                {item.explanation && (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Explanation:</p>
                    <p className="text-gray-700 bg-white px-3 py-2 rounded border border-gray-200">
                      {item.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button
          variant="secondary"
          onClick={downloadResults}
          className="flex items-center gap-2"
        >
          <Download size={18} />
          Download Results
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate('/student/courses')}
        >
          Back to Courses
        </Button>
      </div>
    </div>
  );
}
