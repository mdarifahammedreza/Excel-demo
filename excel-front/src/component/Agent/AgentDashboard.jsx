import { CheckCircle, ListChecks, Star, Truck } from "lucide-react";

import { useAgentParcel } from "../../GlobalContext/AgentParcelContext";
import Header from "./components/Navbar";
import ParcelCard from "./components/ParcelCard";
import RouteCard from "./components/RouteCard";
import StatsCard from "./components/StatsCard";
const AgentDashboard = () => {
  const { agentParcels, updateParcelStatus, updateParcelLocation, loading } =
    useAgentParcel();

  const handleStatusUpdate = async (id, status) => {
    await updateParcelStatus(id, status);
  };

  const handleScan = async (id) => {
    const lat = 23.8103;
    const lng = 90.4125;
    await updateParcelLocation(id, lat, lng);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Agent Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your assigned deliveries and update parcel status
          </p>
          
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={ListChecks}
            title="Assigned Today"
            count={agentParcels.length}
            color="text-blue-500"
          />
          <StatsCard
            icon={Truck}
            title="Picked Up"
            count={agentParcels.filter((p) => p.status === "Picked Up").length}
            color="text-purple-500"
          />
          <StatsCard
            icon={Truck}
            title="In Transit"
            count={agentParcels.filter((p) => p.status === "In Transit").length}
            color="text-orange-500"
          />
          <StatsCard
            icon={Truck}
            title="Out for Delivery"
            count={
              agentParcels.filter((p) => p.status === "Out for Delivery").length
            }
            color="text-teal-500"
          />
          <StatsCard
            icon={CheckCircle}
            title="Delivered"
            count={agentParcels.filter((p) => p.status === "Delivered").length}
            color="text-green-500"
          />
          <StatsCard
            icon={CheckCircle}
            title="Failed"
            count={agentParcels.filter((p) => p.status === "Failed").length}
            color="text-red-500"
          />
          <StatsCard
            icon={Star}
            title="Rating"
            count={"4.8/5"}
            color="text-yellow-500"
          />
        </div>

        <RouteCard />

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Assigned Parcels
            </h2>
            <select className="px-3 py-2 border border-gray-300 rounded-lg">
              <option>All Status</option>
              <option>Pending Pickup</option>
              <option>Picked Up</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Failed</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading parcels...</p>
          ) : (
            <div className="space-y-4">
              {agentParcels.map((parcel) => (
                <ParcelCard
                  key={parcel._id}
                  parcel={{
                    id: parcel._id,
                    sender: parcel.customerId?.name || "N/A",
                    receiver: "Receiver",
                    status: parcel.status,
                    statusColor:
                      parcel.status === "Delivered"
                        ? "green"
                        : parcel.status === "In Transit"
                        ? "orange"
                        : parcel.status === "Picked Up"
                        ? "blue"
                        : parcel.status === "Assigned"
                        ? "yellow"
                        : "gray",
                    pickup: parcel.pickupAddress,
                    delivery: parcel.deliveryAddress,
                    size: parcel.parcelSize,
                    payment: `${parcel.paymentType}: $${parcel.amount}`,
                    phone: parcel.customerId?.phone || "N/A",
                    qr: true,
                    actions: [
                      ...(parcel.status === "Assigned"
                        ? [
                            {
                              status: "Picked Up",
                              label: "Mark Picked",
                              color: "blue",
                            },
                          ]
                        : []),
                      ...(parcel.status === "Picked Up"
                        ? [
                            {
                              status: "In Transit",
                              label: "Transit",
                              color: "orange",
                            },
                          ]
                        : []),
                      ...(parcel.status === "In Transit"
                        ? [
                            {
                              status: "Delivered",
                              label: "Deliver",
                              color: "green",
                            },
                          ]
                        : []),
                      ...(parcel.status !== "Delivered" &&
                      parcel.status !== "Failed"
                        ? [{ status: "Failed", label: "Fail", color: "red" }]
                        : []),
                    ],
                  }}
                  onUpdate={handleStatusUpdate}
                  onScan={handleScan}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
