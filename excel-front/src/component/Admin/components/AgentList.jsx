import { useParcel } from "../../../GlobalContext/ParcelContext";

const AgentList = () => {
  const { agents } = useParcel();

  return (
    <div className="">
      <h2 className="text-xl font-bold my-4 text-center">Agent List</h2>

      {agents?.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <table className="min-w-full bg-white text-sm border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Phone</th>
              <th className="p-3 border-b">Address</th>
              <th className="p-3 border-b">Age</th>
              <th className="p-3 border-b">Language</th>
              <th className="p-3 border-b">Joined</th>
            </tr>
          </thead>
          <tbody>
            {agents?.map((agent) => (
              <tr key={agent._id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="p-3">{agent.name}</td>
                <td className="p-3">{agent.email}</td>
                <td className="p-3">{agent.phone}</td>
                <td className="p-3">{agent.address}</td>
                <td className="p-3">{agent.age}</td>
                <td className="p-3">{agent.language}</td>
                <td className="p-3">{new Date(agent.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AgentList;
