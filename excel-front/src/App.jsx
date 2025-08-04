import './App.css'
import { useUser } from './GlobalContext/UserContext'
import AdminLayout from './layout/AdminLayout'
import AgentLayout from './layout/AgentLayout'
import CustomerLayout from './layout/CustomerLayout'

function App() {
const {user}=useUser();
  if(!user) return  <CustomerLayout/> 
  else if (user.role === 'admin') {
    return <AdminLayout/>
  } else if (user.role === 'agent') {
    return <AgentLayout/>
  } else if (user.role === 'customer') {
    return <CustomerLayout/>
  } 

 
}

export default App
