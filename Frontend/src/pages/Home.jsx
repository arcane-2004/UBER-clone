import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className='bg-cover bg-center bg-[url(https://wallpaper.forfun.com/fetch/05/05b6e8932253f4c113d37c98520afdd5.jpeg?h=1200&r=0.5)] pt-8 h-screen w-full flex justify-between flex-col bg-red-400'>
                <img className='w-14 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                    <Link to='/login' className='flex justify-center w-full bg-black rounded-2xl text-white py-5 mt-5'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Home
