import React from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import logo from '../../assets/wolf.jpg'
import logincover from '../../assets/logincover.avif'
import { axiosInstance } from '../../config/axiosInstance'
import { useNavigate } from 'react-router-dom'

export const Login = ({ role = 'user'}) => {
  const { register, handleSubmit} = useForm()
  const navigate = useNavigate()

  const user = {
    role: 'user',
    login_api: '/user/login',
    profile_route: '/',
    signup_route: '/signup'
  }

  if (role === 'admin') {
    user.role = 'admin';
    user.login_api = '/admin/login';
    user.profile_route = '/admin/dashboard';
    user.signup_route = '/admin/signup';
  }   

  if (role === 'seller') {
    user.role = 'seller';
    user.login_api = '/seller/login';
    user.profile_route = '/seller/dashboard'; 
    user.signup_route = '/seller/signup'; 
  }

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: user.login_api,
        data
      })
      toast.success("Log-in success")
      navigate(user.profile_route)
    } catch (error) {
      toast.error("Log-in failed")
      console.error(error)
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 mt-10 bg-gradient-to-br from-blue-300 to-indigo-400">
      <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row p-4 md:p-6 box-border">
        {/* Image Section */}
        <div className="hidden md:flex w-full md:w-1/2 p-1">
          <img src={logincover} alt="Login Cover" className="w-full h-full object-cover rounded-3xl" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 py-6 md:px-6 md:py-8 bg-white rounded-lg">
          {/* Logo */}
          <div className="w-16 h-16 bg-slate-500 rounded-full flex items-center justify-center mb-6">
            <img src={logo} alt="Logo" className="w-14 h-14 rounded-full object-cover" />
          </div>

          {/* Welcome Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Welcome Back</h1>
          <p className="text-gray-600 mb-6 text-center">Please login to your account</p>

          {/* Login Form */}
          <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Email address"
              {...register('email')}
              className="w-full mb-4 p-3 border-b-2 border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-0 focus:border-indigo-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
              className="w-full mb-4 p-3 border-b-2 border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-0 focus:border-indigo-500"
              required
            />
            <p className="text-right text-indigo-500 text-sm mb-6 cursor-pointer">Forgot password?</p>
            <button className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-200">
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="text-gray-600 mt-6 text-center">
            Don't have an account?{' '}
            <span
              onClick={() => navigate(user.signup_route)}
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  )
};
