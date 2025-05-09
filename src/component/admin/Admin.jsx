import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminNavbar from './AdminDash/AdminNavbar';
import Footer from '../Home/Footer/Footer';

import AdminDashboard from './AdminDash/AdminDashboard';
import AdminAsideBar from './AdminDash/AdminAsideBar';

const Admin = () => {
  const location = useLocation();
  return (
    <div>
      <AdminNavbar />
      <AdminAsideBar/>
      {location.pathname === '/Admin-Dash/' && ( 
        <AdminChartDash />
      )}
      <Outlet />
      <Footer />
    </div>
  )
}

export default Admin