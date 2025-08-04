import React, { useState } from "react";
import { toast } from "react-hot-toast";

const AssignAgentModal = ({ isOpen, onClose, parcel, agents, token, onSuccess }) => {
  const [agentId, setAgentId] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleAssign = async () => {
    if (!agentId) return toast.error("Please select an agent");

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/parcels/${parcel._id}/assign-agent`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ agentId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to assign agent");

      toast.success("✅ Agent assigned successfully");
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(` ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4 shadow-lg">
        <h3 className="text-lg font-semibold">Assign Agent</h3>
        
        <select
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select agent</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name} ({agent.email})
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="text-sm text-gray-600 hover:underline">
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={loading}
            className={`bg-indigo-600 text-white px-4 py-1 rounded text-sm ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignAgentModal;
