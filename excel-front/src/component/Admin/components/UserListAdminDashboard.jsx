import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useParcel } from "../../../GlobalContext/ParcelContext";
import { useUser } from "../../../GlobalContext/UserContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AdminUserManagement = () => {
  const {
    users,
    loading,
    error,
    updatingUserId,
    fetchUsers,
    handleRoleChange,
  } = useParcel();
  const {user} = useUser();

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      
      
      const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete user");
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.log(err)
      toast.error(err.message || "Failed to delete user");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <Toaster position="top-right" />
      <h2 className="text-xl font-bold mb-4">User Management (Admin)</h2>
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Role</th>
            <th className="p-3">Age</th>
            <th className="p-3">Address</th>
            <th className="p-3">Created At</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-3 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map(({ _id, name, email, phone, role, age, address, createdAt }) => (
              <tr key={_id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-3 font-medium text-blue-600">{name}</td>
                <td className="p-3">{email}</td>
                <td className="p-3">{phone}</td>
                <td className="p-3">
                  <select
                    value={role}
                    onChange={(e) => handleRoleChange(_id, e.target.value)}
                    disabled={updatingUserId === _id}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                    <option value="agent">Agent</option>
                  </select>
                </td>
                <td className="p-3">{age}</td>
                <td className="p-3">{address}</td>
                <td className="p-3">
                  {new Date(createdAt).toLocaleString("en-BD", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteUser(_id)}
                    className="text-xs text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserManagement;
