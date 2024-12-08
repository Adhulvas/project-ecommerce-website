import React, { useEffect } from 'react'
import { Header } from '../components/user/Header'
import { Footer } from '../components/user/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { LogoutHeader } from '../components/user/LogoutHeader'
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserData, saveUserData } from '../redux/features/userSlice'

export const UserLayout = () => {
  const {isUserAuth,userData}=useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const location = useLocation()

  console.log(location.pathname)

  const checkUser = async()=>{
    try {
      const response = await axiosInstance({
        method:"GET",
        url:"/user/check-user"
      })
      dispatch(saveUserData())
    } catch (error) {
      dispatch(clearUserData())
      console.log(error)
    }
  }

  useEffect(()=>{
    checkUser()
  },[location.pathname])
  return (
    <div className="flex flex-col min-h-screen">
      {isUserAuth ? <Header/> : <LogoutHeader/>}
      <main className="flex-grow">
        <Outlet/>
      </main>
      <Footer/>
  </div>
  )
}
