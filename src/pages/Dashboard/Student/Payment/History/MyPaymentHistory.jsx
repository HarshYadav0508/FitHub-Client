import React, { useEffect, useState } from 'react'
import useAxiosFetch from  '../../../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useUser from '../../../../../hooks/useUser';
import { CircleLoader } from 'react-spinners';


const MyPaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const {currentUser} = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setpaginatedPayments] = useState([]);
  const totalItem = payments.length;
  const [page, setPage] = useState(1);
  let totalPage = Math.ceil(totalItem / 5);
  let itemsPerPage = 5;


  const handleChange = (event, value) => {
    setPage(value);
  }

  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = payments.slice(firstIndex, lastIndex);
    setpaginatedPayments(currentItems)
  }, [page, payments])

  useEffect(() => {
    if (currentUser && currentUser.email) {
      axiosFetch.get(`/payment-history/${currentUser.email}`)
        .then(res => {
          setPayments(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [currentUser, axiosFetch]);

  const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  if(loading) {
    return <div className='flex justify-center items-center h-screen'>
        <CircleLoader color="#00A5CF" size={100}/>
        </div>
}
console.log(currentUser)

  return (
    <div>
      <div className='text-center mt-6 mb-16'>
        <p className='text-gray-400'>Hey, <span className='text-secondary text-bold'>{currentUser.name}</span> Welcome!</p>
        <h1 className='text-4xl font-bold'>Your <span className='text-secondary'>Payment</span> History</h1>
      </div>
      {/* TABLE */}
      <div>
        <div>
          <p className='font-bold'>Total Payments : {payments.length}</p>
          <p className='font-bold'>Total Paid Amount : {totalPaidAmount}</p>
        </div>

        <div>
        <div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Class ID</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.map((payment, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{index + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4">₹{payment.amount}</td>
                  <td className="whitespace-nowrap px-6 py-4">{payment.classesId}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>    
          </table>
        </div>
      </div>
      </div>
    </div>
  )
}

export default MyPaymentHistory