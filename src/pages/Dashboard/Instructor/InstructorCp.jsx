import React from 'react'
import welcomImg from '../../../assets/dashboard/welcome.png'
import useUser from '../../../hooks/useUser'


const InstructorCp = () => {
    const {currentUser} = useUser();
    return (
      <div className='h-screen flex  justify-center items-center'>
          
              <div className='flex flex-col items-center'>
                  <img src={welcomImg} alt="" className='h-[500px]'/>
                  <h1 className='text-4xl capitalize font-bold text-center'>Hi,<span className='text-secondary items-stretch'>{currentUser?.name}</span> Welcome to FitHub Team as Instructor.
                  </h1>
                  <p className='text-center text-base mt-4 mx-auto max-w-[600px] text-gray-700'>This is your all-in-one dashboard where you can explore your courses, manage them and take the next step by creating your own course. Share your expertise and contribute to the growing FitHub community!
                  </p>
              </div>
          
      </div>
    )
}

export default InstructorCp