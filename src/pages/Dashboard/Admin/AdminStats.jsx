import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers } from "react-icons/fa";
import { GiStamper } from "react-icons/gi";
import { MdPendingActions } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";

const AdminStats = ({users}) => {
    const [data,setData] = useState();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get('/admin-stats').then(res => setData(res.data)).catch(err => console.log(err))
    }, [])
    console.log(data);
  return (
    <div>
        <div className='flex gap-10 justify-start mt-10'>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-green-400'>
                    <FaUsers className='text-white text-lg'/>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Total Members</h3>
                    <p className='text-3xl'>{users?.length}</p>
                </div>
            </div>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-blue-400'>
                    <GiStamper className='text-white text-lg'/>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Approved Classes</h3>
                    <p className='text-3xl'>{data?.approvedClasses}</p>
                </div>
            </div>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-purple-400'>
                    <FaChalkboardTeacher className='text-white text-lg'/>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Instructors</h3>
                    <p className='text-3xl'>{data?.instructors}</p>
                </div>
            </div>
            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-orange-400'>
                    <MdPendingActions className='text-white text-lg'/>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Pending classes</h3>
                    <p className='text-3xl'>{data?.pendingClasses}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminStats