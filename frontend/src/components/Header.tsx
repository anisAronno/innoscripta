import logo from '@/assets/images/logo.png';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDown,
  LogOut,
  Menu as MenuIcon,
  Settings,
  User,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-blue-400'
      : 'hover:text-gray-300 text-gray-50';
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-gray-800 text-white z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                {/* Profile Dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-700">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      {currentUser.email?.charAt(0).toUpperCase() || (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </Menu.Button>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 rounded-md`}
                            >
                              <User className="w-4 h-4" />
                              <span>Profile</span>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/preferences"
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 rounded-md`}
                            >
                              <Settings className="w-4 h-4" />
                              <span>Preferences</span>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } flex items-center space-x-2 px-4 py-2 text-sm text-red-600 rounded-md w-full`}
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Logout</span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className={isActive('/login')}>
                  Login
                </Link>
                <Link to="/signup" className={isActive('/signup')}>
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <Transition
            show={isMenuOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="absolute top-full left-0 right-0 md:hidden bg-gray-800 border-t border-gray-700 px-4 py-2 space-y-2">
              <Link
                to="/"
                className={`block py-2 ${isActive('/')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {currentUser ? (
                <>
                  <Link
                    to="/profile"
                    className={`block py-2 ${isActive('/profile')}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/preferences"
                    className={`block py-2 ${isActive('/preferences')}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Preferences
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-red-400 hover:text-red-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className={`block py-2 ${isActive('/login')}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`block py-2 ${isActive('/signup')}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </Transition>
        </div>
      </nav>
    </header>
  );
};

export default Header;
