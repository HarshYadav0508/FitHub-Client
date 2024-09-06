import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import bgImg from '../../../assets/home/banner-5.jpg'
import { AuthContext } from '../../../utilities/providers/AuthProvider';

const Hero = () => {
    const { user } = useContext(AuthContext); 
  const isLoggedIn = !!user;

  
  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage: `url(${bgImg})`}}>
        <div className='min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60'>
            <div>
                <div className='space-y-4'>
                    <p className='md:text=4xl text-3xl'>We Provide</p>
                    <h1 className='md:text-7xl text-4xl font-bold'>Best Workout Courses Online</h1>
                    <div className='md:w-1/2'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex animi, eos, beatae quaerat voluptatum eaque officiis deserunt tempore odit necessitatibus veniam accusantium ullam, dicta quam voluptates? Unde ipsum quis dignissimos.</p>
                    </div>
                    <div className='flex flex-wrap items-center gap-5'>
                        <Link to="/register">
                            <button
                            className={`px-7 py-3 rounded-lg ${isLoggedIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary'} font-bold uppercase`}
                            disabled={isLoggedIn}
                            >
                            Join Today
                            </button>
                        </Link>
                        <Link to='/classes'>
                            <button className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase'>View Courses</button>
                        </Link>
                        
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Hero