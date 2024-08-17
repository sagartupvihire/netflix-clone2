/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
    console.log(email, password);

  };


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to={"/"}>
          <img src='/netflix-logo.png' alt='logo' className='w-52' />
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1>

          <form className='space-y-4' onSubmit={handleLogin}>
            <div>
              <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                Email
              </label>
              <input
                type='email'
                className='w-full focus:bg-transparent px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                placeholder='you@example.com'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                Password
              </label>
              <input
                type={showPassword ? 'password' : 'text'}
                className='w-full px-3 py-2 mt-1 border bg-transparent border-gray-700 rounded-md focus:bg-transparent text-white focus:outline-none focus:ring'
                placeholder='••••••••'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='absolute flex right-2 py-2 pr-2 top-7 justify-center items-center text-gray-300 bg-t'>

                <button onClick={toggleShowPassword} >
                  {showPassword ? <Eye className='size-[18px] lg:size-4' /> : <EyeOff className='size-[18px] lg:size-4' />}

                </button>
              </div>
            </div>

            <button
              className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700
						'
            // disabled={isLoggingIn}
            >
              {/* {isLoggingIn ? "Loading..." : "Login"} */}
              Login
            </button>
          </form>
          <div className='text-center text-gray-400'>
            Don't have an account?{" "}
            <Link to={"/signup"} className='text-red-500 hover:underline'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;