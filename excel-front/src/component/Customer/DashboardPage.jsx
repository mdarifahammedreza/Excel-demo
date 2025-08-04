import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useUser } from "../../GlobalContext/UserContext";
import BookingModal from "./component/dashboard/BookingModal";
import QuickActions from "./component/dashboard/QuickActions";
import RecentBookings from "./component/dashboard/RecentBookings";

const CustomerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const { user } = useUser();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchParcels = async () => {
    if (!user?.token) return; // Don't fetch if no user token
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/parcels`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.data.success) {
        setParcels(res.data.parcels);
      } else {
        toast.error("Failed to fetch parcels");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching parcels");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, [user, booked]);
  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Customer Dashboard</h1>
        <p className="text-gray-600 mb-6">Manage your parcels and track deliveries</p>

        <QuickActions onOpenModal={() => setShowModal(true)} parcels={parcels}/>

        {/* Show loader when fetching */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          </div>
        ) : (
          <RecentBookings parcels={parcels} loading={loading} />
        )}
      </div>

      <BookingModal setbooked={setBooked} isOpen={showModal} onClose={() => setShowModal(false)} />
      
      <style>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
};

export default CustomerDashboard;
