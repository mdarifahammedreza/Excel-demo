// src/components/Protector.jsx
import { Navigate } from "react-router";
import { useUser } from "../GlobalContext/UserContext";

const Protector = ({ children }) => {
  const { user } = useUser(); 

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protector;
