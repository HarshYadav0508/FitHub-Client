import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Transition } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';




const Classes = () => {

  const [classes, setClasses] = useState([]);
  const {currentUser} = useUser();
  // console.log('Current user: ', currentUser);
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const navigate = useNavigate();

  const [hoveredCard, setHoveredCard] = useState(null);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
 

  // const {user} = useContext(AuthContext);
  // console.log("The Current user:", user);

  const handleHover = (index) => {
    setHoveredCard(index);
  }
  useEffect(() => {
    axiosFetch.get('/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching popular instructors:', error);
      });
  }, []);

 
  // console.log(classes);

  const handleSelect = (id) => {
    

    axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => setEnrolledClasses(res.data))
      .catch((err) => console.log(err));
    
    if (!currentUser) {
      toast.warn('Please login first', { position: "top-center" });
      return navigate('/login');
    }
  
    axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`)
      .then(res => {
        if (res.data.classId === id) {
          return toast.info("Already Selected");
        } else if (enrolledClasses.find(item => item.classes._id === id)) {
          return toast.info("Already Enrolled");
        } else {
          const data = {
            classId: id,
            userMail: currentUser?.email,
            date: new Date()  // Corrected the property name 'data' to 'date'         
          };
  
          axiosSecure.post('/add-to-cart', data)
            .then(res => {
              toast.success('Successfully added to the cart!');
              console.log(res.data);
            });
        }
      })
      .catch((err) => {
        toast.error('Something went wrong!');
        console.log(err);
      });
  }

  return (
    <div className='dark:bg-dark dark:text-white'>
  <ToastContainer />
  <div className='mt-20 pt-3'>
    <h1 className='text-4xl font-bold text-center text-secondary'>Classes</h1>
  </div>
  <div className='py-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
    {classes.map((cls, index) => (
      <div
        key={index}
        className={`relative flex flex-col  hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 min-h-[350px] mx-auto ${cls.availableSeats < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-dark2 rounded-lg shadow-lg overflow-auto cursor-pointer`}
        onMouseEnter={() => handleHover(index)}
        onMouseLeave={() => handleHover(null)}
      >
        <div className='relative h-48'>
          <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-60' : ''}`} />
          <img src={cls.image} className='object-cover w-full h-full' />
          <Transition
            show={hoveredCard === index}
            enter='transition-opacity duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='absolute inset-0 flex items-center justify-center'>
              <button
                onClick={() => handleSelect(cls._id)}
                title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin Cannot Select' : cls.availableSeats < 1 ? 'No Seat Available' : "You can select Classes"}
                disabled={role === 'admin' || role === 'instructor' || cls.availableSeats < 1}
                className='px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded-lg hover:bg-yellow-500'
              >
                Add to Cart
              </button>
            </div>
          </Transition>
        </div>
        {/* {Details} */}
        <div className='px-6 py-2'>
          <h3
            className='font-bold text-lg truncate max-w-full'
            title={cls.name}
          >
            {cls.name}
          </h3>
          <p className='text-sm'>Instructor: {cls.instructorName}</p>
          <div className='flex items-center justify-between mt-4'>
            <span className='text-gray-600 text-xs dark:text-gray-300'>Available Seats: {cls.availableSeats}</span>
            <span className='text-green-500 font-semibold'>₹{cls.price}</span>
          </div>
          <Link to={`/class/${cls._id}`}>
            <button className='px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded-lg hover:bg-green-500'>
              View
            </button>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>
  )
}

export default Classes