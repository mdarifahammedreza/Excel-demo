import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { io } from "socket.io-client";

// Custom agent marker
const agentIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper component to update map center on position change
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);
  return null;
};

const LiveMap = ({ parcelId, status }) => {
  const [position, setPosition] = useState(null);
  const socketRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    // Only connect if status is "In Transit" and parcelId is valid
    if (status !== "In Transit" || !parcelId) return;

    // Create socket connection
    const socket = io(`${API_BASE_URL}`, {
      transports: ["websocket"],
      reconnection: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("joinCustomerRoom", parcelId);
    });

    socket.on("locationUpdate", (data) => {
      if (data.parcelId === parcelId) {
        console.log("Received location:", data);
        setPosition([data.lat, data.lng]);
      }
    });

    // Clean up on unmount or when parcelId/status changes
    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leaveRoom", parcelId);
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [parcelId, status]);

  if (status !== "In Transit") {
    return (
      <div className="text-center text-gray-500 py-4">
        Live tracking will be available once the parcel is in transit.
      </div>
    );
  }

  if (!position) {
    return (
      <div className="text-center text-gray-600 py-4">
        Waiting for real-time location from delivery agent...<span className="text-xs text-red-600">[Because of web service agent need to trun on the web tab]</span>
      </div>
    );
  }

  return (
    <div className="h-96 rounded-lg overflow-hidden border shadow">
      <MapContainer
        center={position}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={agentIcon}>
          <Popup>Agent's Current Location</Popup>
        </Marker>
        <RecenterMap position={position} />
      </MapContainer>
    </div>
  );
};

export default LiveMap;
