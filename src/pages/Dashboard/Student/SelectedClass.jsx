import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { CircleLoader } from 'react-spinners';
import moment from 'moment';
import { MdDelete } from 'react-icons/md';
import { FaRupeeSign } from "react-icons/fa";
import Swal from 'sweetalert2';



const SelectedClass = () => {
    const { currentUser } = useUser();
    const [loader, setLoader] = useState(true);
    const [classes, setClasses] = useState([]);
    const [paginatedData, setPaginatedData] = useState([]);
    const [page, setPage] = useState(1);
    const itemPerPage = 5;
    const totalPage = Math.ceil(classes.length / itemPerPage);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/cart/${currentUser?.email}`)
        .then((res) => {
            setClasses(res.data);
            setLoader(false);
        })
        .catch((err) => {
            console.log(err)
            setLoader(false);
        }) 
    }, []);

    const totalPrice = classes.reduce((acc, item) => acc + parseInt(item.price), 0 );
    const totalTax = totalPrice* 0.01;
    const price = totalPrice + totalTax;

    const handlePay = (id) => {
        // console.log(id);
        const item = classes.find((item) => item._id === id);
        const price = item.price;
        // console.log(price);
        navigate('/dashboard/user/payment', { state: { price: price, itemId: id}})
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-cart-item/${id}`)
                    .then((res) => {
                        if (res.data.deleteCount > 0) { 
                            Swal.fire({
                                title: "Deleted",
                                text: "Class deleted from the cart",
                                icon: "success"
                            });
                            const newClasses = classes.filter((item) => item._id !== id);
                            setClasses(newClasses);
                            window.location.reload();
                        }
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    if(loader) {
        return <div className='flex justify-center items-center h-screen'>
            <CircleLoader color="#00A5CF" size={100}/>
            </div>
    }

  return (
    <div>
        <div className='my-6'>
            <h1 className='text-4xl text-center font-bold'>My <span className='text-secondary'>Selected</span> Classes</h1>
        </div>

        <div className='h-screen py-8'>
            <div className='container mx-auto px-4'>
                <h2 className='text-2xl font-semibold mb-4'>Cart</h2>
                <div className='flex flex-col md:flex-row gap-4'>

                    {/* LEFT SECTION */}
                    <div className='md:w-3/4'>
                        <div className='bg-white rounded-lg shadow-md p-6 mb-4'> 
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='text-left font-semibold'>#</th>
                                        <th className='text-left font-semibold'>Product</th>
                                        <th className='text-left font-semibold'>Price</th>
                                        <th className='text-left font-semibold'>Date</th>
                                        <th className='text-left font-semibold'>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        classes.length === 0 ? <tr className=''>
                                        <td colSpan={5} className='text-center text-2xl font-bold'>No class found</td>
                                    </tr> : 
                                    classes.map((item, index) => {
                                        const letindex = (page - 1)*itemPerPage+index+1;
                                        return <tr key={item._id}>
                                                <td className='py-4'>{letindex}</td>
                                                <td className='py-4'>
                                                    <div className='flex items-center'>
                                                        <img src={item.image} className='h-16 w-16 mr-4 rounded-md'/>
                                                        <span>{item.name}</span>
                                                    </div>
                                                </td>
                                                <td>₹{item.price}</td>
                                                <td className='py-4'>
                                                    <p className='text-green-700 text-sm'>
                                                        {moment(item.submitted).format('MMMM do YYYY')}
                                                    </p>
                                                </td>
                                                <td className='py-4 flex pt-8 gap-2'>
                                                    <button onClick={() => handleDelete(item._id)} className='px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold'>
                                                        <MdDelete />
                                                    </button>
                                                    <button onClick={() => handlePay(item._id)} className='px-3 py-1 cursor-pointer bg-green-500 rounded-3xl text-white font-bold flex items-center'><FaRupeeSign className='mr-2'/>PAY</button>
                                                </td>
                                            </tr>
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className='md:w-1/5 fixed right-3'>
                        <div className='bg-white rounded-lg shadow-md p-6'>
                            <h2 className='text-lg font-semibold mb-4'>Summary</h2>
                            <div className=' flex justify-between mb-2'>
                                <span>Subtotal</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className='flex justify-between mb-2'>
                                <span>Taxes</span>
                                <span>₹{totalTax.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between mb-2'>
                                <span>Extra Fees</span>
                                <span>₹0</span>
                            </div>
                            <hr className='my-2' />

                            <div className='flex justify-between mb-2'>
                                <span className='font-semibold'>Total</span>
                                <span className='font-semibold'>₹{price.toFixed(2)}</span>
                            </div>
                            <button disabled= {price <= 0} onClick={() => navigate('/dashboard/user/payment', {state: { price: price, itemId: null }})} className='bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full'>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SelectedClass