import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { clearAdminData, saveAdminData } from '../redux/features/adminSlice'
import { AdminHeader } from "../components/admin/AdminHeader";
import { AdminFooter } from '../components/admin/AdminFooter'
import { AdminSidebar } from '../components/admin/AdminSidebar'

export const AdminLayout = () => {

  const {isAdminAuth,adminData}=useSelector((state)=>state.admin)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch()
  const location = useLocation()

  console.log(location.pathname)

  const checkAdmin = async()=>{
    try {
      const response = await axiosInstance({
        method:"GET",
        url:"/admin/check-admin"
      })
      dispatch(saveAdminData())
    } catch (error) {
      dispatch(clearAdminData())
      console.log(error)
    }
  }

  useEffect(()=>{
    checkAdmin()
  },[location.pathname])

  const toggleSidebar = () => {
    if (isAdminAuth) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="flex min-h-screen">
 
     {isAdminAuth && <AdminSidebar isOpen={isSidebarOpen} />}
    
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen && isAdminAuth ? "ml-64" : "ml-0"}`}>
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="flex-grow ">
          <Outlet />
        </main>
        <AdminFooter/>
      </div>
    </div>
  );
};
