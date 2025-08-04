import { Navigate, Outlet } from "react-router";
import AgentDashboard from "../component/Agent/AgentDashboard";
import { AgentParcelProvider } from "../GlobalContext/AgentParcelContext";
import { useUser } from "../GlobalContext/UserContext";

const AgentLayout = () => {
  const { user } = useUser();

  if (!user || user.role !== "agent") {
    return <Navigate to="/" replace />;
  }

  return (
    <AgentParcelProvider>
      <AgentDashboard />
      <Outlet />
    </AgentParcelProvider>
  );
};

export default AgentLayout;
