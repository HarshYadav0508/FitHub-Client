import React from 'react'
import useUser from '../../../hooks/useUser'
import welcomImg from '../../../assets/dashboard/welcome.png'


const StudentCP = () => {
    const {currentUser} = useUser();
  return (
    <div className='h-screen flex  justify-center items-center'>
        
            <div className='flex flex-col items-center'>
                <img src={welcomImg} alt="" className='h-[500px]'/>
                <h1 className='text-4xl capitalize font-bold text-center'>Hi,<span className='text-secondary items-stretch'>{currentUser?.name}</span> Welcome to your Dashboard!
                </h1>
                <p className='text-center text-base mt-4 mx-auto max-w-[600px] text-gray-700'>This is your one-stop dashboard where you can view your enrolled courses, payment history, and even apply to join our team of awesome instructors.
                </p>
            </div>
        
    </div>
  )
}

export default StudentCP