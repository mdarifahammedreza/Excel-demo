import L from "leaflet";
import { Route } from "lucide-react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import { useUser } from "../../../GlobalContext/UserContext";


// Fix default icon issue with React-Leaflet + Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
});

const RouteCard = () => {
  const { user } = useUser();
  const [routePoints, setRoutePoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchOptimizedRoute = async () => {
    if (!user?.token) return;
  
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/parcels/optimize-route-with-geo`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
  
      const data = await res.json(); 
      if (res.ok && data.success) {
        setRoutePoints(data.optimizedRoute);
        toast.success("Optimized route loaded successfully!");
      } else {
        console.error("Backend responded with error:", data);
        toast.error(data.message || "Failed to load route");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Error fetching optimized route");
    } finally {
      setLoading(false);
    }
  };
  

  // Center map on first point or fallback to Dhaka
  const center = routePoints.length
    ? [routePoints[0].lat, routePoints[0].lng]
    : [23.8103, 90.4125]; // Dhaka lat/lng fallback

  // Convert points to LatLng array for Polyline
  const polylinePositions = routePoints.map((p) => [p.lat, p.lng]);
console.log(polylinePositions)
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Today's Route</h2>
        <button
          onClick={fetchOptimizedRoute}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        ><Toaster/>
          <Route className="inline mr-2" size={18} />
          {loading ? "Loading..." : "Optimize Route"}
        </button>
      </div>
      <div className="bg-gray-100 h-64 rounded-lg">
        <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {routePoints.map((point, idx) => (
            <Marker key={idx} position={[point.lat, point.lng]}>
              <Popup>
                <b>{point.type.toUpperCase()}</b> for Parcel: {point.id} <br />
                {point.formatted}
              </Popup>
            </Marker>
          ))}
          {polylinePositions.length > 1 && <Polyline positions={polylinePositions} color="blue" />}
        </MapContainer>
      </div>
    </div>
  );
};

export default RouteCard;
