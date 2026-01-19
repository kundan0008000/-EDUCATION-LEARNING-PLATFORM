import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Form';
import { useQuizStore } from '../../stores/quizStore';
import { useAuthStore } from '../../stores/authStore';
import { ChevronRight, ChevronLeft, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Student Quiz Taking Page Component
 * Interactive quiz interface with timer, progress tracking, and answer recording
 */
export default function StudentTakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useQuizStore();
  const { user } = useAuthStore();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [answers, setAnswers] = useState({});

  // Find and set quiz
  useEffect(() => {
    const { startAttempt: startQuizAttempt } = useQuizStore.getState();
    const foundQuiz = quizzes.find(q => q.id === id);
    if (foundQuiz) {
      setQuiz(foundQuiz);
      startQuizAttempt(id, user?.id || 'guest');
      setTimeLeft(foundQuiz.settings.timeLimit ? foundQuiz.settings.timeLimit * 60 : null);
    } else {
      toast.error('Quiz not found');
      navigate('/student/courses');
    }
  }, [id, quizzes, navigate, user?.id]);

  // Timer effect
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          setShowConfirmSubmit(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
    const { recordAnswer: recordQuizAnswer } = useQuizStore.getState();
    recordQuizAnswer(questionId, answer);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);

    try {
      const { submitQuiz: submitStudentQuiz } = useQuizStore.getState();
      const result = submitStudentQuiz();
      if (result) {
        toast.success('Quiz submitted successfully!');
        navigate(`/student/quiz-results/${result.id}`);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to submit quiz');
    } finally {
      setIsSubmitting(false);
      setShowConfirmSubmit(false);
    }
  };

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading quiz...</p>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progressPercent = Math.round(((currentQuestion + 1) / quiz.questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-sm text-gray-600 mt-1">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
            </div>

            {timeLeft !== null && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold ${
                timeLeft <= 60 ? 'bg-danger-100 text-danger-700' : 'bg-primary-100 text-primary-700'
              }`}>
                <Clock size={20} />
                {formatTime(timeLeft)}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600">Progress</span>
              <span className="text-xs font-medium text-gray-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{question.question}</h2>
              <p className="text-sm text-gray-600">
                {question.points} point{question.points !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.type === 'multiple-choice' && (
                <>
                  {question.options.map((option, idx) => (
                    <label key={idx} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all"
                      style={{
                        borderColor: answers[question.id] === idx ? '#0ea5e9' : undefined,
                        backgroundColor: answers[question.id] === idx ? '#f0f9ff' : undefined,
                      }}>
                      <input
                        type="radio"
                        name={`question_${question.id}`}
                        checked={answers[question.id] === idx}
                        onChange={() => handleAnswerChange(question.id, idx)}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="ml-4 text-gray-900 font-medium">{option}</span>
                    </label>
                  ))}
                </>
              )}

              {question.type === 'true-false' && (
                <div className="grid grid-cols-2 gap-4">
                  {[true, false].map((value) => (
                    <label key={String(value)} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all"
                      style={{
                        borderColor: answers[question.id] === value ? '#0ea5e9' : undefined,
                        backgroundColor: answers[question.id] === value ? '#f0f9ff' : undefined,
                      }}>
                      <input
                        type="radio"
                        name={`question_${question.id}`}
                        checked={answers[question.id] === value}
                        onChange={() => handleAnswerChange(question.id, value)}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="ml-4 text-gray-900 font-medium">{value ? 'True' : 'False'}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'multiple-select' && (
                <>
                  {question.options.map((option, idx) => (
                    <label key={idx} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all"
                      style={{
                        borderColor: answers[question.id]?.includes(idx) ? '#0ea5e9' : undefined,
                        backgroundColor: answers[question.id]?.includes(idx) ? '#f0f9ff' : undefined,
                      }}>
                      <input
                        type="checkbox"
                        checked={Array.isArray(answers[question.id]) && answers[question.id].includes(idx)}
                        onChange={(e) => {
                          const current = Array.isArray(answers[question.id]) ? answers[question.id] : [];
                          const updated = e.target.checked
                            ? [...current, idx]
                            : current.filter(i => i !== idx);
                          handleAnswerChange(question.id, updated);
                        }}
                        className="w-4 h-4 text-primary-600 rounded"
                      />
                      <span className="ml-4 text-gray-900 font-medium">{option}</span>
                    </label>
                  ))}
                </>
              )}

              {question.type === 'short-answer' && (
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-gray-900"
                />
              )}
            </div>

            {/* Question Navigator */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {quiz.questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestion(idx)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      idx === currentQuestion
                        ? 'bg-primary-600 text-white'
                        : answers[quiz.questions[idx].id] !== undefined
                        ? 'bg-success-100 text-success-700 border-2 border-success-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">
                <span className="inline-block w-3 h-3 bg-success-100 border border-success-300 rounded mr-2"></span>
                Answered questions are highlighted
              </p>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-between items-center gap-4">
            <Button
              variant="secondary"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              Previous
            </Button>

            {currentQuestion === quiz.questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={() => setShowConfirmSubmit(true)}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNextQuestion}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight size={18} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && quiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Submit Quiz?</h3>
            <p className="text-gray-600 mb-4">
              You have answered {Object.keys(answers).length} of {quiz.questions.length} questions.
              Are you sure you want to submit?
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1"
              >
                Continue
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitQuiz}
                isLoading={isSubmitting}
                className="flex-1"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
