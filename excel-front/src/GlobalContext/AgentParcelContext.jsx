import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../GlobalContext/UserContext"; // adjust if needed

const AgentParcelContext = createContext();

export const AgentParcelProvider = ({ children }) => {
  const { user } = useUser();
  const [agentParcels, setAgentParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  // Fetch parcels assigned to agent
  const fetchAgentParcels = async () => {
    if (user?.role !== "agent") return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/parcels`, axiosConfig);
      const filtered = res.data.parcels
      setAgentParcels(filtered || []);
    } catch (err) {
      toast.error(`Failed to load parcels ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Update status: Picked Up / In Transit / Delivered / Failed
  const updateParcelStatus = async (parcelId, status) => {
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/parcels/${parcelId}/status`,
        { status },
        axiosConfig
      );
      toast.success("✅ Status updated");
      fetchAgentParcels();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  // Update current location
  const updateParcelLocation = async (parcelId, lat, lng) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/parcels/${parcelId}/location`,
        { lat, lng },
        axiosConfig
      );
      toast.success("📍 Location updated");
      fetchAgentParcels();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update location");
    }
  };

  // Fetch a single parcel by ID
  const getParcelById = async (parcelId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/parcels/${parcelId}`, axiosConfig);
      setSelectedParcel(res.data.parcel);
    } catch (err) {
      toast.error("Could not fetch parcel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "agent") {
      fetchAgentParcels();
    }
  }, [user]);

  return (
    <AgentParcelContext.Provider
      value={{
        agentParcels,
        selectedParcel,
        loading,
        fetchAgentParcels,
        updateParcelStatus,
        updateParcelLocation,
        getParcelById,
      }}
    >
      {children}
    </AgentParcelContext.Provider>
  );
};

export const useAgentParcel = () => {
  const context = useContext(AgentParcelContext);
  if (!context) {
    throw new Error("useAgentParcel must be used within AgentParcelProvider");
  }
  return context;
};
