import { Menu, Truck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useUser } from "../../../GlobalContext/UserContext";

const NavCustomer = () => {
  const { user, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    
  ];

  const authLinks = [
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-gray-800">ExcelTrack</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {commonLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="text-gray-600 hover:text-blue-600 transition"
              >
                {name}
              </Link>
            ))}
            {user &&
              authLinks.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  {name}
                </Link>
              ))}

            {user ? (
              <button
                onClick={logout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {commonLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="block text-gray-600 hover:text-blue-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
            {user &&
              authLinks.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  className="block text-gray-600 hover:text-blue-600 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {name}
                </Link>
              ))}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavCustomer;
