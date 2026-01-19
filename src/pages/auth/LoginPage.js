import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/Form';
import { Alert } from '../../components/UI';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Login Page Component
 * Handles user authentication with email and password
 * 
 * Features:
 * - Email and password validation
 * - Error handling with user-friendly messages
 * - Loading state during authentication
 * - Responsive design
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});

  /**
   * Validate form inputs
   * @returns {boolean} True if form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      
      // Redirect based on user role
      setTimeout(() => {
        const authStore = useAuthStore.getState();
        const userRole = authStore.user?.role;
        
        if (userRole === 'student') {
          navigate('/student/dashboard');
        } else if (userRole === 'instructor') {
          navigate('/instructor/dashboard');
        } else if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }, 500);
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-white shadow-2xl border-4 border-white flex items-center justify-center">
            <img src="/education-logo.svg" alt="Education Website" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">EDUCATION WEBSITE</h1>
          <p className="text-blue-100 font-medium">Learning Management System</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 sm:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-center text-sm mb-6">
              Sign in to continue to your account
            </p>

            {/* Error Alert */}
            {error && (
              <Alert
                type="error"
                title="Login Failed"
                message={error}
                className="mb-6"
              />
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-danger-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-danger-500 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
                <button onClick={(e) => e.preventDefault()} className="cursor-pointer text-primary-600 hover:text-primary-700 bg-transparent border-0">
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="w-full mt-6"
              >
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to EduPlatform?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary-600 font-semibold hover:text-primary-700"
              >
                Create one now
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 border-t border-blue-200 px-6 sm:px-8 py-4">
            <p className="text-xs text-blue-700 font-semibold mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-blue-600">
              <p><strong>Student:</strong> student@demo.com / password123</p>
              <p><strong>Instructor:</strong> teacher@demo.com / password123</p>
              <p><strong>Admin:</strong> admin@demo.com / password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
