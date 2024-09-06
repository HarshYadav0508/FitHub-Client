import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { useLoaderData } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';


const UpdateUser = () => {
    const {user} = useAuth();
    const userCredentials = useLoaderData();
    console.log(userCredentials);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData);
        axiosSecure.put(`/update-user/${userCredentials?._id}`, updatedData).then(res => {
            if(res.data.modifiedCount > 0) {
                toast.info('User updated Successfully!');
            }
            console.log(res.data);
        }).catch(err => console.log(err))
    }

  return (
    <div>
            <ToastContainer position={toast.POSITION.TOP_CENTER} />
            <h1 className='text-center text-4xl font-bold mt-5'>
                Update : <span className='text-secondary'>{userCredentials?.name}</span>
            </h1>
            <section className=''>
                <div className='mx-auto px-4 py-16 sm:px-6 lg:px-8'>
                    <div className='rounded-lg bg-white p-8 shadow-lg lg:p-12'>
                        <form className='space-y-4' onSubmit={handleFormSubmit}>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label className='ml-2 pb-4' htmlFor="name">Name</label>
                                    <input 
                                        type="text"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='User Name'
                                        required
                                        defaultValue={userCredentials?.name || ''}
                                        id='name'
                                        name='name' />
                                </div>
                                <div>
                                    <label className='ml-2 pb-4' htmlFor="phone">Phone</label>
                                    <input 
                                        type="tel"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Phone Number'
                                        required
                                        defaultValue={userCredentials?.phone || ''}
                                        id='phone'
                                        name='phone' />
                                </div>
                            </div>
                            <h1>Please select a role</h1>
                            <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
                                <div>
                                    <input 
                                        className='peer sr-only'
                                        type="radio"
                                        value='user'
                                        defaultChecked={userCredentials?.role === 'user'}
                                        id='role-user'
                                        name='option' />
                                    <label 
                                        className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'
                                        tabIndex={0} 
                                        htmlFor="role-user">
                                        <span className='text-sm font-medium'>User</span>
                                    </label>
                                </div>
                                <div>
                                    <input 
                                        className='peer sr-only'
                                        type="radio"
                                        value='admin'
                                        defaultChecked={userCredentials?.role === 'admin'}
                                        id='role-admin'
                                        name='option' />
                                    <label 
                                        className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'
                                        tabIndex={0} 
                                        htmlFor="role-admin">
                                        <span className='text-sm font-medium'>Admin</span>
                                    </label>
                                </div>
                                <div>
                                    <input 
                                        className='peer sr-only'
                                        type="radio"
                                        value='instructor'
                                        defaultChecked={userCredentials?.role === 'instructor'}
                                        id='role-instructor'
                                        name='option' />
                                    <label 
                                        className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'
                                        tabIndex={0} 
                                        htmlFor="role-instructor">
                                        <span className='text-sm font-medium'>Instructor</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className='ml-2 pb-4' htmlFor="message">Message</label>
                                <textarea 
                                    placeholder='About user'
                                    rows={4}
                                    className='w-full resize-none rounded-lg border-secondary border outline-none p-3 mt-3 text-sm'
                                    defaultValue={userCredentials?.about || ''}
                                    name="about" 
                                    id="message"
                                ></textarea>
                            </div>
                            <div className='mt-4 text-center'>
                                <button type='submit' className='inline-block w-full rounded-lg bg-secondary px-5 py-3 font-medium text-white sm:w-auto'>
                                    Update User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default UpdateUser