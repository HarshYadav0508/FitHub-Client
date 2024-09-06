import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/Social/GoogleLogin';
import { AuthContext } from '../../utilities/providers/AuthProvider';
import axios from 'axios';

const KEY = import.meta.env.VITE_IMG_TOKEN;
const Register = () => {
    const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
    const navigate = useNavigate();
    const { signUp, updateUser } = useContext(AuthContext);
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
    const [globalError, setGlobalError] = useState('');
    const [image, setImage] = useState(null); // Image state

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file); // Set selected image file
    };

    const onSubmit = async (data) => {
        setGlobalError('');

        // FormData to handle image upload
        const formData = new FormData();
        formData.append('image', image);

        // Upload image to imgbb
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });
        const imageData = await response.json();

        if (imageData.success) {
            data.photoUrl = imageData.data.display_url; // Set image URL
            signUp(data.email, data.password).then((result) => {
                const user = result.user;
                if (user) {
                    return updateUser(data.name, data.photoUrl).then(() => {
                        const userInfo = {
                            name: user?.displayName,
                            email: user?.email,
                            photoURL: data.photoUrl, // Use uploaded image URL
                            role: 'user',
                            gender: data.gender,
                            address: data.address,
                            phone: data.phone
                        };

                        if (user.email && user.displayName) {
                            return axios.post('https://fithub-r8lw.onrender.com/new-user', userInfo)
                                .then(() => {
                                    setGlobalError('');
                                    navigate('/');
                                    return "Registration Successful!";
                                })
                                .catch(() => {
                                    setGlobalError('Registration failed. Please try again.');
                                });
                        }
                    }).catch((error) => {
                        setGlobalError(error.message);
                    });
                }
            }).catch((error) => {
                setGlobalError(error.message);
            });
        } else {
            setGlobalError('Image upload failed. Please try again.');
        }
    };

    const password = watch('password', '');

    return (
        <div className='flex justify-center items-center dark:bg-dark pt-14'>
            <div className='bg-white p-8 rounded-lg shadow-md dark:bg-dark2 dark:text-white'>
                <h2 className='text-3xl font-bold text-center mb-6'>Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center gap-5 '>
                        <div className='mb-4'>
                            <label htmlFor="name" className='block dark:text-gray-300 text-gray-700 font-bold mb-2'>
                                <FaRegUser className='inline-block mr-2 mb-1 text-lg'/>
                                Name
                            </label>
                            <input className='w-full dark:text-black border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary' type="text" placeholder='Enter your name' {...register("name", { required: true })}/>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="email" className='block dark:text-gray-300 text-gray-700 font-bold mb-2'>
                                <AiOutlineMail className='inline-block mr-2 mb-1 text-lg'/>
                                Email
                            </label>
                            <input className='w-full dark:text-black border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary' type="email" placeholder='Enter your Email' {...register("email", { required: true })}/>
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block dark:text-gray-300 text-gray-700 font-bold mb-2'>
                                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg'/>
                                Password
                            </label>
                            <input className='w-full dark:text-black border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary' type="password" placeholder='Enter your password' {...register("password", { required: true })}/>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="confirmpassword" className='block dark:text-gray-300 text-gray-700 font-bold mb-2'>
                                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg'/>
                                Confirm Password
                            </label>
                            <input className='w-full dark:text-black border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary' type="password" placeholder='Confirm password' {...register("confirmpassword", { required: true, validate: (value) => value === password || "Password does not match" })}/>
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='mb-4'>
                            <label htmlFor="phoneNumber" className='block dark:text-gray-300 text-gray-700 font-bold mb-2'>
                                <AiOutlinePhone className='inline-block mr-2 mb-1 text-lg'/>
                                Phone
                            </label>
                            <input className='w-full dark:text-black border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary' type="tel" placeholder='Enter your phone' {...register("phone", { required: true })}/>
                        </div>
                        <div className='mb-4'>
                        <label className='block dark:text-gray-300 text-gray-700 font-bold mb-2' htmlFor="image">
                            Course Thumbnail
                        </label>
                        <input type="file" required name='image' onChange={handleImageChange} className='block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500  file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4'/>
                    </div>
                    </div>

                    <div>
                        <div className='mb-4'>
                            <label htmlFor="gender" className='block dark:text-gray-300 text-gray-700 font-bold mb-2'>
                                <FaRegUser className='inline-block mr-2 mb-1 text-lg'/>
                                Gender
                            </label>
                            <select {...register('gender', { required: true })} className='w-full dark:text-black border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary'>
                                <option value="">Select Gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Others</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="address" className='block dark:text-gray-300 text-gray-700 font-bold mb-2'>
                                <FiMapPin className='inline-block mr-2 mb-1 text-lg'/>
                                Address
                            </label>
                            <textarea 
                            {...register('address', { required: true })} 
                            rows='3'
                            className='w-full border dark:text-black border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-secondary'
                            placeholder='Enter Address'
                            ></textarea>
                        </div>
                    </div>

                    <div className='text-center'>
                        <button type='submit' className='bg-secondary hover:bg-green-500 text-white py-2 px-4 rounded-md'>Register</button>
                        {globalError && (
                            <div className='text-red-500 text-sm w-full mt-1'>
                                <p>{globalError}</p>
                            </div>
                        )}
                    </div>
                </form>
                <p className='text-center mt-4'>
                    Already have an account? <Link to='/login' className='underline text-secondary ml-1'>Login</Link>
                </p>
                <GoogleLogin />
            </div>
        </div>
    );
};

export default Register;
