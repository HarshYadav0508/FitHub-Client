import React, { useState, useEffect } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import Card from './Card.jsx';

const PopularClasses = () => {
    const axiosFetch = useAxiosFetch();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axiosFetch.get('/classes');
                // console.log(response.data);
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, [axiosFetch]);

    return (
        <div className='md:w-[80%] mx-auto my-36 '>
            <div>
                <h1 className='text-5xl font-bold text-center'>
                    <span className='text-secondary'>Popular</span> Classes
                </h1>
                <div className='w-[40%] text-center mx-auto my-4'>
                    <p className='text-gray-500 dark:text-white'>
                        Explore our most popular classes, chosen based on enrollment and user favorites!
                    </p>
                </div>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    classes.slice(0,6).map((item,index) => (
                        <Card key={index} item={item} />
                    ))
                }
            </div>
        </div>
    );
};

export default PopularClasses;
