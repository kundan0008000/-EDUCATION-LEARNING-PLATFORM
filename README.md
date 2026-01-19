# EduPlatform - Learning Management System Frontend

A modern, production-ready Learning Management System (LMS) frontend built with React, Tailwind CSS, and modern web technologies. This is the client-side application for the Online Learning Management System project.

## 🎯 Overview

EduPlatform is a comprehensive learning platform that enables:
- **Students** to browse, enroll in courses, submit assignments, and track progress
- **Instructors** to create and manage courses, upload content, and evaluate submissions
- **Administrators** to manage users, approve courses, and monitor system analytics

## ✨ Features

### 🎓 Student Features
- **Course Discovery**: Browse and search through available courses
- **Course Enrollment**: Easy enrollment with instant access
- **Learning Management**: Access course materials, videos, and PDFs
- **Assignments**: View, download, and submit assignments
- **Progress Tracking**: Monitor learning progress with visual dashboards
- **Performance Analytics**: View grades, completion rates, and certificates

### 👨‍🏫 Instructor Features
- **Course Creation**: Create and publish courses with rich content
- **Content Management**: Upload videos, PDFs, notes, and learning materials
- **Quiz & Assignments**: Create and manage quizzes and assignments
- **Student Submissions**: Review and grade student work
- **Analytics Dashboard**: Track course performance and student engagement
- **Notifications**: Send announcements and updates to students

### ⚙️ Administrator Features
- **User Management**: Add, edit, and remove users
- **Course Approval**: Review and approve new courses
- **System Analytics**: Monitor platform usage and performance
- **Role Management**: Control user permissions and access levels
- **System Settings**: Configure platform-wide settings

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks and modern features
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Hook Form** - Form validation and management
- **Recharts** - Beautiful chart visualizations
- **Lucide React** - Modern icon library
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications
- **date-fns** - Date manipulation utilities

### Development Tools
- **Node.js** - JavaScript runtime
- **npm/yarn** - Package management
- **Tailwind CSS** - Styling framework
- **PostCSS** - CSS processing

## 📋 System Requirements

### Hardware Requirements
- **Processor**: Intel i3 or equivalent
- **RAM**: Minimum 4 GB (8 GB recommended)
- **Storage**: 2 GB free space for node_modules
- **Display**: 1920x1080 minimum resolution

### Software Requirements
- **Node.js**: 14.0.0 or higher (LTS recommended)
- **npm**: 6.0.0 or higher (or yarn 1.22.0+)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Git**: For version control

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone <repository-url>
cd lms-frontend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
Create `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
REACT_APP_VERSION=1.0.0
```

### 4. Start Development Server
```bash
npm start
# or
yarn start
```

The application will open at `http://localhost:3000`

### 5. Build for Production
```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
lms-frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── Form.js             # Form components (Input, Button, etc.)
│   │   ├── UI.js               # UI components (Card, Modal, Badge, etc.)
│   │   └── Navigation.js        # Navbar, Sidebar, Footer components
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.js
│   │   │   └── RegisterPage.js
│   │   ├── student/
│   │   │   ├── Dashboard.js
│   │   │   ├── BrowseCourses.js
│   │   │   ├── CourseDetails.js
│   │   │   ├── MyCourses.js
│   │   │   ├── Assignments.js
│   │   │   └── Profile.js
│   │   ├── instructor/
│   │   │   ├── Dashboard.js
│   │   │   ├── ManagedCourses.js
│   │   │   ├── CreateCourse.js
│   │   │   ├── CourseEdit.js
│   │   │   ├── CreateQuiz.js
│   │   │   ├── ManageSubmissions.js
│   │   │   └── Profile.js
│   │   ├── admin/
│   │   │   ├── Dashboard.js
│   │   │   ├── UserManagement.js
│   │   │   ├── CourseApproval.js
│   │   │   ├── SystemAnalytics.js
│   │   │   └── Profile.js
│   │   ├── LandingPage.js
│   │   └── NotFoundPage.js
│   ├── layouts/
│   │   ├── PublicLayout.js      # Layout for public pages
│   │   ├── StudentLayout.js     # Layout for student pages
│   │   ├── InstructorLayout.js  # Layout for instructor pages
│   │   └── AdminLayout.js       # Layout for admin pages
│   ├── stores/
│   │   ├── authStore.js         # Authentication state (Zustand)
│   │   └── courseStore.js       # Course state management
│   ├── services/
│   │   └── api.js               # API client and endpoints
│   ├── App.js                   # Main app component with routing
│   ├── index.js                 # React entry point
│   └── index.css                # Global styles
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # This file
```

## 🔐 Authentication

### Demo Credentials
For testing purposes, use these credentials:

**Student Account**
- Email: `student@demo.com`
- Password: `password123`

**Instructor Account**
- Email: `teacher@demo.com`
- Password: `password123`

