import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/authUser';


const SignUpPage = () => {

  const {searchParams} = new URL(document.location)
  const emailFromSearchParams = searchParams.get("email");
  const [email, setEmail] = useState(emailFromSearchParams);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setshowpassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const toggleShowPassword = () => {
    setshowpassword(!showPassword);
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    signup({ email, username, password });
    console.log(email, username, password);

    // Navigate to the login page after signup
    // Navigate("/login");
  };
  return (
    <div className='h-screen w-full hero-bg' > 
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to={"/"}>
            <img src='/netflix-logo.png' alt='logo' className='w-52' />
        </Link>

        </header>

        <div className='flex justify-center items-center mt-20 mx-3'>
                <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md '>
                    <h1 className=' text-center text-2xl font-bold mb-4  text-white'>Sign Up</h1>
                    <form className='space-y-4 ' onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor='username' className='text-sm font-medium text-gray-300 block'> Username</label>
                      <input type='text' id='username' placeholder='Username'
                      
                        className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring focus:bg-transparent ' value={username}
                        onChange={(e)=>{
                          setusername(e.target.value);
                        }} />
                        
                    </div>
                    <div>
                      <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>Email</label>
                      <input type='email' id='email' placeholder='Email'
                       value={email}
                       onChange={(e) =>setEmail(e.target.value)}
                       className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring focus:bg-transparent'/>
                    </div>
                    <div className='relative'>
                      <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>Password</label>
                      <input type={showPassword ?'password':'text' } id='password' placeholder='Password'
                        value={password} 
                        onChange={(e)=>setpassword(e.target.value)}
                        className='w-full px-3 py-2 pr-10 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring focus:bg-transparent'/>
                        <div className='absolute flex right-2 py-2 pr-2 top-7 justify-center items-center text-gray-300 bg-t'>
                        <button onClick={toggleShowPassword} >
                          {showPassword ? <Eye className='size-[18px] lg:size-4'/> : <EyeOff className='size-[18px] lg:size-4'/>}

                        </button>
                        </div>
                    </div>
                    <button className='w-full text-white py-2 bg-red-600 font-semibold rounded-md
                    hover:bg-red-700'>
                      {isSigningUp ? 'Signing Up' : 'Sign Up'} 
                    </button>
                    </form>
                    <div className='text-center text-gray-400'>
                      Already Have A Account ?{" "}
                      <Link to={"/login"} className='text-sm text-red-500 hover:underline'>Login</Link>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default SignUpPage