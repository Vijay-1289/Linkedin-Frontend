
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, User, Bell, MessageSquare } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="font-playfair text-2xl font-bold text-gray-900">
              Socialite
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              <Home className="inline-block w-5 h-5 mr-1" />
              Home
            </Link>
            <Link to="/profile" className="nav-link">
              <User className="inline-block w-5 h-5 mr-1" />
              Profile
            </Link>
            <Link to="/notifications" className="nav-link">
              <Bell className="inline-block w-5 h-5 mr-1" />
              Notifications
            </Link>
            <Link to="/messages" className="nav-link">
              <MessageSquare className="inline-block w-5 h-5 mr-1" />
              Messages
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-lg">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
            >
              <Home className="inline-block w-5 h-5 mr-2" />
              Home
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
            >
              <User className="inline-block w-5 h-5 mr-2" />
              Profile
            </Link>
            <Link
              to="/notifications"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
            >
              <Bell className="inline-block w-5 h-5 mr-2" />
              Notifications
            </Link>
            <Link
              to="/messages"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900"
            >
              <MessageSquare className="inline-block w-5 h-5 mr-2" />
              Messages
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