**Admin Account**
- Email: `admin@demo.com`
- Password: `password123`

### Authentication Flow
1. User logs in with email and password
2. Backend validates credentials and returns JWT token
3. Token is stored in localStorage
4. All subsequent API requests include the token in Authorization header
5. Protected routes redirect unauthenticated users to login

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#0ea5e9) - Main actions and highlights
- **Success**: Green (#22c55e) - Positive actions and confirmations
- **Warning**: Amber (#f59e0b) - Alerts and attention-needed states
- **Danger**: Red (#ef4444) - Destructive actions and errors
- **Accent**: Pink (#ec4899) - Secondary highlights

### Typography
- **Headings**: Bold, strong visual hierarchy
- **Body**: Clear, readable sans-serif
- **Code**: Monospace for technical content

### Components
All components are fully documented with JSDoc comments including:
- Component purpose and usage
- Props definitions
- Return types
- Example usage

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- **Desktop**: 1920px and above
- **Tablet**: 768px to 1919px
- **Mobile**: Below 768px

Mobile-first approach ensures optimal experience on all devices.

## 🔌 API Integration

### Base URL
The API base URL is configured in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### API Endpoints Used

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user
- `POST /auth/logout` - User logout

#### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course details
- `POST /courses` - Create course (instructor)
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course
- `POST /courses/:id/enroll` - Enroll in course

#### Users
- `GET /users` - Get all users (admin)
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `POST /users/:id/approve` - Approve user (admin)

#### Quizzes & Assignments
- `POST /courses/:courseId/quizzes` - Create quiz
- `POST /quizzes/:quizId/submit` - Submit quiz answers
- `POST /courses/:courseId/assignments` - Create assignment
- `POST /assignments/:assignmentId/submit` - Submit assignment

See `src/services/api.js` for complete API client implementation.

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Test Coverage
```bash
npm test -- --coverage
```

## 📦 Building for Production

### Optimization
```bash
npm run build
```

This creates an optimized production build with:
- Minified CSS and JavaScript
- Asset optimization
- Tree shaking to remove unused code
- Code splitting for faster loading

### Deployment
The build directory can be deployed to any static hosting service:
- Netlify
- Vercel
- AWS S3
- GitHub Pages
- Heroku
- Traditional web servers (nginx, Apache)

## 🐛 Debugging

### Browser DevTools
- React Developer Tools extension recommended
- Redux DevTools for state management debugging

### Console Logging
Development environment includes helpful console warnings for common issues.

### Network Inspection
Use browser Network tab to inspect API calls and responses.

## 📚 Component Documentation

### Form Components
```javascript
// Button with variants
<Button variant="primary" size="md" isLoading={false}>
  Click Me
</Button>

// Input with validation
<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  error={errors.email}
  value={email}
  onChange={handleChange}
/>
```

### UI Components
```javascript
// Card container
<Card title="My Card" subtitle="Subtitle here">
  Card content goes here
</Card>

// Badge
<Badge label="Active" variant="success" />

// Modal
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
>
  Modal content
</Modal>
```

### Layout Components
```javascript
// Navbar with user menu
<Navbar userRole="student" />

// Sidebar navigation
<Sidebar items={menuItems} collapsed={false} />

// Footer
<Footer />
```

## 🔄 State Management

### Auth Store (Zustand)
```javascript
const { user, login, logout, register } = useAuthStore();
```

### Course Store (Zustand)
```javascript
const { courses, searchCourses, setFilters } = useCourseStore();
```

## 🎯 Best Practices

### Performance
- Code splitting by route
- Lazy loading of components
- Image optimization
- Efficient re-renders with React.memo

### Accessibility
- Semantic HTML
- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast compliance

### Security
- JWT authentication
- Secure token storage
- Protected routes
- Input validation
- CSRF protection ready

### Code Quality
- Consistent formatting
- JSDoc comments on all components
- Descriptive variable and function names
- Error boundary implementation

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill the process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Failures
```bash
# Clean build
npm run build -- --reset-cache
```

## 📞 Support and Contribution

### Reporting Issues
Create an issue with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
5. Wait for review and merge

## 📄 License

This project is part of the academic submission for the Online Learning Management System course project.

## 👥 Team

**Developed by:**
- Kundan Kumar (CVB2201253 - R22ET1CSE0036)
- Sanoj Kumar (CVB2200364 - R22ET1CSE0066)

**Under the guidance of:**
- Prof. Krishti Singh Rajput, CSE Department
- Dr. C.V. Raman University, Vaishali (Bihar)

## 📅 Version History

### v1.0.0 (November 2025)
- Initial release
- Complete student module
- Complete instructor module
- Complete admin module
- Authentication system
- Landing page
- Responsive design
- Production-ready

---

**Last Updated**: November 21, 2025

For detailed documentation on specific features, please refer to the inline JSDoc comments in the source code.
