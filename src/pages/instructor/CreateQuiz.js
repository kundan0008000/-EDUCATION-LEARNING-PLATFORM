import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Breadcrumb } from '../../components/UI';
import { Button } from '../../components/Form';
import { useQuizStore } from '../../stores/quizStore';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Create Quiz Page Component
 * Form for teachers to create new quizzes with multiple question types
 */
export default function CreateQuiz() {
  const navigate = useNavigate();
  const { createQuiz } = useQuizStore();
  const [isLoading, setIsLoading] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Quiz form state
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    courseId: '', // Will be linked to a course later
    questions: [],
    settings: {
      timeLimit: null,
      shuffleQuestions: false,
      shuffleOptions: false,
      showCorrectAnswers: true,
      passingScore: 60,
      allowReview: true,
      allowMultipleAttempts: true,
      maxAttempts: null,
    },
  });

  const [errors, setErrors] = useState({});

  /**
   * Question template for different types
   */
  const questionTemplates = {
    'multiple-choice': {
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1,
      explanation: '',
    },
    'true-false': {
      type: 'true-false',
      question: '',
      correctAnswer: true,
      points: 1,
      explanation: '',
    },
    'multiple-select': {
      type: 'multiple-select',
      question: '',
      options: ['', '', '', ''],
      correctAnswers: [],
      points: 1,
      explanation: '',
    },
    'short-answer': {
      type: 'short-answer',
      question: '',
      correctAnswers: [''],
      points: 1,
      explanation: '',
    },
  };

  /**
   * Validate quiz form
   */
  const validateForm = () => {
    const newErrors = {};

    if (!quizData.title.trim()) {
      newErrors.title = 'Quiz title is required';
    }

    if (!quizData.description.trim()) {
      newErrors.description = 'Quiz description is required';
    }

    if (quizData.questions.length === 0) {
      newErrors.questions = 'Add at least one question';
    } else {
      quizData.questions.forEach((q, idx) => {
        if (!q.question.trim()) {
          newErrors[`question_${idx}`] = 'Question text is required';
        }

        if (q.type === 'multiple-choice' || q.type === 'multiple-select') {
          const validOptions = q.options.filter(opt => opt.trim());
          if (validOptions.length < 2) {
            newErrors[`options_${idx}`] = 'At least 2 options required';
          }

          if (q.type === 'multiple-choice' && q.correctAnswer === undefined) {
            newErrors[`answer_${idx}`] = 'Select correct answer';
          }

          if (q.type === 'multiple-select' && q.correctAnswers.length === 0) {
            newErrors[`answer_${idx}`] = 'Select at least one correct answer';
          }
        }

        if (q.type === 'short-answer' && q.correctAnswers.some(a => !a.trim())) {
          newErrors[`answer_${idx}`] = 'All correct answers must be filled';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Add new question
   */
  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now().toString(),
      ...questionTemplates[type],
    };

    setQuizData({
      ...quizData,
      questions: [...quizData.questions, newQuestion],
    });

    setExpandedQuestion(quizData.questions.length);
  };

  /**
   * Update question
   */
  const updateQuestion = (index, field, value) => {
    const updated = [...quizData.questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuizData({ ...quizData, questions: updated });
  };

  /**
   * Update question option
   */
  const updateOption = (questionIdx, optionIdx, value) => {
    const updated = [...quizData.questions];
    updated[questionIdx].options[optionIdx] = value;
    setQuizData({ ...quizData, questions: updated });
  };

  /**
   * Delete question
   */
  const deleteQuestion = (index) => {
    const updated = quizData.questions.filter((_, i) => i !== index);
    setQuizData({ ...quizData, questions: updated });
  };

  /**
   * Handle form submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    try {
      // Create quiz with questions
      const newQuiz = createQuiz({
        title: quizData.title,
        description: quizData.description,
        courseId: quizData.courseId,
        questions: quizData.questions.map(q => ({
          ...q,
          // Filter out empty options
          options: q.options?.filter(opt => opt.trim()) || undefined,
        })),
        settings: quizData.settings,
      });

      toast.success('Quiz created successfully!');
      navigate(`/instructor/quizzes/${newQuiz.id}`);
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast.error('Failed to create quiz');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Quizzes', href: '/instructor/quizzes' }, { label: 'Create Quiz' }]} />

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Quiz</h1>
        <p className="text-gray-600">Design an interactive quiz with multiple question types</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quiz Details</h2>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title *</label>
              <input
                type="text"
                value={quizData.title}
                onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                placeholder="Enter quiz title"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.title && <p className="text-sm text-danger-500 mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={quizData.description}
                onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                placeholder="Describe the quiz objectives and content"
                rows="3"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {errors.description && <p className="text-sm text-danger-500 mt-1">{errors.description}</p>}
            </div>
          </div>
        </Card>

        {/* Quiz Settings */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quiz Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Time Limit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
              <input
                type="number"
                min="1"
                value={quizData.settings.timeLimit || ''}
                onChange={(e) =>
                  setQuizData({
                    ...quizData,
                    settings: { ...quizData.settings, timeLimit: e.target.value ? parseInt(e.target.value) : null },
                  })
                }
                placeholder="Leave empty for unlimited"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Passing Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={quizData.settings.passingScore}
                onChange={(e) =>
                  setQuizData({
                    ...quizData,
                    settings: { ...quizData.settings, passingScore: parseInt(e.target.value) },
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Max Attempts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Attempts</label>
              <input
                type="number"
                min="1"
                value={quizData.settings.maxAttempts || ''}
                onChange={(e) =>
                  setQuizData({
                    ...quizData,
                    settings: { ...quizData.settings, maxAttempts: e.target.value ? parseInt(e.target.value) : null },
                  })
                }
                placeholder="Leave empty for unlimited"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={quizData.settings.shuffleQuestions}
                  onChange={(e) =>
                    setQuizData({
                      ...quizData,
                      settings: { ...quizData.settings, shuffleQuestions: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-primary-600 rounded border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Shuffle Questions</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={quizData.settings.shuffleOptions}
                  onChange={(e) =>
                    setQuizData({
                      ...quizData,
                      settings: { ...quizData.settings, shuffleOptions: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-primary-600 rounded border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Shuffle Options</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={quizData.settings.showCorrectAnswers}
                  onChange={(e) =>
                    setQuizData({
                      ...quizData,
                      settings: { ...quizData.settings, showCorrectAnswers: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-primary-600 rounded border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Show Correct Answers</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={quizData.settings.allowMultipleAttempts}
                  onChange={(e) =>
                    setQuizData({
                      ...quizData,
                      settings: { ...quizData.settings, allowMultipleAttempts: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-primary-600 rounded border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Allow Multiple Attempts</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={quizData.settings.allowReview}
                  onChange={(e) =>
                    setQuizData({
                      ...quizData,
                      settings: { ...quizData.settings, allowReview: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-primary-600 rounded border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Allow Review After Submit</span>
              </label>
            </div>
          </div>
        </Card>

        {/* Questions Section */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Questions</h2>
            <span className="text-sm text-gray-600">{quizData.questions.length} question{quizData.questions.length !== 1 ? 's' : ''}</span>
          </div>

          {errors.questions && <p className="text-sm text-danger-500 mb-4">{errors.questions}</p>}

          {quizData.questions.length === 0 ? (
            <p className="text-gray-600 mb-4">No questions added yet. Add your first question below.</p>
          ) : (
            <div className="space-y-2 mb-4">
              {quizData.questions.map((question, idx) => (
                <div key={question.id} className="border border-gray-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                    className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Question {idx + 1}: {question.type}</p>
                      <p className="text-sm text-gray-600 truncate">{question.question || 'Empty question'}</p>
                    </div>
                    {expandedQuestion === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  {expandedQuestion === idx && (
                    <div className="border-t border-gray-200 px-4 py-4 bg-gray-50 space-y-4">
                      {/* Question Text */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question Text *</label>
                        <textarea
                          value={question.question}
                          onChange={(e) => updateQuestion(idx, 'question', e.target.value)}
                          placeholder="Enter question text"
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        {errors[`question_${idx}`] && (
                          <p className="text-sm text-danger-500 mt-1">{errors[`question_${idx}`]}</p>
                        )}
                      </div>

                      {/* Points */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                        <input
                          type="number"
                          min="1"
                          value={question.points}
                          onChange={(e) => updateQuestion(idx, 'points', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      {/* Options for Multiple Choice and Multiple Select */}
                      {(question.type === 'multiple-choice' || question.type === 'multiple-select') && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                            <div className="space-y-2">
                              {question.options.map((option, optIdx) => (
                                <div key={optIdx} className="flex gap-2">
                                  {question.type === 'multiple-choice' ? (
                                    <input
                                      type="radio"
                                      name={`correct_${idx}`}
                                      checked={question.correctAnswer === optIdx}
                                      onChange={() => updateQuestion(idx, 'correctAnswer', optIdx)}
                                      className="mt-2.5"
                                    />
                                  ) : (
                                    <input
                                      type="checkbox"
                                      checked={question.correctAnswers.includes(optIdx)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          updateQuestion(idx, 'correctAnswers', [...question.correctAnswers, optIdx]);
                                        } else {
                                          updateQuestion(
                                            idx,
                                            'correctAnswers',
                                            question.correctAnswers.filter(a => a !== optIdx)
                                          );
                                        }
                                      }}
                                      className="mt-2.5"
                                    />
                                  )}
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => updateOption(idx, optIdx, e.target.value)}
                                    placeholder={`Option ${optIdx + 1}`}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                  />
                                </div>
                              ))}
                            </div>
                            {errors[`options_${idx}`] && (
                              <p className="text-sm text-danger-500 mt-1">{errors[`options_${idx}`]}</p>
                            )}
                          </div>
                        </>
                      )}

                      {/* True/False */}
                      {question.type === 'true-false' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
                          <select
                            value={question.correctAnswer}
                            onChange={(e) => updateQuestion(idx, 'correctAnswer', e.target.value === 'true')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>
                      )}

                      {/* Short Answer */}
                      {question.type === 'short-answer' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answers (comma separated)</label>
                          <input
                            type="text"
                            value={question.correctAnswers.join(', ')}
                            onChange={(e) => updateQuestion(idx, 'correctAnswers', e.target.value.split(',').map(a => a.trim()))}
                            placeholder="Enter correct answers"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      )}

                      {/* Explanation */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
                        <textarea
                          value={question.explanation}
                          onChange={(e) => updateQuestion(idx, 'explanation', e.target.value)}
                          placeholder="Explain why this is the correct answer"
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => deleteQuestion(idx)}
                        className="w-full px-4 py-2 bg-danger-100 hover:bg-danger-200 text-danger-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete Question
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add Question Buttons */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Add Question:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => addQuestion('multiple-choice')}
                className="px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-1"
              >
                <Plus size={16} /> Multiple Choice
              </button>
              <button
                type="button"
                onClick={() => addQuestion('true-false')}
                className="px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-1"
              >
                <Plus size={16} /> True/False
              </button>
              <button
                type="button"
                onClick={() => addQuestion('multiple-select')}
                className="px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-1"
              >
                <Plus size={16} /> Multiple Select
              </button>
              <button
                type="button"
                onClick={() => addQuestion('short-answer')}
                className="px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-1"
              >
                <Plus size={16} /> Short Answer
              </button>
            </div>
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={() => navigate('/instructor/quizzes')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            isLoading={isLoading}
          >
            Create Quiz
          </Button>
        </div>
      </form>
    </div>
  );
}
