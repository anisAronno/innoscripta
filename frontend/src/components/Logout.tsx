import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const Logout: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
  
    const logOut = async () => {
      // Add confirmation dialog
      const confirmed = window.confirm('Are you sure you want to logout?');
      
      if (confirmed) {
        try {
          await logout();
          navigate('/login');
        } catch (err) {
          console.error(err);
          alert('Failed to logout. Please try again.');
        }
      }
    };
  
    return (
      <button
        className="flex items-center space-x-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={logOut}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h10a1 1 0 011 1v3a1 1 0 11-2 0V5H5v10h8v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm10.293 4.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 13H7a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z"
          />
        </svg>
        <span>Logout</span>
      </button>
    );
  };
  
  export default Logout;