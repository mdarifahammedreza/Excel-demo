import { useState } from "react";
import { Toaster } from "react-hot-toast";
// import { Loader2, Trash2, UserCheck } from "../../../../../fronyt/node_modules/lucide-react/dist/lucide-react";
import { Loader2, Trash2, UserCheck } from "lucide-react";
import { useParcel } from "../../../GlobalContext/ParcelContext";
import AssignAgentModal from "./modals/AssignAgentModal";
import UpdateParcelModal from "./modals/UpdateParcelModal";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Delivered: "bg-green-100 text-green-800",
  "In Transit": "bg-blue-100 text-blue-800",
  "Picked Up": "bg-purple-100 text-purple-800",
  Assigned: "bg-indigo-100 text-indigo-800",
  Failed: "bg-red-100 text-red-800",
};

const AdminParcelDashboard = () => {
  const {
    parcels,
    agents,
    loading,
    fetchParcels,
    deleteParcel,
  } = useParcel();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [modalType, setModalType] = useState(null); // 'assign' | 'update'

  const openModal = (type, parcel) => {
    setSelectedParcel(parcel);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedParcel(null);
    setModalType(null);
  };

  return (
    <div className=" bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-semibold my-4 text-center">Admin Parcel Dashboard</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : parcels.length ? (
        <div className="overflow-x-auto   shadow bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                {[
                  "Tracking",
                  "Status",
                  "Booked",
                  "Customer",
                  "৳",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="p-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id} className="border-t border-gray-200">
                  <td className="p-3 text-blue-600">{parcel.trackingCode}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[parcel.status] || "bg-gray-200 text-gray-800"}`}>
                      {parcel.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(parcel.timestamps?.bookedAt).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="p-3 text-xs">
                    <div className="font-semibold">{parcel.customerId?.name}</div>
                    <div className="text-gray-500">{parcel.customerId?.phone}</div>
                  </td>
                  <td className="p-3">৳{parcel.amount}</td>
                  <td className="p-3 space-y-1 flex flex-col gap-2">
                    {/* {parcel.status !== "Delivered" && (
                      <button
                        onClick={() => markAsDelivered(parcel._id)}
                        className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded w-full"
                      >
                        <Check className="inline w-4 h-4 mr-1" />
                        Delivered
                      </button>
                    )} */}
                    <button
                      onClick={() => openModal("assign", parcel)}
                      className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded w-full"
                    >
                      <UserCheck className="inline w-4 h-4 mr-1" />
                      Assign Agent
                    </button>
                    {/* <button
                      onClick={() => openModal("update", parcel)}
                      className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded w-full"
                    >
                      <Pencil className="inline w-4 h-4 mr-1" />
                      Update
                    </button> */}
                    <button
                      onClick={() => deleteParcel(parcel._id)}
                      className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded w-full"
                    >
                      <Trash2 className="inline w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No parcels found.</p>
      )}

      {modalType === "assign" && selectedParcel && (
        <AssignAgentModal
          isOpen={modalType === "assign"}
          onClose={closeModal}
          parcel={selectedParcel}
          agents={agents}
          onSuccess={fetchParcels}
        />
      )}

      {modalType === "update" && selectedParcel && (
        <UpdateParcelModal
          isOpen={modalType === "update"}
          onClose={closeModal}
          parcel={selectedParcel}
          onSuccess={fetchParcels}
        />
      )}
    </div>
  );
};

export default AdminParcelDashboard;
