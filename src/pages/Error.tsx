
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
