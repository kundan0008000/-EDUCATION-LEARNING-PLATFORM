import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Navigation';

/**
 * Public Layout Component
 * Layout for unauthenticated pages (login, register, landing)
 * Includes footer and basic page structure
 */
export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
