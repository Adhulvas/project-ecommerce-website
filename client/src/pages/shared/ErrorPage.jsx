import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = ({ role = 'user'}) => {

  const url = {
    home: "/"
  }

  if(role == "seller"){
     url.home = '/seller/dashboard'
  }
  if(role == "admin"){
     url.home = '/admin/dashboard'
  }

  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-center">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="text-4xl font-semibold text-white mt-4">
        Oops! Page not found.
      </h2>
      <p className="text-lg text-gray-400 mt-4">
        The page you’re looking for doesn’t exist or has been removed.
      </p>
      <h2
      className='mt-8 px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-lg font-medium rounded-md transition duration-300'
      onClick={()=>navigate(url.home)}>Go Back To Home</h2>
    </div>
  )
}
