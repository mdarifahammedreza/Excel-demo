import {
  createBrowserRouter,
} from "react-router";
import App from "../App";
import CustomerPageHome from "../component/Customer/CustomerPageHome";
import CustomerDashboard from "../component/Customer/DashboardPage";
import ServicesPage from "../component/Customer/ServicesPage";
import TrackPage from "../component/Customer/TrackPage";
import AuthForm from "../component/Template/AuthForm";
import AdminLayout from "../layout/AdminLayout"
import axios from "axios";
import AgentLayout from "../layout/AgentLayout";
import Protector from "./Protector";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
          { path: "/", 
            element: <CustomerPageHome/> 
          },
          { path: "/services", 
            element: <ServicesPage/> 
          },
          {
            path: "/tracking",
            element: <TrackPage />,
            errorElement: <div className=" flex justify-center items-center" ><p>No parcel found on this tracking ID</p></div>,
            loader: async ({ request }) => {
              const id = new URL(request.url).searchParams.get("id");
              const token = JSON.parse(localStorage.getItem("user")).token;
              if (!id) throw new Response("Missing tracking ID", { status: 400 });
              if (!token) throw new Response("Unauthorized", { status: 401 });
          
              try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/parcels/tracking/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                return data.parcel;
              } catch {
                throw new Response("Not found or unauthorized", { status: 404 });
              }
            }
          } ,
          { path: "/dashboard", 
            element: <Protector><CustomerDashboard/></Protector> 
          },
         
        ]
  },
  {
    path: "/login",
    element: <AuthForm/>,
  },
  {
    path: "/admin",
    element: <AdminLayout/>
  },
  {
    path: "/agent",
    element: <AgentLayout/>
  }
]);


export default router;