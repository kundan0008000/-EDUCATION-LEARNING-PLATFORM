import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { LogOut, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

/**
 * Navigation Bar Component
 * Main navigation with user menu and responsive design
 */
export const Navbar = ({ userRole }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = {
    student: [
      { label: 'Dashboard', href: '/student/dashboard' },
      { label: 'Courses', href: '/student/courses' },
      { label: 'My Courses', href: '/student/my-courses' },
      { label: 'Assignments', href: '/student/assignments' },
	  { label: 'Old Marksheet Upload', href: '/student/marksheet-upload' },
	  { label: 'Progress & Motivation', href: '/student/progress-tracking' }
    ],
    instructor: [
      { label: 'Dashboard', href: '/instructor/dashboard' },
      { label: 'Courses', href: '/instructor/courses' },
      { label: 'Create Course', href: '/instructor/courses/create' },
      { label: 'Quizzes', href: '/instructor/quizzes' },
    ],
    admin: [
      { label: 'Dashboard', href: '/admin/dashboard' },
      { label: 'Users', href: '/admin/users' },
      { label: 'Course Approval', href: '/admin/courses/approval' },
      { label: 'Analytics', href: '/admin/analytics' },
    ],
  };

  const currentLinks = navLinks[userRole] || [];

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg border-4 border-white flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
              <img src="/education-logo.svg" alt="Education Website" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                EDUCATION
              </span>
              <br/>
              <span className="text-xs font-bold text-gray-500 tracking-wider">LEARNING PLATFORM</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {currentLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-blue-50 px-5 py-2.5 rounded-full border border-gray-200 shadow-sm">
                <span className="font-bold text-gray-800">{user?.name}</span>
                <span className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-full capitalize font-bold">
                  {user?.role}
                </span>
              </div>
            )}
            {user && (
              <button
                onClick={() => navigate(`/${userRole}/profile`)}
                className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                title="Profile"
              >
                <User size={20} />
              </button>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            {currentLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => navigate(`/${userRole}/profile`)}
              className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <User size={18} />
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm font-medium text-danger-600 hover:bg-danger-50 transition-colors flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

/**
 * Sidebar Component
 * Collapsible sidebar for dashboard navigation
 */
export const Sidebar = ({ items = [], collapsed = false, onCollapse }) => {
  return (
    <aside className={`bg-gray-900 text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <h2 className="font-bold text-lg">Menu</h2>}
        <button
          onClick={onCollapse}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="mt-8">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-800 transition-colors"
            title={collapsed ? item.label : ''}
          >
            {item.icon && <span>{item.icon}</span>}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

/**
 * Footer Component
 * Application footer
 */
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">EduPlatform</h3>
            <p className="text-gray-400 text-sm">
              Modern Learning Management System for educational institutions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Features</button></li>
              <li><button className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Pricing</button></li>
              <li><button className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Security</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer">About</button></li>
              <li><button className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Blog</button></li>
              <li><button className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Careers</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Privacy</button></li>
              <li><button className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Terms</button></li>
              <li><button className="hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Contact</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; 2025 EduPlatform. All rights reserved. | Developed by Kundan Kumar & Sanoj Kumar
          </p>
        </div>
      </div>
    </footer>
  );
};
