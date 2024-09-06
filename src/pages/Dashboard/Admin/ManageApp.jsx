import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';

const ManageAppliedInstructors = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [appliedInstructors, setAppliedInstructors] = useState([]);

  useEffect(() => {
    axiosFetch.get('/applied-instructors')
      .then(res => setAppliedInstructors(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleMakeInstructor = (id) => {
    axiosSecure.patch(`/update-user-role/${id}`, { role: 'instructor' })
        .then(res => {
            if (res.data.message === 'User role updated successfully') {
                toast.success('User role updated to Instructor!');
                setAppliedInstructors(appliedInstructors.filter(instructor => instructor._id !== id)); // Optionally update the UI
            } else {
                toast.warn('No changes made');
            }
        })
        .catch(err => {
            toast.error('Failed to update role');
            console.log(err);
        });
  };

  const handleDelete = (id) => {
    axiosSecure.delete(`/delete-applied-instructor/${id}`)
        .then(res => {
            if (res.data.message === 'Instructor Application Removed!') {
                toast.success('Applied instructor removed!');
                setAppliedInstructors(appliedInstructors.filter(instructor => instructor._id !== id)); // Update the UI
            } else {
                toast.warn('Instructor not found');
            }
        })
        .catch(err => {
            toast.error('Failed to remove instructor');
            console.log(err);
        });
  };

  return (
    <div>
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
      <h1 className='text-center text-4xl font-bold my-7'>Manage <span className='text-secondary'>Applied Instructors</span></h1>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full text-left text-sm font-light'>
                <thead className='border-b font-medium dark:border-neutral-500'>
                  <tr>
                    <th scope='col' className='px-6 py-4'>#</th>
                    <th scope='col' className='px-6 py-4'>Name</th>
                    <th scope='col' className='px-6 py-4'>Email</th>
                    <th scope='col' className='px-6 py-4'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedInstructors.map((instructor, index) => (
                    <tr key={instructor._id} className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                      <td className='whitespace-nowrap px-6 py-4 font-medium'>{index + 1}</td>
                      <td className='whitespace-nowrap px-6 py-4'>{instructor.name}</td>
                      <td className='whitespace-nowrap px-6 py-4'>{instructor.email}</td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <button
                          onClick={() => handleMakeInstructor(instructor._id)}
                          className='bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600'>
                          Make Instructor
                        </button>
                        <button
                          onClick={() => handleDelete(instructor._id)}
                          className='bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 ml-2'>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ManageAppliedInstructors;
