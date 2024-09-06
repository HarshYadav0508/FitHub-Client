import React from 'react'
import img1 from '../../../assets/gallery/image3.jpg';
import img2 from '../../../assets/gallery/image4.jpg';
import img3 from '../../../assets/gallery/image5.jpg';
import img4 from '../../../assets/gallery/image6.jpg';
import img5 from '../../../assets/gallery/image7.jpg';


const Gallery = () => {
  return (
    <div className='md:w-[80%] mx-auto my-28'>
        <div className='mb-16'>
            <h1 className='text-5xl font-bold text-center'>Our Gallery</h1>
        </div>
        <div className='md:grid grid-cols-2 items-center justify-center gap-4'>
            <div className='mb-4 md:mb-0 hover:-translate-y-2 duration-200 cursor-pointer'>
                <img src={img2} className='md:h-[720px] w-full mx-auto rounded-sm' />
            </div>


            <div className='grid grid-cols-2 gap-4  items-start'>
                <div className='hover:-translate-y-2 duration-200 cursor-pointer'>
                <img src={img1} className='md:h-[350px] rounded-sm' />
                </div>
                <div className='hover:-translate-y-2 duration-200 cursor-pointer'>
                <img src={img3} className='md:h-[350px] rounded-sm' /> 
                </div>
                <div className='hover:-translate-y-2 duration-200 cursor-pointer'>
                <img src={img4} className='md:h-[350px] rounded-sm' />
                </div>
                <div className='hover:-translate-y-2 duration-200 cursor-pointer'>
                <img src={img5} className='md:h-[350px] rounded-sm' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Gallery