import { Outlet } from "react-router";
import AdminDashboard from "../component/Admin/AdminDashboard";
import { ParcelProvider } from "../GlobalContext/ParcelContext";

const AdminLayout = () => {
    return <>
     <ParcelProvider>
      <AdminDashboard/>
     </ParcelProvider>
   
    <Outlet />
    </>
    }
  export default AdminLayout;