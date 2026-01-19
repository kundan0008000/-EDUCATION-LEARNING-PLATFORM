import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Breadcrumb } from '../../components/UI';
import { useQuizStore } from '../../stores/quizStore';
import { ArrowLeft } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Instructor Quiz Results Page Component
 * Displays comprehensive quiz analytics and student performance
 */
export default function InstructorQuizResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const { quizzes: storeQuizzes, fetchQuizResults: getResults } = useQuizStore.getState();
    const foundQuiz = storeQuizzes.find(q => q.id === id);
    if (foundQuiz) {
      setQuiz(foundQuiz);
      const quizResults = getResults?.(id) || [];
      setResults(quizResults);

      // Calculate stats
      if (quizResults.length > 0) {
        const scores = quizResults.map(r => r.score);
        const avgTime = quizResults.map(r => {
          const parts = r.timeTaken.split(':').map(p => parseInt(p));
          if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
          return parts[0] * 60 + parts[1];
        });

        setStats({
          totalAttempts: quizResults.length,
          averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
          highestScore: Math.max(...scores),
          lowestScore: Math.min(...scores),
          passRate: Math.round((quizResults.filter(r => r.passed).length / quizResults.length) * 100),
          averageTime: Math.round(avgTime.reduce((a, b) => a + b, 0) / avgTime.length / 60),
        });
      }
    } else {
      navigate('/instructor/quizzes');
    }
  }, [id, navigate]);

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading results...</p>
      </div>
    );
  }

  // Prepare chart data
  const scoreDistribution = [
    { range: '0-20%', count: results.filter(r => r.score < 20).length },
    { range: '20-40%', count: results.filter(r => r.score >= 20 && r.score < 40).length },
    { range: '40-60%', count: results.filter(r => r.score >= 40 && r.score < 60).length },
    { range: '60-80%', count: results.filter(r => r.score >= 60 && r.score < 80).length },
    { range: '80-100%', count: results.filter(r => r.score >= 80).length },
  ];

  const timelineData = results
    .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt))
    .slice(-10)
    .map((r, idx) => ({
      attempt: `A${idx + 1}`,
      score: r.score,
      time: parseInt(r.timeTaken),
    }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/instructor/quizzes')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <Breadcrumb
          items={[
            { label: 'Quizzes', href: '/instructor/quizzes' },
            { label: 'Results' },
          ]}
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{quiz.title} - Results</h1>
        <p className="text-gray-600">{results.length} student attempt{results.length !== 1 ? 's' : ''}</p>
      </div>

      {results.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600">No attempts yet. Students will appear here after they complete the quiz.</p>
        </Card>
      ) : (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <div>
                <p className="text-gray-600 text-sm mb-1">Average Score</p>
                <p className="text-3xl font-bold text-primary-600">{stats.averageScore}%</p>
              </div>
            </Card>
            <Card>
              <div>
                <p className="text-gray-600 text-sm mb-1">Pass Rate</p>
                <p className="text-3xl font-bold text-success-600">{stats.passRate}%</p>
              </div>
            </Card>
            <Card>
              <div>
                <p className="text-gray-600 text-sm mb-1">Avg Time</p>
                <p className="text-3xl font-bold text-accent-600">{stats.averageTime}m</p>
              </div>
            </Card>
          </div>

          {/* Score Range */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Score Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Attempts Timeline */}
          {timelineData.length > 0 && (
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Attempts</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#0ea5e9" name="Score (%)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          )}

          {/* Results Table */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Student Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Student ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Correct</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Completed</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium">{result.studentId}</td>
                      <td className="py-3 px-4 font-bold text-gray-900">{result.score}%</td>
                      <td className="py-3 px-4 text-gray-600">{result.correctAnswers}/{result.totalQuestions}</td>
                      <td className="py-3 px-4 text-gray-600">{result.timeTaken}</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">{new Date(result.completedAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          result.passed
                            ? 'bg-success-100 text-success-700'
                            : 'bg-danger-100 text-danger-700'
                        }`}>
                          {result.passed ? 'PASSED' : 'FAILED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
