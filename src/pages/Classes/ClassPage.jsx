import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import useUser from '../../hooks/useUser';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';



import img from '../../assets/home/user.png';
import { DialogActions } from '@mui/material';
import { BiTime } from 'react-icons/bi';
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from 'react-icons/fa';
import { SiKnowledgebase } from "react-icons/si";
import { MdBookOnline } from 'react-icons/md';
import bannerImg from '../../assets/home/banner-4.jpg';




const ClassPage = () => {
    const course = useLoaderData();
    // console.log(course);
    const { currentUser } = useUser();
    // console.log(currentUser?.role);

    const role = currentUser?.role;
    const { enrolledClasses, setEnrolledClasses } = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    const handleSelect = async (id) => {
        if (!currentUser) {
          toast.warn('Please login first', { position: "top-center" });
          return navigate('/login');
        }
      
        try {
          // Fetch enrolled classes
          const enrolledClassesRes = await axiosSecure.get(`/enrolled-classes/${currentUser?.email}`);
          setEnrolledClasses(enrolledClassesRes.data);
      
          // Check if the class is already in the cart
          const cartItemRes = await axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`);
          if (cartItemRes.data.classId === id) {
            return toast.info("Already Selected");
          } else if (enrolledClassesRes.data.find(item => item.classes._id === id)) {
            return toast.info("Already Enrolled");
          }
      
          // Add to cart
          const data = {
            classId: id,
            userMail: currentUser?.email,
            date: new Date() 
          };
      
          await axiosSecure.post('/add-to-cart', data);
          toast.success('Successfully added to the cart!');
        } catch (err) {
          toast.error('Something went wrong!');
          console.error(err);
        }
      };


  return (
    
    <div>
    <ToastContainer />
    <div
    className='font-gilroy flex flex-col items-center font-medium text-gray dark:bg-dark dark:text-white text-lg leading-[27px] w-full mx-auto'
    data-new-gr-c-s-check-Loaded='14.1157.0'
    data-gr-ext-installed=''
    >
        <div className='mt-20 mb-28 pt-3 text-center'>
            <h1 className='text-4xl font-bold '><span className='text-secondary'>Course</span> Details</h1>
        </div>

        <div className='nav-tab-wrapper tabs section-padding mt-8 '>
            <div className='container'>
                <div className='grid grid-cols-12 md:gap-[30px]'>
                    {/* Left Side */}
                    <div className='lg:col-span-8 col-span-12'>
                        <div className='single-course-details'>
                            <div className='xl:h-[470px] h-[350px] mb-10 course-main-thumb'>
                                <img src={course?.image} alt="" className='rounded-md object-fill w-full h-full block' />
                            </div>
                            <h2 className='text-2xl mb-2'>{course?.name}</h2>

                            <div className='author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center'>
                                <div className='flex space-x-4 items-center group'>
                                    <div className='flex-none'>
                                        <div className='h-12 w-12 rounded'>
                                            <img src={img} alt="" className='object-cover w-full h-full rounded'/>
                                        </div>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-secondary '>
                                            Trainer 
                                            <a href="#" className='text-black dark:text-white'>
                                                : {course.instructorName}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <span className='text-secondary'>
                                        Last Update:
                                        <a href="#" className='text-black dark:text-white ml-1'>
                                            {new Date(course.submitted).toLocaleDateString()}
                                        </a>
                                    </span>
                                </div>
                            </div>

                            <div className='nav-tab-wrapper mt-22'>
                                <ul id='tabs-nav' className='course-tab mb-8'>
                                    <li className='active'>
                                        <a href="#tab1">Overview</a>
                                    </li>
                                    <li className='active'>
                                        <a href="#tab1">Carriculum</a>
                                    </li>
                                    <li className='active'>
                                        <a href="#tab1">Instructor</a>
                                    </li>
                                    <li className='active'>
                                        <a href="#tab1">Reviews</a>
                                    </li>
                                </ul>
                                <div id='tab1' className='tab-content'>
                                    <div>
                                        <h3 className='text-2xl mt-8'>Course Description</h3>
                                        <p className='mt-4'>
                                            {course?.description}
                                        </p>
                                        <div className='bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8'>
                                            <h4 className='text-2xl'>What will you Learn?</h4>
                                            <ul className='grid sm:grid-cols-2 grid-cols-1 gap-6'>
                                                <li className='flex space-x-3'>
                                                    <div className='flex-none relative top-1'>
                                                        <img src="/correct-mark.png" alt="" />
                                                    </div>
                                                    <div className='flex-1'>
                                                        Exercie Hacks you never knew
                                                    </div>
                                                </li>
                                                <li className='flex space-x-3'>
                                                    <div className='flex-none relative top-1'>
                                                        <img src="/correct-mark.png" alt="" />
                                                    </div>
                                                    <div className='flex-1'>
                                                        Exercie Hacks you never knew
                                                    </div>
                                                </li>
                                                <li className='flex space-x-3'>
                                                    <div className='flex-none relative top-1'>
                                                        <img src="/correct-mark.png" alt="" />
                                                    </div>
                                                    <div className='flex-1'>
                                                        Exercie Hacks you never knew
                                                    </div>
                                                </li>
                                                <li className='flex space-x-3'>
                                                    <div className='flex-none relative top-1'>
                                                        <img src="/correct-mark.png" alt="" />
                                                    </div>
                                                    <div className='flex-1'>
                                                        Exercie Hacks you never knew
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className='text-2xl'>What you will need?</h4>
                                            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5'>
                                                <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                                    <span className='flex-none'>
                                                        <img src="/logo.png" alt="" />
                                                    </span>
                                                    <span className='flex-1 text-black'>
                                                        Yoga matt
                                                    </span>
                                                </div>
                                                <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                                    <span className='flex-none'>
                                                        <img src="/logo.png" alt="" />
                                                    </span>
                                                    <span className='flex-1 text-black'>
                                                        Open Space
                                                    </span>
                                                </div>
                                                <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                                    <span className='flex-none'>
                                                        <img src="/logo.png" alt="" />
                                                    </span>
                                                    <span className='flex-1 text-black'>
                                                        Stretching band optional
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Right Side */}
                    <div className='lg:col-span-4 col-span-12 mt-8 md:mt-0'>
                        <div className='sidebarWrapper space-y-[30px]'>
                            <div className='widget custom-text space-y-5'>
                                {course?.videoLink && (
                                    <div className='h-[220px] rounded relative block'>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${new URL(course?.videoLink).searchParams.get('v')}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="rounded"
                                        ></iframe>
                                    </div>
                                )}
                                <h3 className='text-[40px] font-bold '>₹{course.price}</h3>
                                <button onClick={() => handleSelect(course._id)} title={role =='admin' || role === 'instructor' ? 'Instructor/Admin Can not be able to select' ? course.availableSeats < 1 : 'No Seat Available' : "You can select Classes"}
                                disabled={role === 'admin' || role === 'instructor' || course.availableSeats < 1}  className='btn bg-secondary btn-primary py-2 px-6 w-full rounded-md text-center text-white'>Enroll Now
                                </button>
                                <ul className='list'>
                                    <li className='flex space-x-3 border-b vorder-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                            <FaUser className='inline-flex'/>
                                            <div className='text-black dark:text-gray-300  font-semibold'>
                                                Instructor
                                            </div>
                                        </div>
                                        <div className='flex-none'>{course.instructorName}</div>
                                    </li>   
                                    <li className='flex space-x-3 border-b vorder-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                            <SiKnowledgebase className='inline-flex'/>
                                            <div className='text-black dark:text-gray-300 font-semibold'>
                                                Lectures
                                            </div>
                                        </div>
                                        <div className='flex-none'>23</div>
                                    </li>
                                    <li className='flex space-x-3 border-b vorder-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                            <FaUsers className='inline-flex'/>
                                            <div className='text-black dark:text-gray-300 font-semibold'>
                                                Enrolled
                                            </div>
                                        </div>
                                        <div className='flex-none'>{course.totalEnrolled}</div>
                                    </li>
                                    <li className='flex space-x-3 border-b vorder-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                            <BiTime className='inline-flex'/>
                                            <div className='text-black dark:text-gray-300 font-semibold'>
                                                Duration
                                            </div>
                                        </div>
                                        <div className='flex-none'>1Hr30Min</div>
                                    </li>
                                    <li className='flex space-x-3 border-b vorder-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                            <FaLevelUpAlt className='inline-flex'/>
                                            <div className='text-black dark:text-gray-300 font-semibold'>
                                                Course Level
                                            </div>
                                        </div>
                                        <div className='flex-none'>Beginner</div>
                                    </li>
                                    <li className='flex space-x-3 border-b vorder-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                                        <div className='flex-1 space-x-3 flex items-center'>
                                            <FaLanguage className='inline-flex'/>
                                            <div className='text-black dark:text-gray-300 font-semibold'>
                                                Language
                                            </div>
                                        </div>
                                        <div className='flex-none'>English/Hindi</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ClassPage