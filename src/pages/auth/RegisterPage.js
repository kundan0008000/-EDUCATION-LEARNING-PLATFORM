import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/Form';
import { Alert } from '../../components/UI';
import { User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Register Page Component
 * Handles new user registration with role selection
 * 
 * Features:
 * - Multiple role selection (Student, Instructor, Admin)
 * - Form validation with error feedback
 * - Password strength indicator
 * - Responsive design
 * - Role pre-selection from URL query parameter
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, isLoading, error } = useAuthStore();
  
  // Get role from query parameter or default to 'student'
  const roleFromUrl = searchParams.get('role') || 'student';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: roleFromUrl,
  });
  
  const [errors, setErrors] = useState({});

  /**
   * Update role when URL query parameter changes
   */
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      role: roleFromUrl,
    }));
  }, [roleFromUrl]);

  /**
   * Validate form inputs
   */
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate(`/${formData.role}/dashboard`);
      }, 500);
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
    }
  };

  /**
   * Calculate password strength
   */
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { level: 0, text: '', color: 'gray' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    const levels = [
      { level: 0, text: '', color: 'gray' },
      { level: 1, text: 'Weak', color: 'danger' },
      { level: 2, text: 'Fair', color: 'warning' },
      { level: 3, text: 'Good', color: 'primary' },
      { level: 4, text: 'Strong', color: 'success' },
      { level: 5, text: 'Very Strong', color: 'success' },
    ];
    
    return levels[Math.min(strength, 5)];
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-white shadow-2xl border-4 border-white flex items-center justify-center">
            <img src="/education-logo.svg" alt="Education Website" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">EDUCATION WEBSITE</h1>
          <p className="text-blue-100 font-medium">Create Your Learning Account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 sm:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Join Us
            </h2>
            <p className="text-gray-600 text-center text-sm mb-6">
              Create an account to get started
            </p>

            {/* Error Alert */}
            {error && (
              <Alert
                type="error"
                title="Registration Failed"
                message={error}
                className="mb-6"
              />
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter the name"
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-danger-500 mt-1">{errors.name}</p>
                )}
              </div>

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

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'student', label: 'Student', icon: '👤' },
                    { value: 'instructor', label: 'Instructor', icon: '👨‍🏫' },
                    { value: 'admin', label: 'Administrator', icon: '⚙️' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all" style={{
                      borderColor: formData.role === option.value ? '#0ea5e9' : '#d1d5db',
                      backgroundColor: formData.role === option.value ? '#f0f9ff' : 'white',
                    }}>
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={formData.role === option.value}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {option.icon} {option.label}
                      </span>
                    </label>
                  ))}
                </div>
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
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all`}
                          style={{
                            width: `${(passwordStrength.level / 5) * 100}%`,
                            backgroundColor: {
                              gray: '#d1d5db',
                              danger: '#ef4444',
                              warning: '#f59e0b',
                              primary: '#0ea5e9',
                              success: '#22c55e',
                            }[passwordStrength.color],
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {passwordStrength.text}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Use 8+ chars with uppercase, lowercase, and numbers
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="text-sm text-danger-500 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-danger-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-gray-700">
                  I agree to the{' '}
                  <button onClick={(e) => e.preventDefault()} className="text-primary-600 hover:text-primary-700 bg-transparent border-0 cursor-pointer">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button onClick={(e) => e.preventDefault()} className="text-primary-600 hover:text-primary-700 bg-transparent border-0 cursor-pointer">
                    Privacy Policy
                  </button>
                </span>
              </label>

              {/* Register Button */}
              <Button
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="w-full mt-6"
              >
                Create Account
              </Button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-600 font-semibold hover:text-primary-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
