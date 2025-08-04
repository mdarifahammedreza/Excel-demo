import { LogOut, Truck } from "lucide-react";
import { useUser } from "../../../GlobalContext/UserContext";

const Header = () => {
   const {user,logout} = useUser()
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Truck className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold text-gray-800">ExcelTrack</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Weolcome ,{user.name}</span>
          </div>
         
          {user ? (
              <button
                onClick={logout}
                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition hover:cursor-pointer"
              >
                <LogOut className="inline-block mr-2 w-4 h-4" /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Login
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
