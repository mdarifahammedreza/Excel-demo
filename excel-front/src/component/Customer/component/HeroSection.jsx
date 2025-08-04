import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../../GlobalContext/UserContext";

const HeroSection = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const trackParcel = () => {
    if (!trackingNumber.trim()) return; // Prevent navigation if empty

    if (user) {
      navigate(`/tracking?id=${trackingNumber}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Fast & Reliable Courier Services
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Track your parcels in real-time, book pickups instantly, and manage
          deliveries with our advanced logistics platform.
        </p>

        {/* Quick Track Box */}
        <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-xl">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">
            Track Your Parcel
          </h3>
          <div className="flex flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-t-lg sm:rounded-t-none sm:rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
            <button
              onClick={trackParcel}
              className="bg-primary-orange text-white px-6 py-3 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg hover:bg-orange-700 transition flex items-center justify-center"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
