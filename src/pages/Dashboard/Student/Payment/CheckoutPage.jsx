import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { color } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import useUser from '../../../../hooks/useUser'
import { Navigate } from 'react-router-dom'

const CheckoutPage = ({price, cartItem}) => {
    const URL = `https://fithub-r8lw.onrender.com/payment-info?${cartItem&&`classId=${cartItem}`}`
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const { currentUser, isLoading} = useUser();
    const [clientSecret, setClientSecret] = useState('');
    const [succeeded, setSucceeded] = useState('');
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState([]);


    if(price < 0 || !price) {
        return <Navigate to='/dashboard/my-selected' replace />
    }

    useEffect(() => {
        if (!isLoading && currentUser?.email) { // Check if currentUser and email are available
            axiosSecure.get(`/cart/${currentUser.email}`)
                .then((res) => {
                    const classesId = res.data.map(item => item._id);
                    setCart(classesId);
                })
                .catch((err) => console.log(err));
        }
    }, [currentUser, isLoading, axiosSecure]);

    // console.log(cart)
    useEffect(() => {
        if (price) { 
            axiosSecure.post('/create-payment-intent', { price: price })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch((err) => console.log(err));
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        setMessage('');
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
    
        // Destructure response from createPaymentMethod
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
    
        if (error) {
            console.error(error);
            setMessage(error.message);
            return; // Exit if there's an error creating the payment method
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: currentUser?.name || 'Unknown',
                    email: currentUser?.email || 'Anonymous', // Ensure single value for email
                }
            }
        });
    
        if (confirmError) {
            console.log('[Confirm Error]', confirmError);
        } else {
            console.log('[Payment Intent]', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                const transactionId = paymentIntent.id;
                const paymentMethod = paymentIntent.payment_method;
                const amount = paymentIntent.amount / 100;
                const currency = paymentIntent.currency;
                const paymentStatus = paymentIntent.status;
                const userName = currentUser?.name;
                const userEmail = currentUser?.email;

                const data = {
                    transactionId,
                    paymentMethod,
                    amount,
                    currency,
                    paymentStatus,
                    userName,
                    userEmail,
                    classesId: cartItem ? [cartItem] : cart,
                    date: new Date()
                }

                // console.log(data)

                fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    if(res.deletedResult.deletedCount > 0 && res.paymentResult.insertedId && res.updatedResult.modifyCount > 0) {
                        setSucceeded('Payment Successful , You can start you course!')
                        <Navigate('/dashboard/enrolled-class');
                    } else {
                        setSucceeded('Payment Failed, please try again')
                    }
                }).catch(err => console.log(err))
            }
        }
    };
    
    
  return (
    <>
    <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold'>
            Payment Amount : ₹<span className='text-secondary'>{price}</span>
        </h1>
    </div>
    <div className='max-w-md mx-auto'>
        <form onSubmit={handleSubmit}>
        <CardElement options={
            {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#9e2146',
                },
            }
        }/>

        <button type='submit' className='mt-4 px-4 py-2 bg-secondary text-white rounded hover:bg-blue-600' disabled= {isLoading || !stripe || !clientSecret}>Pay</button>

        {message && <p className='text-red-500 mt-2'>{message}</p>}
        {succeeded && <p className='text-green-500 mt-2'>{succeeded}</p>}

    </form>
    </div>
    
    </>
  )
}

export default CheckoutPage