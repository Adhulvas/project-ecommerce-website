import React from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import logo from '../../assets/wolf.jpg'
import logincover from '../../assets/logincover.avif'

export const Signup = ({ role = "user" }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const user = {
    role: "user",
    signup_api: "/user/signup",
    login_route: "/login",
    homepage_route:'/'
  };

  if (role === "admin") {
    user.role = "admin";
    user.signup_api = "/admin/signup";
    user.login_route = "/admin/login",
    user.homepage_route = '/admin/dashboard'
  }

  if (role === "seller") {
    user.role = "seller";
    user.signup_api = "/seller/signup";
    user.login_route = "/seller/login",
    user.homepage_route = '/seller/dashboard'
  }

  const onSubmit = async(data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: user.signup_api,
        data,
      });

      toast.success("Signup successful");
      navigate(user.homepage_route)
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed. Please try again.");
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center mt-10 h-screen w-full bg-gradient-to-br from-red-300 to-red-400">
      {/* second-div */}
      <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row p-4 md:p-6 box-border">
        {/* left-section */}
        <div className="hidden md:flex w-full md:w-1/2 p-1">
          <img src={logincover} alt="Login Cover" className="w-full h-full object-cover rounded-3xl" />
        </div>

        {/* right-section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-8 bg-white rounded-lg">
          {/* Logo */}
          <div className="w-16 h-16 bg-slate-500 rounded-full flex items-center justify-center mb-6">
            <img src={logo} alt="Logo" className="w-14 h-14 rounded-full object-cover" />
          </div>

          {/* Welcome Message */}
          <h1 className="text-4xl font-bold text-gray-800 text-center">Create Account</h1>
          <p className="text-gray-600 mb-6 text-center">Enter your Details</p>

          {/* Login Form */}
          <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full mb-2 p-3  border-b-2 border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-0 focus:border-indigo-500"
              required
            />
            <input
              type="email"
              placeholder="Email address"
              {...register("email")}
              className="w-full mb-2 p-3 border-b-2 border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-0 focus:border-indigo-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full mb-4 p-3 border-b-2 border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-0 focus:border-indigo-500"
              required
            />
            <button className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600">
              Register
            </button>
          </form>

          {/* Register Link */}
          <p className="text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate(user.login_route)}
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
