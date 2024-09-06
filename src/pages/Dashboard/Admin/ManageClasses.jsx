import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Pagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';



const ManageClasses = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginated, setPaginated] = useState([]);
  const itemPerPage = 5;
  const totalPage = Math.ceil(classes.length / itemPerPage);

  useEffect(() => {
    axiosFetch.get('/classes-manage').then(res => setClasses(res.data)).catch(err => console.log(err))
  },[])
  
  useEffect(() => {
    let lastIndex = page* itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    if(lastIndex > classes.length) {
      lastIndex = classes.length;
    }
    const currentData = classes.slice(firstIndex, lastIndex);
    setPaginated(currentData)
  }, [page, totalPage])

  const handleChange = (event, value) => {setPage(value)}
  
  const handleApprove = (id) => {
    axiosSecure.patch(`/class-status/${id}`, { status: 'approved' })
    .then(res => {
      console.log(res.data);
      toast.info("Course Approved Successfully!");
      const updatedClasses = classes.map(cls => cls._id === id ? { ...cls, status: 'approved' } : cls);
      setClasses(updatedClasses);
      window.location.reload();
    })
    .catch(err => console.log(err));
}

const handleReject = async (id) => {
  try {
      const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, unpublish it!"
      });

      if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/class-status/${id}`, { status: 'rejected' });

          if (res.data.modifiedCount > 0) {
              const updatedClasses = classes.map(cls => cls._id === id ? { ...cls, status: 'rejected' } : cls);
              setClasses(updatedClasses);

              Swal.fire({
                  title: "Unpublished!",
                  text: "Course is removed",
                  icon: "success"
              });

              // Refresh the page
              window.location.reload();
          }
      }
  } catch (err) {
      console.log(err);
  }
}

 
  return (
    <div>
      <ToastContainer position={toast.POSITION.TOP_CENTER}/>
      <h1 className='text-4xl text-secondary font-bold text-center my-10'>Manage <span className='text-black'>Classes</span></h1>
      <div className=''>
        <div className='flex flex-col'>
          <div className='overflow-x-auto sm:mx-6 lg:mx-8'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className='overflow-hidden'>
                <table className='min-w-full text-left text-sm font-light'>
                  <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr>
                        <th scope='col' className='px-6 py-4'>PHOTO</th>
                        <th scope='col' className='px-6 py-4'>COURSE NAME</th>
                        <th scope='col' className='px-6 py-4'>INSTRUCTOR NAME</th>
                        <th scope='col' className='px-6 py-4'>STATUS</th>
                        <th scope='col' className='px-6 py-4'>DETAILS</th>
                    </tr>
                </thead>

                <tbody>
                    { 
                        classes.length === 0 ? <tr className=''>
                        <td colSpan={6} className='text-center text-2xl font-bold'>No class found</td>
                    </tr>  :  
                    paginated.map((cls, index) => {
                        return <tr 
                                  key={cls._id}
                                  className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'
                                  >
                                <td className='py-4 whitespace-nowrap px-6'>
                                  <img src={cls.image} className='h-[35px] w-[35px] rounded-lg' alt="" />
                                </td>
                                <td className='py-4 whitespace-nowrap px-6'>
                                    {cls.name}
                                </td>
                                <td className='py-4 whitespace-nowrap px-6'>{cls.instructorName}</td>
                                <td className='py-4 whitespace-nowrap px-6'>
                                  <span
                                      className={`font-bold ${
                                          cls.status === "pending"
                                          ? 'text-orange-500'
                                          :cls.status === "checking"
                                          ? 'text-yellow-500'
                                          : cls.status === "approved"
                                          ? 'text-green-500'
                                          : 'text-red-500'
                                      } px-2 py-1 uppercase rounded-xl`}
                                  >
                                      {cls.status}
                                  </span>
                                </td>
                                <td className='py-4 whitespace-nowrap px-6'>
                                  <div className='flex gap-2'>
                                      {
                                        <button
                                          onClick={() => handleApprove(cls._id)}
                                          className='text-[12px] cursor-pointer disabled:bg-green-700 bg-green-500 py-1 rounded-md px-2 text-white'
                                        >
                                          Approve
                                        </button>
                                      }
                                      {
                                        <button
                                          disabled={
                                            cls.status === 'rejected' || cls.status === 'checking'
                                          }
                                          onClick={() => handleReject(cls._id)}
                                          className='cursor-pointer disabled:bg-red-700 bg-red-500 py-1 rounded-md px-2 text-white'
                                        >
                                          Deny
                                        </button>
                                      }
                                      
                                  </div>
                                </td>
                            </tr>
                    })
                    }
                </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div>
          <div className='w-full h-full flex justify-center items-center my-10'>
              <Pagination onChange={handleChange} count={totalPage} color='secondary' />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ManageClasses