import { Box, DollarSign, Phone, QrCode } from "lucide-react";
import AgentLiveTracker from "./AgentLiveTracker";

const ParcelCard = ({ parcel, onUpdate, onScan }) => (
  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-semibold text-gray-800">#{parcel.id}</h3>
        <p className="text-sm text-gray-600">
          {parcel.sender} → {parcel.receiver}
        </p>
      </div>
      <span
        className={`bg-${parcel.statusColor}-100 text-${parcel.statusColor}-800 px-2 py-1 rounded-full text-xs`}
      >
        {parcel.status}
      </span>
    </div>
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div>
        <p className="text-sm font-medium text-gray-700">Pickup Address:</p>
        <p className="text-sm text-gray-600">{parcel.pickup}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">Delivery Address:</p>
        <p className="text-sm text-gray-600">{parcel.delivery}</p>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex space-x-4 text-sm text-gray-600">
        <span>
          <Box className="inline mr-1" size={16} /> {parcel.size}
        </span>
        <span>
          <DollarSign className="inline mr-1" size={16} /> {parcel.payment}
        </span>
        <span>
          <Phone className="inline mr-1" size={16} /> {parcel.phone}
        </span>
      </div>
      <div className="flex space-x-2">
        {parcel.actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onUpdate(parcel.id, action.status)}
            className={`bg-${action.color}-500 text-white px-3 py-1 rounded text-sm hover:bg-${action.color}-700 transition`}
          >
            {action.icon ? (
              <action.icon className="inline" size={16} />
            ) : (
              action.label
            )}
          </button>
        ))}
        {parcel.qr && (
          <button
            onClick={() => onScan(parcel.id)}
            className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-700"
          >
            <QrCode size={16} />
          </button>
        )}
        {parcel.status === "In Transit" && (
          <AgentLiveTracker parcelId={parcel.id} status={parcel.status} />
        )}
      </div>
    </div>
  </div>
);

export default ParcelCard;
