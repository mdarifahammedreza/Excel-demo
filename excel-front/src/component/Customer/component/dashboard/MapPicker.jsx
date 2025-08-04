import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const LocationMarker = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
};

const MapPicker = ({ onClose, onSelectLocation }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (position) {
      (async () => {
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`
          );
          setAddress(res.data.display_name || "");
        } catch {
          setAddress("");
        }
      })();
    }
  }, [position]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="font-semibold text-lg">Select Pickup Location</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map */}
        <div className="flex-grow overflow-hidden">
          <MapContainer
            center={[23.8103, 90.4125]}
            zoom={13}
            className="h-[300px] sm:h-[400px] w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && <Marker position={position} />}
            <LocationMarker setPosition={setPosition} />
          </MapContainer>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex flex-col gap-2">
          <div className="text-sm font-medium">Selected Address:</div>
          <div className="text-sm text-gray-700 break-words max-h-20 overflow-y-auto">
            {address || "Click on the map to select location"}
          </div>
          <button
            disabled={!address}
            onClick={() => onSelectLocation(address)}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPicker;
