# Quick Start Guide

## 🚀 5 Minute Setup

### Step 1: Prerequisites Check
```bash
# Verify Node.js is installed
node --version  # Should be v14 or higher
npm --version   # Should be v6 or higher
```

### Step 2: Install Dependencies
```bash
# Install all required packages
npm install
```

### Step 3: Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings (optional for development)
```

### Step 4: Start Development Server
```bash
# Start the application
npm start
```

The app opens automatically at `http://localhost:3000`

---

## 🧪 Testing the Application

### Demo Accounts
Use these credentials to test different roles:

**Student Account**
- Email: `student@demo.com`
- Password: `password123`

**Instructor Account**
- Email: `teacher@demo.com`
- Password: `password123`

**Admin Account**
- Email: `admin@demo.com`
- Password: `password123`

### Test Flows
1. **Student Flow**: Login → Browse Courses → Enroll → Submit Assignment → Check Progress
2. **Instructor Flow**: Login → Create Course → Upload Content → Grade Submissions
3. **Admin Flow**: Login → Manage Users → Approve Courses → View Analytics

---

## 📁 Key Files Explained

### Configuration Files
- `package.json` - Project dependencies and scripts
- `.env.example` - Environment variables template
- `tailwind.config.js` - Tailwind CSS customization
- `postcss.config.js` - PostCSS configuration

### Source Code
- `src/App.js` - Main app with routing configuration
- `src/index.js` - React entry point
- `src/index.css` - Global styles

### Core Directories
- `src/components/` - Reusable UI components
- `src/pages/` - Page components for each route
- `src/stores/` - State management with Zustand
- `src/services/` - API client and utilities
- `src/utils/` - Helper functions and constants

---

## 🔧 Common Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Eject configuration (not recommended)
npm run eject
```

---

## 🎨 Customization

### Change Colors
Edit `src/index.css` or `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#YOUR_COLOR', // Change primary color
  }
}
```

### Add New Routes
Edit `src/App.js` and add route:
```javascript
<Route path="/new-page" element={<NewPage />} />
```

### Modify API Endpoint
Edit `.env`:
```
REACT_APP_API_URL=http://your-api-url.com/api
```

---

## 🐛 Troubleshooting

### App won't start
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm start
```

### Port 3000 in use
```bash
# Windows: Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :3000
kill -9 <PID>
```

### Build fails
```bash
# Clean and rebuild
npm cache clean --force
npm run build
```

---

## 📚 Next Steps

1. **Explore Components** - Browse `src/components/` to understand available components
2. **Add Features** - Create new pages in `src/pages/`
3. **Customize Styling** - Modify Tailwind config for your brand
4. **Connect Backend** - Update API endpoints in `src/services/api.js`
5. **Deploy** - Build with `npm run build` and deploy to your hosting

---

## 📖 Documentation

- **Main README**: [README.md](README.md)
- **Component Docs**: JSDoc comments in component files
- **API Docs**: [src/services/api.js](src/services/api.js)
- **Project Info**: [PROJECT_INFO.json](PROJECT_INFO.json)

---

## 💡 Tips & Tricks

### Debug API Calls
Open browser DevTools → Network tab to inspect API requests

### Check Application State
Install React Developer Tools browser extension to inspect component state

### Performance Optimization
- Use React.memo() for expensive components
- Implement code splitting with React.lazy()
- Monitor bundle size with npm analyze

### Code Quality
- All components include JSDoc comments
- Follow consistent naming conventions
- Keep components small and focused

---

## 🎯 Development Checklist

- [ ] Node.js v14+ installed
- [ ] Project cloned and `npm install` completed
- [ ] `.env` file configured
- [ ] `npm start` runs without errors
- [ ] Can login with demo credentials
- [ ] Navigation works for all roles
- [ ] Responsive design works on mobile

---

**Happy Coding!** 🎉

For detailed information, check the [README.md](README.md) file.
