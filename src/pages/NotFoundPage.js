import { Link } from 'react-router-dom';
import { Button } from '../components/Form';
import { Navbar, Footer } from '../components/Navigation';

/**
 * 404 Not Found Page Component
 */
export default function NotFoundPage() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="text-9xl font-bold text-primary-600 mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
