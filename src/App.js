import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';
import { useCourseStore } from './stores/courseStore';
import { useQuizStore } from './stores/quizStore';
import { useEffect } from 'react';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import InstructorLayout from './layouts/InstructorLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import LandingPage from './pages/LandingPage';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import BrowseCourses from './pages/student/BrowseCourses';
import CourseDetails from './pages/student/CourseDetails';
import MyCourses from './pages/student/MyCourses';
import Assignments from './pages/student/Assignments';
import StudentProfile from './pages/student/Profile';
import StudentTakeQuiz from './pages/student/TakeQuiz';
import QuizResults from './pages/student/QuizResults';
import MarksheetUpload from './pages/student/MarksheetUpload';
import ProgressTracking from './pages/student/ProgressTracking';

// Instructor Pages
import InstructorDashboard from './pages/instructor/Dashboard';
import CreateCourse from './pages/instructor/CreateCourse';
import ManagedCourses from './pages/instructor/ManagedCourses';
import CourseEdit from './pages/instructor/CourseEdit';
import CreateQuiz from './pages/instructor/CreateQuiz';
import EditQuiz from './pages/instructor/EditQuiz';
import QuizList from './pages/instructor/QuizList';
import QuizResultsAnalytics from './pages/instructor/QuizResultsAnalytics';
import ManageSubmissions from './pages/instructor/ManageSubmissions';
import InstructorProfile from './pages/instructor/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import CourseApproval from './pages/admin/CourseApproval';
import SystemAnalytics from './pages/admin/SystemAnalytics';
import AdminProfile from './pages/admin/Profile';

// 404 Page
import NotFoundPage from './pages/NotFoundPage';

/**
 * Main Application Component
 * Manages routing, authentication state, and application layout
 * 
 * @component
 * @returns {JSX.Element} The main app component with routing
 */
function App() {
  const { user, checkAuth } = useAuthStore();
  const { fetchCourses } = useCourseStore();
  const { fetchQuizzes } = useQuizStore();

  /**
   * Check authentication status and initialize stores on app load
   */
  useEffect(() => {
    checkAuth();
    fetchCourses();
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Protected route wrapper - redirects to login if not authenticated
   */
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Student Routes */}
          <Route
            element={
              <ProtectedRoute requiredRole="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/courses" element={<BrowseCourses />} />
            <Route path="/student/courses/:id" element={<CourseDetails />} />
            <Route path="/student/my-courses" element={<MyCourses />} />
            <Route path="/student/assignments" element={<Assignments />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/quizzes/:id" element={<StudentTakeQuiz />} />
            <Route path="/student/quiz-results/:resultId" element={<QuizResults />} />
			<Route path="/student/marksheet-upload" element={<MarksheetUpload />} />
			<Route path="/student/progress-tracking" element={<ProgressTracking />} />

          </Route>

          {/* Instructor Routes */}
          <Route
            element={
              <ProtectedRoute requiredRole="instructor">
                <InstructorLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
            <Route path="/instructor/courses" element={<ManagedCourses />} />
            <Route path="/instructor/courses/create" element={<CreateCourse />} />
            <Route path="/instructor/courses/:id/edit" element={<CourseEdit />} />
            <Route path="/instructor/quizzes" element={<QuizList />} />
            <Route path="/instructor/quizzes/create" element={<CreateQuiz />} />
            <Route path="/instructor/quizzes/:id/edit" element={<EditQuiz />} />
            <Route path="/instructor/quizzes/:id/results" element={<QuizResultsAnalytics />} />
            <Route path="/instructor/submissions/:courseId" element={<ManageSubmissions />} />
            <Route path="/instructor/profile" element={<InstructorProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/courses/approval" element={<CourseApproval />} />
            <Route path="/admin/analytics" element={<SystemAnalytics />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#000',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
          success: {
            style: {
              borderLeft: '4px solid #22c55e',
            },
          },
          error: {
            style: {
              borderLeft: '4px solid #ef4444',
            },
          },
        }}
      />
    </>
  );
}

export default App;
