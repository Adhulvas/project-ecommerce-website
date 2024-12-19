import React from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import logo from '../../assets/wolf.jpg'
import logincover from '../../assets/cover3.jpg'
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
    user.profile_route = '/admin/products/list';
    user.signup_route = '/admin/signup';
  }   

  if (role === 'seller') {
    user.role = 'seller';
    user.login_api = '/seller/login';
    user.profile_route = '/seller/products/list'; 
    user.signup_route = '/seller/signup'; 
  }

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: user.login_api,
        data
      })

      console.log(response, "====response");
      toast.success("Log-in success")
      navigate(user.profile_route)
    } catch (error) {
      toast.error("Log-in failed")
      console.error(error)
    }
  }
  return (
 <div className="first-div flex items-center justify-center h-screen w-[90%] max-w-4xl mx-auto">
  <div className='w-11/12 max-w-5xl bg-slate-300 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row p-6 box-border'>

    <div className='hidden md:flex w-full md:w-1/2 p-1'>
      <img src={logincover} alt="Login Cover" className='w-full h-full object-cover rounded-3xl' />
    </div>


    <div className='w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-8 bg-slate-300 rounded-lg'>
      {/* Logo */}
      <div className='w-16 h-16 bg-slate-500 rounded-full flex items-center justify-center mb-6'>
        <img src={logo} alt="Logo" className='w-14 h-14 rounded-full object-cover' />
      </div>

      {/* Welcome Message */}
      <h1 className='text-4xl font-bold text-gray-800'>Welcome Back</h1>
      <p className="text-gray-600 mb-6">Please login to your account</p>

      {/* Login Form */}
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Email address"
          {...register('email')}
          className='w-full mb-2 p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          required
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          className='w-full mb-1 p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          required
        />
        <p className='text-right text-indigo-500 text-sm mb-4 cursor-pointer'>
          Forgot password?
        </p>
        <button className='w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600'>
          Login
        </button>
      </form>

      {/* Register Link */}
      <p className='text-gray-600 mt-6'>
        Don't have an account?{" "}
        <span onClick={() => navigate(user.signup_route)} className="text-indigo-500 cursor-pointer">Register</span>
      </p>
    </div>
  </div>
 </div>
  )
};
