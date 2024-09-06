import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import { BiHomeAlt } from 'react-icons/bi';
import { FaUser, FaUsers } from 'react-icons/fa';
import { BsFillPostcardFill } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { MdExplore, MdOfflineBolt, MdPayments, MdPendingActions } from 'react-icons/md';
import { SlUserFollowing } from "react-icons/sl";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { BiSelectMultiple } from "react-icons/bi";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Scroll from '../hooks/useScroll';
import { CircleLoader } from 'react-spinners';



const adminNavItems = [
    {to: '/dashboard/admin-home', icon: <BiHomeAlt className='text-2xl' />, label: 'Dashboard Home'},
    {to: '/dashboard/manage-users', icon: <FaUsers className='text-2xl' />, label: 'Manage Users'},
    {to: '/dashboard/manage-class', icon: <BsFillPostcardFill className='text-2xl' />, label: 'Manage Class'},
    {to: '/dashboard/manage-applications', icon: <FaWpforms className='text-2xl' />, label: 'Applications'}
];

const instructorNavItem = [
    {to: '/dashboard/instructor-cp', icon: <BiHomeAlt className='text-2xl' />, label: 'Home'},
    {to: '/dashboard/add-class', icon: <MdExplore className='text-2xl' />, label: 'Add a class'},
    {to: '/dashboard/my-classes', icon: <BsFillPostcardFill className='text-2xl' />, label: 'My Classes'},
    {to: '/dashboard/my-pending', icon: <MdPendingActions className='text-2xl' />, label: 'Pending Classes'},
    {to: '/dashboard/my-approved', icon: <IoMdDoneAll className='text-2xl' />, label: 'Approved Class'},
];

const students = [
    {to: '/dashboard/student-cp', icon: <BiHomeAlt className='text-2xl' />, label: 'Dashboard'},
    {to: '/dashboard/enrolled-class', icon: <SiGoogleclassroom className='text-2xl' />, label: 'My Enroll'},
    {to: '/dashboard/my-selected', icon: <BiSelectMultiple className='text-2xl' />, label: 'My Selected'},
    {to: '/dashboard/my-payments', icon: <MdPayments className='text-2xl' />, label: 'Payment history'},
    {to: '/dashboard/apply-instructor', icon: <SiInstructure className='text-2xl' />, label: 'Apply for instructor'},
];


const secondMenuItems = [
    {
        to: '/',
        icon: <BiHomeAlt className='text-2xl' />, 
        label: 'Home'
    }
];

const DashboardLayout = () => {
    const [open, setOpen] = useState(true);
    const {loader, logout} = useAuth();
    const { currentUser } = useUser();
    const navigate = useNavigate();
    const role = currentUser?.role;

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout"
          }).then((result) => {
            if (result.isConfirmed) {
                logout().then(
                    Swal.fire({
                    title: "Logged Out",
                    text: "You have been Logged out",
                    icon: "success"
                  })).catch((err) => console.log(err))
            }
            navigate('/')
          });
    }

    // const role = 'user';

    if(loader) {
        return <div className='flex justify-center items-center h-screen'>
            <CircleLoader color="#00A5CF" size={100}/>
            </div>
    }

  return (
    <div className='flex'>
        <div className={`${open ? 'w-72 overflow-y-auto' : 'w-[90px] overflow-auto'} bg-[#E2F2F3] h-screen p-5 md:block hidden pt-8 relative duration-300`}>
            <div className='flex gap-x-4 items-center'>
                <img onClick={() => setOpen(!open)} src="/fithub-logo.png" alt="" className={`cursor-pointer rounded-full h-[40px] duration-500 ${open && 'rotate-[360deg]'}`}/>
                <Link to='/'>
                    <h1 onClick={() => setOpen(!open)} className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && 'scale-0'}`}>
                        FitHub
                    </h1>
                </Link>
                
            </div>

            {/* Navlinks */}
            {
                role === 'admin' && <ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && 'hidden'}`}><small>MENU</small></p>
                    {
                        role === 'admin' && adminNavItems.map((menuItem, index) => (
                            <li key={index} className='mb-2'>
                                <NavLink 
                                to={menuItem.to}
                                className={({isActive}) => 
                                                        `flex ${isActive ? 'bg-[#FF351F] text-white' : 'text-[#413F44]'} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 mb-1`}>{menuItem.icon}
                                    <span className={` cursor-pointer font-semibold origin-left  duration-200 ${!open && 'hidden'}`}>{menuItem.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            }

            {/* Instructor */}
            {
                role === 'instructor' && <ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && 'hidden'}`}><small>MENU</small></p>
                    {
                        role === 'instructor' && instructorNavItem.map((menuItem, index) => (
                            <li key={index} className='mb-2'>
                                <NavLink 
                                to={menuItem.to}
                                className={({isActive}) => 
                                                        `flex ${isActive ? 'bg-[#FF351F] text-white' : 'text-[#413F44]'} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 mb-1`}>{menuItem.icon}
                                    <span className={`cursor-pointer font-semibold origin-left  duration-200 ${!open && 'hidden'}`}>{menuItem.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            }

            {/* Students */}
            {
                role === 'user' && <ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && 'hidden'}`}><small>MENU</small></p>
                    {
                        role === 'user' && students.map((menuItem, index) => (
                            <li key={index} className='mb-2'>
                                <NavLink 
                                to={menuItem.to}
                                className={({isActive}) => 
                                                        `flex ${isActive ? 'bg-[#FF351F] text-white' : 'text-[#413F44]'} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 mb-1`}>{menuItem.icon}
                                    <span className={`cursor-pointer font-semibold origin-left  duration-200 ${!open && 'hidden'}`}>{menuItem.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            }

            {/* MORE SECTION */}

            <ul className='pt-6'>
                <p className={`ml-3 text-gray-500 uppercase ${!open && 'hidden'}`}><small>MORE</small></p>
                {
                        secondMenuItems.map((menuItem, index) => (
                            <li key={index} className='mb-2'>
                                <NavLink 
                                to={menuItem.to}
                                className={({isActive}) => 
                                                        `flex ${isActive ? 'bg-[#FF351F] text-white' : 'text-[#413F44]'} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 mb-1`}>{menuItem.icon}
                                    <span className={` cursor-pointer font-semibold origin-left  duration-200 ${!open && 'hidden'}`}>{menuItem.label}</span>
                                </NavLink>
                            </li>
                        ))
                }

                <li>
                <NavLink 
                    
                    onClick={() => handleLogout()}
                    className={`flex duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4 mb-1`}>
                        <RiLogoutBoxLine  className='text-2xl'/>
                        <span className={`cursor-pointer font-semibold origin-left  duration-200 ${!open && 'hidden'}`}>Logout</span>
                </NavLink>
                </li>
            </ul>
        </div>
        <div className='h-screen overflow-y-auto px-8 flex-1'>
            <Scroll />
            <Outlet />
        </div>
    </div>
  )
}

export default DashboardLayout