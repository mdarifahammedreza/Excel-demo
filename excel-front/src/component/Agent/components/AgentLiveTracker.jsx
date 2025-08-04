import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const AgentLiveTracker = ({ parcelId, status }) => {
  const socketRef = useRef(null);
  const watchIdRef = useRef(null);
  const [error, setError] = useState(null);
  const [tracking, setTracking] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    
    if (status !== "In Transit" || !parcelId) {
      stopTracking();
      return;
    }

    // Initialize socket connection
    const socket = io(`${API_BASE_URL}`, {
      transports: ["websocket"],
      reconnection: true,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Agent connected to socket server");
      setTracking(true);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setError("Socket connection error");
      setTracking(false);
    });

    // Start sending location updates via geolocation watch
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log("Sending location update:", lat, lng);

          socket.emit("agentLocationUpdate", { parcelId, lat, lng });
          setError(null);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Unable to get your location");
          setTracking(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
          timeout: 10000,
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setTracking(false);
    }

    // Cleanup on unmount or status/parcelId change
    return () => {
      stopTracking();
      if (socket) socket.disconnect();
    };

    // Helper to stop tracking
    function stopTracking() {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setTracking(false);
    }
  }, [parcelId, status]);

  return (
    <div className="p-1 rounded">
     <p>traking...</p>
    </div>
  );
};

export default AgentLiveTracker;
