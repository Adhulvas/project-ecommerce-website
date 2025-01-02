import React, { useEffect, useState } from 'react';
import { Header } from '../components/user/Header';
import { Footer } from '../components/user/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { LogoutHeader } from '../components/user/LogoutHeader';
import { axiosInstance } from '../config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, saveUserData } from '../redux/features/userSlice';

export const UserLayout = () => {
  const isUserAuth = useSelector((state) => state.user.isUserAuth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await axiosInstance.get("/user/check-user");
      dispatch(saveUserData(response.data));
    } catch (error) {
      dispatch(clearUserData());
      console.error("Check User Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {isUserAuth ? <Header /> : <LogoutHeader />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};