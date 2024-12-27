import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-300">Terms</a>
                        <a href="#" className="hover:text-gray-300">Privacy</a>
                        <Link to={'/contact'} className="hover:text-gray-300">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;