import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUser from '../../../../hooks/useUser';
import { Link } from 'react-router-dom';

const EnrolledClasses = () => {
  const [data, setData] = useState([]);
  const axioSecure = useAxiosSecure();
  const {currentUser} = useUser();

  useEffect (() => {
    axioSecure.get(`/enrolled-classes/${currentUser?.email}`)
    .then(res => {
      setData(res.data);
    }).catch(err => console.log(err))
  }, [])

  return (
    <div>
  <h1 className='text-2xl my-6 text-center font-bold'><span className='text-secondary'>Enrolled</span> Classes</h1>
  <div className='grid md:grid-cols-2 gap-6 grid-cols-1 lg:grid-cols-3'>
    {data.map((item, index) => (
      <div
        key={index}
        className='bg-white shadow-md mx-6 rounded-3xl flex flex-col md:flex-row items-stretch overflow-hidden sm:h-auto sm:w-4/5'
      >
        <img
          src={item.classes.image}
          alt=""
          className='h-52 md:h-auto w-full md:w-1/2 object-cover'
        />
        <div className='flex-1 w-full flex flex-col justify-around p-6'>
          <div>
            <h1 className='text-xl font-bold'>{item.classes.name}</h1>
            <p className='text-sm text-gray-500 font-bold'>By: {item.classes.instructorName}</p>
          </div>
          <div className='flex items-center gap-3 mt-3'>
            <p className='font-bold text-gray-500'>₹{item.classes.price}</p>
            <Link to='/dashboard/course-details'>
              <button className='bg-secondary font-bold rounded-xl text-white px-4 py-2 shadow-md'>
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default EnrolledClasses