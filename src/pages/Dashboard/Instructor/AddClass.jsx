import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useUser from '../../../hooks/useUser';
import { CircleLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';



const KEY = import.meta.env.VITE_IMG_TOKEN;


const AddClass = () => {
    const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
    const axiosSecure = useAxiosSecure();
    const {currentUser, isLoading} = useUser();
    const [image, setImage] = useState(null);
    const Navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData);
        const newData = Object.fromEntries(formData);
        formData.append('file', image);


        fetch(API_URL, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(data => {
            console.log(data)
            if(data.success === true) {
                console.log(data.data.display_url);
                newData.image = data.data.display_url;
                newData.instructorName = currentUser?.name;
                newData.instructorEmail = currentUser?.email;
                newData.status = 'pending';
                newData.submitted = new Date();
                newData.totalEnrolled = 0;
                axiosSecure.post(`/new-class`, newData).then(res => {
                    toast.info('Successsfully added Class!')
                    console.log(res.data);
                    // Navigate('/dashboard/instructor-cp');

                })

            }
        })

    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    if(isLoading) {
        return <div className='flex justify-center items-center h-screen'>
            <CircleLoader color="#00A5CF" size={100}/>
            </div> } 

  return (
    <div>
        <ToastContainer position={toast.POSITION.TOP_CENTER}/>
        <div className='my-10'>
            <h1 className='text-center text-3xl font-bold'>Add Your Courses</h1>
        </div>

        <form onSubmit={handleSubmit} className='mx-auto p-6 bg-white rounded shadow'>
            <div className='grid grid-cols-2 w-full gap-3 items-center'>
                <div className='mb-6'>
                    <label className='block text-gray-700 font-bold mb-2' htmlFor="name">Course Name</label>
                    <input type="text" required placeholder='Your Course Name' name='name' id='name' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'/>
                </div>
                <div className='mb-6'>
                    <label className='block text-gray-700 font-bold mb-2' htmlFor="image">Course Thumbnail</label>
                    <input type="file" required name='image' onChange={handleImageChange} className='block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500  file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4'/>
                </div>
            </div>
            <div>
            <h1 className='text-[18px] my-2 ml-2 text-orange-600'>You cannot change your Name and Email</h1>
            <div className='grid grid-cols-2 w-full gap-3 items-center'>
                <div className='mb-6'>
                    <label htmlFor="instructorName" className='block text-gray-700 font-bold mb-2'>Instructor Name</label>
                    <input 
                        type="text" 
                        className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                        value={currentUser?.name}
                        readOnly
                        disabled
                        placeholder='Instructor Name'
                        name='instructorName'
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor="instructorEmail" className='block text-gray-700 font-bold mb-2'>Instructor Email</label>
                    <input 
                        title='You can not update your email'
                        type="email" 
                        className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                        value={currentUser?.email}
                        readOnly
                        disabled
                        name='instructorEmail'
                    />
                </div>
            </div>
            <div className='grid grid-cols-2 w-full gap-3 items-center'>
                <div className='mb-6'>
                    <label htmlFor="availableSeats" className='block text-gray-700 font-bold mb-2'>Available Seats</label>
                    <input 
                        type="number" 
                        className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                        required
                        placeholder='How many seats?'
                        name='availableSeats'
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor="price" className='block text-gray-700 font-bold mb-2'>Price</label>
                    <input 
                        placeholder='How much does it Cost ₹?'
                        type="number" 
                        required
                        className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                        name='price'
                    />
                </div>
            </div>
            </div>
            <div className='mb-6'>
                    <label htmlFor="link" className='block text-gray-700 font-bold mb-2'>YouTube Link</label>
                    <p className='text-[18px] my-2 ml-2 text-orange-600'>Only youtube videos are supported</p>
                    <input 
                        type="text" 
                        className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                        required
                        placeholder='Your Course intro video link'
                        name='videoLink'
                    />
            </div>
            <div className='mb-6'>
                <label htmlFor="description" className='block text-gray-700 font-bold mb-2'>Description about the Course</label>
                <textarea 
                name="description" 
                placeholder='Describe your course...' 
                rows={4} 
                className='resize-none border w-full p-2 rounded-lg border-secondary outline-none'></textarea>
            </div>

            <div className='text-center w-full'>
                <button
                    className='bg-secondary w-full hover:bg-green-500 duration-200 text-white font-bold py-2 px-4 rounded'
                    type='submit'
                >Add Course</button>
            </div>
        </form>
    </div>
  )
}

export default AddClass