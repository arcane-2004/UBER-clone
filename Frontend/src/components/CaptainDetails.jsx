import React, {useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'


const CaptainDetails = () => {

    const {captain} = useContext(CaptainDataContext);


    return (
        <div>

            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg" alt="" />
                    <h4 className='text-lg font-medium'>{captain.fullname.firstname+ " " +captain.fullname.lastname}</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹310.54</h4>
                    <p className='text-sm text-gray-400'>Earned</p>
                </div>

            </div>

            <div className='flex bg-gray-100 rounded-2xl justify-center items-start gap-5 p-3 mt-8'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-time-line"></i>
                    <h5 className='text-lg font-medium'>8.6</h5>
                    <p className='text-sm text-gray-400' >Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-fill"></i>
                    <h5 className='text-lg font-medium'>8.6</h5>
                    <p className='text-sm text-gray-400' >Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>8.6</h5>
                    <p className='text-sm text-gray-400' >Hours Online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails
