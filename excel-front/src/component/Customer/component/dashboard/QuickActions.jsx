import { CheckCircle, Package, Plus, Truck } from "lucide-react";

const QuickActions = ({ onOpenModal, parcels = [] }) => {
  // Calculate counts based on status
  const totalParcels = parcels.length;
  const pickedUpCount = parcels.filter(p => p.status === "Picked Up").length;
  const inTransitCount = parcels.filter(p => p.status === "In Transit").length;
  const deliveredCount = parcels.filter(p => p.status === "Delivered").length;
  const failedCount = parcels.filter(p => p.status === "Failed").length;

  return (
    <div className="grid md:grid-cols-5 gap-6 mb-8">
      <button
        onClick={onOpenModal}
        className="bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-700 transition text-center"
      >
        <Plus className="mx-auto mb-3" size={30} />
        <h3 className="text-lg font-semibold">Book Parcel</h3>
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Package className="text-orange-500 mx-auto mb-3" size={30} />
        <h3 className="text-lg font-semibold text-gray-800">Total Parcels</h3>
        <p className="text-2xl font-bold text-blue-500">{totalParcels}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <CheckCircle className="text-purple-500 mx-auto mb-3" size={30} />
        <h3 className="text-lg font-semibold text-gray-800">Picked Up</h3>
        <p className="text-2xl font-bold text-purple-500">{pickedUpCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Truck className="text-green-500 mx-auto mb-3" size={30} />
        <h3 className="text-lg font-semibold text-gray-800">In Transit</h3>
        <p className="text-2xl font-bold text-green-500">{inTransitCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <CheckCircle className="text-green-600 mx-auto mb-3" size={30} />
        <h3 className="text-lg font-semibold text-gray-800">Delivered</h3>
        <p className="text-2xl font-bold text-green-600">{deliveredCount}</p>
      </div>

      {failedCount > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Package className="text-red-600 mx-auto mb-3" size={30} />
          <h3 className="text-lg font-semibold text-gray-800">Failed</h3>
          <p className="text-2xl font-bold text-red-600">{failedCount}</p>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
