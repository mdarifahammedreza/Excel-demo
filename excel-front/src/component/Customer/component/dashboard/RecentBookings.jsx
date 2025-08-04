import { Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const statusColors = {
  "In Transit": "bg-green-100 text-green-800",
  "Picked Up": "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Failed: "bg-red-100 text-red-800",
};

const RecentBookings = ({ parcels = [], loading, pageSize = 10 }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(parcels.length / pageSize);

  // Get parcels for current page
  const currentParcels = parcels.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handler for page change
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
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
  }

  if (parcels.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-600">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">All Bookings</h2>
        {/* You can link this to a full list page */}
        {/* <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => goToPage(totalPages)}
        >
          View All
        </button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left">Tracking ID</th>
              <th className="py-3 px-4 text-left">From</th>
              <th className="py-3 px-4 text-left">To</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Track</th>
            </tr>
          </thead>
          <tbody>
            {currentParcels.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-mono text-sm">{p.trackingCode}</td>
                <td className="py-3 px-4">{p.pickupAddress}</td>
                <td className="py-3 px-4">{p.deliveryAddress}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      statusColors[p.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {new Date(p.timestamps?.bookedAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => navigate(`/tracking?id=${p.trackingCode}`)}
                    className="text-blue-500"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded border ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentBookings;
