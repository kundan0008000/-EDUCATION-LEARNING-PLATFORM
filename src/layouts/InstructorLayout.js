import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components/Navigation';

/**
 * Instructor Layout Component
 * Layout for authenticated instructor pages
 * Includes navigation bar and footer
 */
export default function InstructorLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar userRole="instructor" />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
