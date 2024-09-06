import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';

const MyClasses = () => {
    const [classes, setClasses] = useState([]);
    const {currentUser, isLoading} = useUser();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        axiosSecure.get(`/classes/${currentUser?.email}`).then(res => {
            setClasses(res.data);
        }).catch((err) => console.log(err));
    }, [isLoading])

  return (
    <div>
        <div className='my-9'>
            <h1 className='text-4xl font-bold text-center'>My <span className='text-secondary'>Classes</span></h1>
            <div>
                <p className='mt-5 text-center text-gray-600'>Here you will find all the classes added by you.</p>
            </div>
        </div>

        <div>
            {
                classes.length === 0 ? <div className='text-center text-2xl font-bold mt-10'>You Dont have any Classes Yet</div>
                 : <div>
                    {
                        classes.map((cls, index) => (
                            <div key={index} className='mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg'>
                                <div className='bg-white flex rounded-lg gap-8 shadow p-4 items-center'>
                                    <div>
                                        <img src={cls.image} alt="" className='max-h-[200px] max-w-[300px] rounded-lg'/>
                                    </div>
                                    <div className='w-full'>
                                        <h1 className='text-[21px] font-bold text-secondary border-b pb-2 mb-2'>{cls.name}</h1>
                                        <div className='bg-white flex rounded-lg gap-8 shadow p-4'>
                                            <div>
                                                <h1 className='font-bold mb-3'>Some info : </h1>
                                                <h1 className='text-secondary my-2'>
                                                    <span className='text-black'>Total Student</span> : {" "}
                                                    {cls.totalEnrolled ? cls.totalEnrolled : 0}
                                                </h1>
                                                <h1 className='text-secondary my-2'>
                                                    <span className='text-black'>Total Seats</span> : {" "}
                                                    {cls.availableSeats}
                                                </h1>
                                                <h1 className='text-secondary my-2'>
                                                    <span className='text-black'>Status</span> : {" "}
                                                    <span
                                                        className={`font-bold ${
                                                            cls.status === "pending"
                                                            ? 'text-orange-500'
                                                            :cls.status === "checking"
                                                            ? 'text-yellow-500'
                                                            : cls.status === "approved"
                                                            ? 'text-green-500'
                                                            : 'text-red-500'
                                                        }`}
                                                    >
                                                        {cls.status}
                                                    </span>
                                                </h1>
                                            </div>
                                            <div>
                                                <h1 className='font-bold mb-3'>.....</h1>
                                                <h1 className='text-secondary my-2'>
                                                    <span className='text-black'>Prices</span> : {" "}
                                                    <span className='text-black'>₹</span> {cls.price} 
                                                </h1>
                                                <h1 className='my-2 text-secondary'>
                                                    <span className='text-black'>Submitted</span> : {" "}
                                                    <span className=''>
                                                        {
                                                            cls.submitted ? moment(cls.submitted).format('MMMM Do YYYY') : "Not get Data"
                                                        }
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className='w-1/3'>
                                                <h1 className='font-bold mb-3'>Action : </h1>
                                                <button 
                                                    className='px-3 mb-2 bg-orange-500 font-bold py-1 text-white w-full rounded-lg'
                                                    >View Feedback
                                                </button>
                                                <button 
                                                    className='px-3 mb-2 bg-green-500 font-bold py-1 text-white w-full rounded-lg'
                                                    >Details
                                                </button>
                                                <button 
                                                    className='px-3  bg-blue-500 font-bold py-1 text-white w-full rounded-lg'
                                                    >Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    </div>
  )
}

export default MyClasses