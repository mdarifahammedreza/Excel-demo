import { DollarSign, LogOut, PackageCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useParcel } from "../../GlobalContext/ParcelContext";
import { useUser } from "../../GlobalContext/UserContext";
import AgentList from "./components/AgentList";
import MetricCard from "./components/MetricCard";
import AdminParcelDashboard from "./components/Parcels";
import AdminUserManagement from "./components/UserListAdminDashboard";
import ExportReportsButton from "./components/reportButton";


const AdminDashboard = () => {
  const [tab, setTab] = useState("parcels");
  const { parcels } = useParcel();  // get parcels and fetch function from context
  const [metrics, setMetrics] = useState({});
  const { user, logout } = useUser();

  // Calculate dashboard metrics based on parcels
  const getDashboardMetrics = (parcels) => {
    const today = new Date().toISOString().slice(0, 10);
    const dailyBookings = parcels.filter(p => p.timestamps?.bookedAt?.startsWith(today)).length;
    const failedDeliveries = parcels.filter(p => p.status === "Failed" || p.status === "Cancelled").length;
    const codAmount = parcels.filter(p => p.paymentType === "COD").reduce((sum, p) => sum + (p.amount || 0), 0);

    return { dailyBookings, failedDeliveries, codAmount };
  };

  useEffect(() => {
    if (parcels.length > 0) {
      setMetrics(getDashboardMetrics(parcels));
    }
  }, [parcels]);

  const renderTabContent = () => {
    switch (tab) {
      case "parcels":
        return <AdminParcelDashboard />;
      case "agents":
        return <AgentList/>;
      case "users":
        return <AdminUserManagement />;
      case "reports":
        return <div className="p-6">Reports Tab Content</div>;
      default:
        return null;
    }
  };

  if (!parcels) return <div className="p-8 text-gray-600">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-gray-800">ExcelTrack</span>
          </div>
            
            <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Admin</span>
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
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 mb-2">Manage parcels, agents, and monitor system performance</p>
          <ExportReportsButton/>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard title="Daily Bookings" value={metrics?.dailyBookings} change="+2" color="green" Icon={PackageCheck} />
          <MetricCard title="Failed Deliveries" value={metrics?.failedDeliveries} change="-2%" color="red" Icon={Truck} />
          <MetricCard title="COD Amount" value={metrics?.codAmount} change="+10%" color="yellow" Icon={DollarSign} />
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {["parcels", "agents", "users"].map((id) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`py-4 px-2 border-b-2 ${tab === id
                    ? "border-blue-700 text-blue-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"} font-medium`}
                >
                  {id[0].toUpperCase() + id.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
