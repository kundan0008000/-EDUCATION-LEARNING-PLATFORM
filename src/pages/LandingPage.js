import { Link } from 'react-router-dom';
import { Button } from '../components/Form';
import { Navbar } from '../components/Navigation';
import { Zap, Users, BarChart3, Shield, Clock, Smartphone } from 'lucide-react';

/**
 * Landing Page Component
 * Main entry point showcasing LMS features and benefits
 * Includes feature highlights, testimonials, and call-to-action
 */
export default function LandingPage() {
  const features = [
    {
      icon: <Zap size={32} className="text-primary-600" />,
      title: 'Interactive Learning',
      description: 'Engage with dynamic course materials, video lectures, and interactive quizzes',
    },
    {
      icon: <Users size={32} className="text-primary-600" />,
      title: 'Collaboration',
      description: 'Connect with instructors and peers through our integrated communication tools',
    },
    {
      icon: <BarChart3 size={32} className="text-primary-600" />,
      title: 'Progress Tracking',
      description: 'Monitor your learning progress with detailed analytics and performance reports',
    },
    {
      icon: <Shield size={32} className="text-primary-600" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with encrypted data storage and user authentication',
    },
    {
      icon: <Clock size={32} className="text-primary-600" />,
      title: 'Learn Anytime',
      description: 'Access courses and materials from anywhere, on your own schedule',
    },
    {
      icon: <Smartphone size={32} className="text-primary-600" />,
      title: 'Responsive Design',
      description: 'Seamless experience across all devices - desktop, tablet, and mobile',
    },
  ];

  const stats = [
    { value: '500+', label: 'Active Courses' },
    { value: '10,000+', label: 'Students' },
    { value: '200+', label: 'Instructors' },
    { value: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-primary-700 to-blue-800 text-white py-20 sm:py-32 overflow-hidden">
        {/* Background Education Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">📚</div>
          <div className="absolute top-20 right-20 text-6xl">🎓</div>
          <div className="absolute bottom-20 left-20 text-7xl">✏️</div>
          <div className="absolute bottom-10 right-10 text-6xl">📖</div>
          <div className="absolute top-1/2 left-1/4 text-5xl">🔬</div>
          <div className="absolute top-1/3 right-1/3 text-6xl">💡</div>
          <div className="absolute bottom-1/3 right-1/4 text-5xl">🌟</div>
          <div className="absolute top-2/3 left-1/3 text-6xl">🎯</div>
        </div>
        
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-block">
              <span className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                🚀 Transform Your Learning Journey
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Empower Your Future Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">Quality Education</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              A comprehensive Learning Management System designed for educational institutions,
              students, and instructors to connect, learn, and achieve excellence together.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link to="/register">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    <span>🎯 Get Started Free</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              </Link>
              <Link to="/login">
                <button className="group relative px-8 py-4 bg-white text-primary-700 font-bold rounded-xl shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 border-2 border-white">
                  <span className="flex items-center gap-2">
                    <span>👤 Sign In</span>
                  </span>
                </button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-white">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3 rounded-full shadow-xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300">
                <span className="text-2xl">🎉</span>
                <span className="text-sm font-bold">Free Forever Plan</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 px-5 py-3 rounded-full shadow-xl hover:shadow-orange-500/50 animate-pulse transform hover:scale-105 transition-all duration-300">
                <span className="text-2xl">💳</span>
                <span className="text-sm font-bold">No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3 rounded-full shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-bold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        </div>
        
        {/* Educational Icons Background - Larger and Better Positioned */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-10 left-10 text-9xl transform rotate-12">📚</div>
          <div className="absolute top-16 right-20 text-9xl transform -rotate-12">🎓</div>
          <div className="absolute top-48 left-1/4 text-8xl transform rotate-6">💡</div>
          <div className="absolute top-56 right-1/4 text-9xl transform -rotate-6">🏆</div>
          <div className="absolute bottom-40 left-20 text-8xl transform rotate-12">🌟</div>
          <div className="absolute bottom-32 right-16 text-9xl transform -rotate-12">🎯</div>
          <div className="absolute top-1/2 left-1/3 text-7xl transform rotate-45">✨</div>
          <div className="absolute top-1/3 right-1/3 text-8xl transform -rotate-45">🚀</div>
          <div className="absolute bottom-20 left-1/2 text-8xl">📖</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 animate-bounce">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl">
                🚀 Growing Fast
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
              Join Our Growing Community 🌍
            </h2>
            <p className="text-lg text-gray-700 font-medium">Trusted by thousands worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const icons = ['📚', '👨‍🎓', '👨‍🏫', '⚡'];
              return (
                <div key={index} className="text-center transform hover:scale-110 transition-all duration-300">
                  <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                    <div className="text-5xl mb-3">{icons[index]}</div>
                    <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-orange-500 bg-clip-text text-transparent mb-2">{stat.value}</p>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
        {/* Premium Background Pattern */}
        <div className="absolute inset-0">
          {/* Geometric Shapes Background */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-10 blur-2xl"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-10 blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-gradient-to-br from-orange-400 to-pink-600 rounded-full opacity-10 blur-2xl"></div>
          <div className="absolute bottom-40 right-1/3 w-32 h-32 bg-gradient-to-br from-green-400 to-teal-600 rounded-full opacity-10 blur-2xl"></div>
          
          {/* Animated Tech Icons */}
          <div className="absolute top-20 left-20 text-7xl opacity-5 animate-pulse">💻</div>
          <div className="absolute top-32 right-32 text-6xl opacity-5 animate-pulse" style={{animationDelay: '1s'}}>🎯</div>
          <div className="absolute bottom-32 left-32 text-7xl opacity-5 animate-pulse" style={{animationDelay: '2s'}}>📊</div>
          <div className="absolute bottom-20 right-20 text-6xl opacity-5 animate-pulse" style={{animationDelay: '3s'}}>⚡</div>
          <div className="absolute top-1/2 left-1/4 text-5xl opacity-5">🔒</div>
          <div className="absolute top-1/3 right-1/4 text-6xl opacity-5">📱</div>
        </div>
        
        {/* Modern Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                             linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-xl">
                ✨ Premium Features
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
              Powerful Features for Modern Learning
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
              Everything you need to deliver exceptional online learning experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const gradients = [
                'from-blue-500 to-blue-600',
                'from-purple-500 to-purple-600',
                'from-orange-500 to-orange-600',
                'from-green-500 to-green-600',
                'from-pink-500 to-pink-600',
                'from-indigo-500 to-indigo-600',
              ];
              return (
                <div
                  key={index}
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className={`mb-6 p-4 bg-gradient-to-br ${gradients[index]} rounded-xl inline-block shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                  
                  {/* Corner Decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Background Educational Icons Pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-10 left-10 text-9xl">👨‍🎓</div>
          <div className="absolute top-20 right-16 text-8xl">👩‍🏫</div>
          <div className="absolute top-1/3 left-1/4 text-9xl">📚</div>
          <div className="absolute top-1/2 right-1/4 text-8xl">🎯</div>
          <div className="absolute bottom-40 left-1/3 text-9xl">💼</div>
          <div className="absolute bottom-20 right-1/3 text-8xl">🏫</div>
          <div className="absolute top-40 right-10 text-7xl">📊</div>
          <div className="absolute bottom-32 left-16 text-8xl">🎨</div>
          <div className="absolute top-2/3 left-12 text-7xl">🔔</div>
          <div className="absolute top-1/4 right-1/3 text-6xl">🌟</div>
        </div>

        {/* Animated Gradient Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Decorative Lines/Waves */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                <stop offset="50%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
              </linearGradient>
            </defs>
            <path d="M 0 50 Q 250 20 500 50 T 1000 50 T 1500 50 T 2000 50" stroke="url(#grad1)" strokeWidth="3" fill="none"/>
            <path d="M 0 150 Q 250 120 500 150 T 1000 150 T 1500 150 T 2000 150" stroke="url(#grad1)" strokeWidth="3" fill="none"/>
            <path d="M 0 250 Q 250 220 500 250 T 1000 250 T 1500 250 T 2000 250" stroke="url(#grad1)" strokeWidth="3" fill="none"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl animate-pulse">
                🎭 Choose Your Role
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
              Designed For Everyone
            </h2>
            <p className="text-lg text-gray-700 font-medium">
              Tailored experiences for students, instructors, and administrators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div className="relative bg-white border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl"></div>
              <div className="text-6xl mb-4 text-center">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Student</h3>
              <ul className="space-y-3 mb-6 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold text-lg">✓</span> Browse and enroll in courses
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold text-lg">✓</span> Access learning materials
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold text-lg">✓</span> Submit assignments
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold text-lg">✓</span> Track progress
                </li>
              </ul>
              <Link to="/register?role=student" className="w-full block">
                <button className="group relative w-full px-6 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-xl hover:shadow-blue-500/60 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-xl">🎓</span>
                    <span>Learn as Student</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              </Link>
            </div>

            {/* Instructor Card */}
            <div className="relative bg-white border-2 border-orange-500 rounded-2xl p-8 transform md:scale-105 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg animate-pulse">
                  ⭐ Popular
                </span>
              </div>
              <div className="text-6xl mb-4 text-center mt-4">👨‍🏫</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Instructor</h3>
              <ul className="space-y-3 mb-6 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold text-lg">✓</span> Create and manage courses
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold text-lg">✓</span> Upload learning materials
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold text-lg">✓</span> Create quizzes & assignments
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold text-lg">✓</span> Evaluate student work
                </li>
              </ul>
              <Link to="/register?role=instructor" className="w-full block">
                <button className="group relative w-full px-6 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white font-bold rounded-xl shadow-xl hover:shadow-orange-500/60 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-xl">👨‍🏫</span>
                    <span>Teach on Platform</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              </Link>
            </div>

            {/* Admin Card */}
            <div className="relative bg-white border-2 border-gray-300 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-2xl"></div>
              <div className="text-6xl mb-4 text-center">⚙️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Administrator</h3>
              <ul className="space-y-3 mb-6 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold text-lg">✓</span> Manage users
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold text-lg">✓</span> Approve courses
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold text-lg">✓</span> View analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600 font-bold text-lg">✓</span> System management
                </li>
              </ul>
              <Link to="/register?role=admin" className="w-full block">
                <button className="group relative w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-bold rounded-xl shadow-xl hover:shadow-purple-500/60 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-xl">⚙️</span>
                    <span>Admin Access</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-primary-700 to-blue-800 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🚀</div>
          <div className="absolute top-10 right-10 text-8xl">💡</div>
          <div className="absolute bottom-10 left-20 text-7xl">🎯</div>
          <div className="absolute bottom-10 right-20 text-8xl">✨</div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="text-6xl">🎓</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Ready to Transform Education?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of educational institutions using EduPlatform to deliver world-class learning experiences
          </p>
          <Link to="/register">
            <button className="px-10 py-4 bg-white text-primary-700 font-bold text-lg rounded-xl shadow-2xl hover:shadow-white/50 transform hover:scale-110 transition-all duration-300 border-2 border-white">
              🚀 Start Free Trial
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
