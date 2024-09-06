import React, { useState, useEffect } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import axios from 'axios';
import img from '../../../assets/home/user.png';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const PopularTeacher = () => {
    const axiosFetch = useAxiosFetch(); 
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        axiosFetch.get('popular-instructors')
            .then(response => {
                setInstructors(response.data); 
            })
            .catch(error => {
                console.error('Error fetching popular instructors:', error);
            });
    }, [axiosFetch]);

    // console.log(instructors);
  return (
    <div className='md:w-[80%] mx-auto my-36'>
            <div>
                <h1 className='text-5xl font-bold text-center'>
                    Our <span className='text-secondary'>Best</span> Instructors
                </h1>
                <div className='w-[40%] text-center mx-auto my-4'>
                    <p className='text-gray-500'>
                        Explore our most popular classes, chosen based on enrollment and user favorites!
                    </p>
                </div>
            </div>
           {
            instructors ? (
                <div className='grid md:grid-cols-2 lg:grid-cols-4 w-[95%] gap-4 mx-auto'>
                    {
                        instructors?.slice(0,4).map((instructor, i ) => (
                            <div key={i} className='flex dark:bg-dark2 dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md'>
                                <div className='flex-col flex gap-6 md:gap-8'>
                                    <img className='rounded-full border-4 border-gray-300 h-24 w-24 mx-auto' src={instructor?.instructor?.photoURL || `${img}`} />

                                    <div className='flex flex-col text-center'>
                                        <p className='font-medium text-lg dark:text-white text-gray-800'>{instructor?.instructor?.name}</p>
                                        <p className='text-gray-500 whitespace-nowrap'>Instructor</p>
                                        <p className='text-gray mb-4 whitespace-nowrap'>Total Students : {instructor?.totalEnrolled}</p>
                                        <div className='flex justify-center items-center gap-4'>
                                                <FaInstagram className='text-secondary text-xl' />
                                                <FaFacebook className='text-secondary text-xl' />
                                                <FaTwitter className='text-secondary text-xl' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            ) : <><p>No Instructors Available</p></>
           }
        </div>
  )
}

export default PopularTeacher