// src/context/ParcelContext.jsx
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../GlobalContext/UserContext"; // adjust the path as needed

const ParcelContext = createContext();

export const ParcelProvider = ({ children }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { user } = useUser();
  const [agents, setAgents] = useState([]);
  const [users, setUsers] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/users`, axiosConfig);
      if (res.data.success) {
        setUsers(res.data.users);
        setAgents(res.data.users.filter((u) => u.role === "agent"));
      } else {
        setError("Failed to load users");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const fetchParcels = async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/parcels`, axiosConfig);
      setParcels(res.data.parcels || []);
    } catch (err) {
      console.error(err)
      toast.error(" Failed to fetch parcels");
    } finally {
      setLoading(false);
    }
  };



  const markAsDelivered = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/parcels/${id}`,
        { status: "Delivered" },
        axiosConfig
      );
      toast.success("✅ Marked as Delivered");
      fetchParcels();
    } catch (err) {
      console.log(err)
      toast.error(" Failed to update status");
    }
  };

  const deleteParcel = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this parcel?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`${API_BASE_URL}/parcels/${id}`, axiosConfig);
      toast.success("🗑️ Parcel Deleted");
      fetchParcels();
    } catch (err) {
      toast.error(" Delete failed");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingUserId(userId);
      await axios.put(
        `${API_BASE_URL}/users/${userId}/role`,
        { role: newRole },
        axiosConfig
      );
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      alert("Failed to update role: " + (err.response?.data?.message || err.message));
    } finally {
      setUpdatingUserId(null);
    }
  };

  useEffect(() => {
    let timeout;
  
    if (user?.token) {
      // Wait a maximum of 2 seconds before fetching
      timeout = setTimeout(() => {
        fetchParcels();
        fetchUsers();
      }, 1000);
    }
  
    // Cleanup timeout when unmounting or user/token changes
    return () => clearTimeout(timeout);
  }, [user]);

  return (
    <ParcelContext.Provider
      value={{
        agents,
        users,
        parcels,
        loading,
        error,
        updatingUserId,
        fetchParcels,
        fetchUsers,
        markAsDelivered,
        deleteParcel,
        handleRoleChange,
      }}
    >
      {children}
    </ParcelContext.Provider>
  );
};

export const useParcel = () => {
  const context = useContext(ParcelContext);
  if (!context) {
    throw new Error("useParcel must be used inside ParcelProvider");
  }
  return context;
};
