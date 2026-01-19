import { create } from 'zustand';

/**
 * Quiz Store
 * Manages quiz creation, editing, fetching, and submission
 * Persists to localStorage for offline access
 */
export const useQuizStore = create((set, get) => ({
  // State
  quizzes: [],
  currentQuiz: null,
  currentAttempt: null,
  quizResults: [],

  /**
   * Fetch all quizzes from localStorage
   */
  fetchQuizzes: () => {
    try {
      const stored = localStorage.getItem('quizzes');
      const quizzes = stored ? JSON.parse(stored) : [];
      set({ quizzes });
      return quizzes;
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      set({ quizzes: [] });
      return [];
    }
  },

  /**
   * Fetch quiz by ID
   */
  fetchQuizById: (id) => {
    const { quizzes } = get();
    const quiz = quizzes.find(q => q.id === id);
    set({ currentQuiz: quiz });
    return quiz;
  },

  /**
   * Create new quiz
   * @param {Object} quizData - Quiz data including title, description, questions, settings
   * @returns {Object} Created quiz
   */
  createQuiz: (quizData) => {
    const { quizzes } = get();
    const newQuiz = {
      id: Date.now().toString(),
      ...quizData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      questions: quizData.questions || [],
      settings: {
        timeLimit: quizData.settings?.timeLimit || null, // in minutes, null = unlimited
        shuffleQuestions: quizData.settings?.shuffleQuestions || false,
        shuffleOptions: quizData.settings?.shuffleOptions || false,
        showCorrectAnswers: quizData.settings?.showCorrectAnswers || true,
        passingScore: quizData.settings?.passingScore || 60,
        allowReview: quizData.settings?.allowReview || true,
        allowMultipleAttempts: quizData.settings?.allowMultipleAttempts || true,
        maxAttempts: quizData.settings?.maxAttempts || null, // null = unlimited
      },
      stats: {
        totalAttempts: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
      },
    };

    const updated = [...quizzes, newQuiz];
    localStorage.setItem('quizzes', JSON.stringify(updated));
    set({ quizzes: updated });
    return newQuiz;
  },

  /**
   * Update existing quiz
   * @param {string} id - Quiz ID
   * @param {Object} quizData - Updated quiz data
   * @returns {Object} Updated quiz
   */
  updateQuiz: (id, quizData) => {
    const { quizzes } = get();
    const updated = quizzes.map(q =>
      q.id === id
        ? {
            ...q,
            ...quizData,
            updatedAt: new Date().toISOString(),
          }
        : q
    );
    localStorage.setItem('quizzes', JSON.stringify(updated));
    set({ quizzes: updated });
    return updated.find(q => q.id === id);
  },

  /**
   * Delete quiz
   * @param {string} id - Quiz ID
   */
  deleteQuiz: (id) => {
    const { quizzes } = get();
    const updated = quizzes.filter(q => q.id !== id);
    localStorage.setItem('quizzes', JSON.stringify(updated));
    set({ quizzes: updated });
  },

  /**
   * Add question to quiz
   * @param {string} quizId - Quiz ID
   * @param {Object} question - Question object
   */
  addQuestion: (quizId, question) => {
    const { quizzes } = get();
    const updated = quizzes.map(q => {
      if (q.id === quizId) {
        return {
          ...q,
          questions: [
            ...q.questions,
            {
              id: Date.now().toString(),
              ...question,
            },
          ],
        };
      }
      return q;
    });
    localStorage.setItem('quizzes', JSON.stringify(updated));
    set({ quizzes: updated });
  },

  /**
   * Update question in quiz
   * @param {string} quizId - Quiz ID
   * @param {string} questionId - Question ID
   * @param {Object} questionData - Updated question data
   */
  updateQuestion: (quizId, questionId, questionData) => {
    const { quizzes } = get();
    const updated = quizzes.map(q => {
      if (q.id === quizId) {
        return {
          ...q,
          questions: q.questions.map(ques =>
            ques.id === questionId ? { ...ques, ...questionData } : ques
          ),
        };
      }
      return q;
    });
    localStorage.setItem('quizzes', JSON.stringify(updated));
    set({ quizzes: updated });
  },

  /**
   * Delete question from quiz
   * @param {string} quizId - Quiz ID
   * @param {string} questionId - Question ID
   */
  deleteQuestion: (quizId, questionId) => {
    const { quizzes } = get();
    const updated = quizzes.map(q => {
      if (q.id === quizId) {
        return {
          ...q,
          questions: q.questions.filter(ques => ques.id !== questionId),
        };
      }
      return q;
    });
    localStorage.setItem('quizzes', JSON.stringify(updated));
    set({ quizzes: updated });
  },

  /**
   * Start quiz attempt for student
   * @param {string} quizId - Quiz ID
   * @param {string} studentId - Student ID
   * @returns {Object} Current attempt object
   */
  startAttempt: (quizId, studentId) => {
    const { quizzes } = get();
    const quiz = quizzes.find(q => q.id === quizId);

    if (!quiz) return null;

    const attempt = {
      id: Date.now().toString(),
      quizId,
      studentId,
      startedAt: new Date().toISOString(),
      answers: {}, // { questionId: selectedOptionIndex }
      score: null,
      totalQuestions: quiz.questions.length,
      completedAt: null,
    };

    set({ currentAttempt: attempt });
    return attempt;
  },

  /**
   * Update answer during quiz attempt
   * @param {string} questionId - Question ID
   * @param {number|array} answer - Selected option index or array for multiple select
   */
  recordAnswer: (questionId, answer) => {
    const { currentAttempt } = get();
    if (!currentAttempt) return;

    set({
      currentAttempt: {
        ...currentAttempt,
        answers: {
          ...currentAttempt.answers,
          [questionId]: answer,
        },
      },
    });
  },

  /**
   * Submit quiz attempt and calculate score
   * @returns {Object} Quiz result with score and performance details
   */
  submitQuiz: () => {
    const { currentAttempt, quizzes, quizResults } = get();
    if (!currentAttempt) return null;

    const quiz = quizzes.find(q => q.id === currentAttempt.quizId);
    if (!quiz) return null;

    // Calculate score
    let correctAnswers = 0;
    const detailedResults = [];

    quiz.questions.forEach(question => {
      const studentAnswer = currentAttempt.answers[question.id];
      let isCorrect = false;

      if (question.type === 'multiple-choice') {
        isCorrect = studentAnswer === question.correctAnswer;
        if (isCorrect) correctAnswers++;
      } else if (question.type === 'true-false') {
        isCorrect = studentAnswer === question.correctAnswer;
        if (isCorrect) correctAnswers++;
      } else if (question.type === 'multiple-select') {
        isCorrect = Array.isArray(studentAnswer) &&
          studentAnswer.length === question.correctAnswers.length &&
          studentAnswer.every(ans => question.correctAnswers.includes(ans));
        if (isCorrect) correctAnswers++;
      }

      detailedResults.push({
        questionId: question.id,
        questionText: question.question,
        studentAnswer,
        correctAnswer: question.correctAnswer || question.correctAnswers,
        isCorrect,
        explanation: question.explanation || '',
        points: isCorrect ? question.points || 1 : 0,
      });
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const totalPoints = detailedResults.reduce((sum, r) => sum + r.points, 0);

    const result = {
      id: Date.now().toString(),
      attemptId: currentAttempt.id,
      quizId: currentAttempt.quizId,
      studentId: currentAttempt.studentId,
      score,
      totalPoints,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      detailedResults,
      startedAt: currentAttempt.startedAt,
      completedAt: new Date().toISOString(),
      timeTaken: calculateTimeTaken(currentAttempt.startedAt),
      passed: score >= quiz.settings.passingScore,
    };

    // Update quiz statistics
    const updatedQuizzes = quizzes.map(q => {
      if (q.id === currentAttempt.quizId) {
        const allScores = [...(q.stats.allScores || []), score];
        return {
          ...q,
          stats: {
            totalAttempts: q.stats.totalAttempts + 1,
            averageScore: Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length),
            highestScore: Math.max(...allScores),
            lowestScore: Math.min(...allScores),
            allScores,
          },
        };
      }
      return q;
    });

    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    localStorage.setItem('quizResults', JSON.stringify([...quizResults, result]));

    set({
      quizzes: updatedQuizzes,
      quizResults: [...quizResults, result],
      currentAttempt: null,
    });

    return result;
  },

  /**
   * Fetch quiz results for student
   * @param {string} studentId - Student ID
   * @returns {Array} Array of quiz results
   */
  fetchStudentResults: (studentId) => {
    try {
      const stored = localStorage.getItem('quizResults');
      const results = stored ? JSON.parse(stored) : [];
      return results.filter(r => r.studentId === studentId);
    } catch (error) {
      console.error('Error fetching student results:', error);
      return [];
    }
  },

  /**
   * Fetch quiz results for quiz
   * @param {string} quizId - Quiz ID
   * @returns {Array} Array of quiz results
   */
  fetchQuizResults: (quizId) => {
    try {
      const stored = localStorage.getItem('quizResults');
      const results = stored ? JSON.parse(stored) : [];
      return results.filter(r => r.quizId === quizId);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      return [];
    }
  },

  /**
   * Set current quiz
   * @param {Object} quiz - Quiz object
   */
  setCurrentQuiz: (quiz) => {
    set({ currentQuiz: quiz });
  },

  /**
   * Clear current attempt
   */
  clearAttempt: () => {
    set({ currentAttempt: null });
  },
}));

/**
 * Calculate time taken for quiz attempt
 * @param {string} startedAt - ISO timestamp
 * @returns {string} Formatted time duration
 */
function calculateTimeTaken(startedAt) {
  const start = new Date(startedAt);
  const end = new Date();
  const diff = Math.floor((end - start) / 1000); // seconds

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}
