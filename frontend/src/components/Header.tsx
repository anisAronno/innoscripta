import logo from '@/assets/images/logo.png';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { currentUser } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-400' : 'hover:text-gray-300 text-gray-50';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-gray-800 text-white z-50">
      <nav className="min-w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            <img src={logo} alt="Logo" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Navigation Links */}
          <ul
            className={`md:flex md:space-x-6 text-gray-50 ${
              isMenuOpen
                ? 'absolute top-full left-0 right-0 flex flex-col bg-gray-800 p-4 space-y-4'
                : 'hidden'
            } md:relative md:p-0 md:space-y-0`}
          >
            <li>
              <Link
                to="/"
                className={isActive('/')}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={isActive('/about')}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={isActive('/projects')}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={isActive('/contact')}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>

            <li>
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className={isActive('/dashboard')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={isActive('/login')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
