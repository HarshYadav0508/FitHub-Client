import React, { useState } from 'react'
import { MdAlternateEmail } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/Social/GoogleLogin';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [showpassword, setShowpassword] = useState(false);
    const location = useLocation();
    const {login, error, setError, loader, setLoader} = useAuth();
    const navigate = useNavigate();


    const handleSubmit = e => {
        setError('');
        e.preventDefault();

        const data = new FormData(e.target);
        const formData = Object.fromEntries(data)
        // console.log(formData);
        login(formData.email, formData.password).then(() => {
            navigate(location.state?.from || '/dashboard')
        }).catch ((error) => {
            setError(error.code);
            setLoader(false);
        })
    }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center dark:bg-dark dark:text-white px-4 py-16 sm:px-6 lg:px-8 w-full'>
    <h1 className='text-2xl font-bold text-secondary sm:text-3xl text-center'>Get Started Today!</h1>
    <p className='mt-4 max-w-md text-center text-gray-500'>Explore our comprehensive library of courses, meticulously crafted to cater to all levels of expertise.</p>

    <div className='w-full max-w-lg mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <p className='text-center text-green-500 text-lg font-medium'>Sign in to your account</p>
            
            {/* Email Field */}
            <div>
                <label htmlFor="email" className='sr-only'>Email</label>
                <div className='relative'>
                    <input type="email" name='email' placeholder='Enter email' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'/>
                    <span className='absolute inset-y-0 end-2 grid place-items-center px-4'>
                        <MdAlternateEmail className='h-4 w-4 text-gray-400'/>
                    </span>
                </div>
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className='sr-only'>Password</label>
                <div className='relative'>
                    <input type={showpassword ? 'text' : 'password'} name='password' placeholder='Enter password' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'/>
                    <span onClick={() => setShowpassword(!showpassword)} className='absolute inset-y-0 end-2 grid place-items-center px-4'>
                        <LuEye className='h-4 w-4 text-gray-400'/>
                    </span>
                </div>
            </div>

            <button type='submit' className='block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white'>Sign in</button>

            <p className='text-center text-sm text-gray-500'>No account? 
                <Link className='underline' to='/register'> Sign Up</Link>
            </p>
        </form>
        <p className='text-red-500 py-5 font-medium text-center'>Please signup manually, if you are first time user. Google Login might give problem due to hosting. </p>
        <GoogleLogin />
    </div>
</div>
  )
}

export default Login