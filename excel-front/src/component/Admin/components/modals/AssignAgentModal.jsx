import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../../../../GlobalContext/UserContext";

const AssignAgentModal = ({ isOpen, onClose, parcel, agents, onSuccess }) => {
  const [agentId, setAgentId] = useState("");
const {user} = useUser();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleAssign = async () => {
    if (!agentId) return toast.error("Please select an agent");

    try {
      console.log(agentId)
      const res = await fetch(`${API_BASE_URL}/parcels/${parcel._id}/assign-agent`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ agentId }),
        
      });

      if (!res.ok) throw new Error();
      toast.success("Agent assigned");
      onSuccess();
      onClose();
    } catch(err) {
      toast.error(` Failed to assign agent ${err}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4 shadow-lg">
        <h3 className="text-lg font-semibold">Assign Agent</h3>
        <select
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select agent</option>
          {agents.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name} ({a.email})
            </option>
          ))}
        </select>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="text-sm text-gray-500">Cancel</button>
          <button onClick={handleAssign} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded text-sm">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignAgentModal;
