import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SellerHeader } from "../components/seller/SellerHeader";
import { SellerFooter } from "../components/seller/SellerFooter";
import { SideBar } from "../components/seller/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { clearSellerData, saveSellerData } from "../redux/features/sellerSlice";
import { axiosInstance } from "../config/axiosInstance";

export const SellerLayout = () => {
  const {isSellerAuth,sellerData}=useSelector((state)=>state.seller)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch()
  const location = useLocation()

  console.log(location.pathname)

  const checkSeller = async()=>{
    try {
      const response = await axiosInstance({
        method:"GET",
        url:"/seller/check-seller"
      })
      dispatch(saveSellerData())
    } catch (error) {
      dispatch(clearSellerData())
      console.log(error)
    }
  }

  useEffect(()=>{
    checkSeller()
  },[location.pathname])

  const toggleSidebar = () => {
    if (isSellerAuth) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className="flex min-h-screen">
 
     {isSellerAuth && <SideBar isOpen={isSidebarOpen} />}
    
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen && isSellerAuth ? "ml-64" : "ml-0"}`}>
        <SellerHeader toggleSidebar={toggleSidebar} />
        <main className="flex-grow ">
          <Outlet />
        </main>
        <SellerFooter />
      </div>
    </div>
  );
};
