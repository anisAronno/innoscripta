import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl md:text-4xl font-bold text-gray-700 mt-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mt-4 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default Error;
