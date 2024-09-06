import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Gallery from './Gallery/Gallery'
import PopularClasses from './PopularClasses/PopularClasses'
import PopularTeacher from './PopularTeacher/PopularTeacher'
import useAuth from '../../hooks/useAuth'

function Home() {
  const {user} = useAuth();
  console.log(user);
  return (
    <section className='dark:bg-dark dark:text-white'>
      <HeroContainer />
      <div className='max-w-screen-xl mx-auto'>
        <Gallery className="m-0" />
        <PopularClasses className="m-0" />
        <PopularTeacher className="m-0" />
      </div>
      <div className="bg-secondary text-white py-20">
          <div className="max-w-screen-xl mx-auto flex justify-center items-center space-x-12">
              <div className="flex flex-col items-center">
                <h2 className="text-4xl font-extrabold">1M+</h2>
                <p className="text-xl font-bold">Visitors</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-4xl font-extrabold">350K</h2>
                <p className="text-xl font-bold">Subscribers</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-4xl font-extrabold">100K</h2>
                <p className="text-xl font-bold">Students</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-4xl font-extrabold">90%</h2>
                <p className="text-xl font-bold">Success Story</p>
              </div>
          </div>
        </div>
    </section>
  )
}

export default Home
