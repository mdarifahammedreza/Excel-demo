import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
} from "react-router";
import { UserProvider } from './GlobalContext/UserContext.jsx';
import './index.css';
import router from './router/Router.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
    
  </StrictMode>,
)
