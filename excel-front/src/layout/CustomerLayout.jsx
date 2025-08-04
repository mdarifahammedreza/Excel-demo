import { Outlet } from "react-router";
import Footer from "../component/Customer/component/Footer";
import NavCustomer from "../component/Customer/component/NavCustomer";


const CustomerLayout = () => {
    return (
        <>
            <NavCustomer/>
            
            <Outlet />
            <Footer/>
            
        </>
        )
    }


 export default CustomerLayout;