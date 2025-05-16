import React from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState, useRef } from 'react'
import FinishRide from '../components/FinishRide'


const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)

    const finishRidePanelRef = useRef(null)

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        }

        else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen'>

            <div className='fixed flex items-center justify-between w-full p-6'>
                <img className='w-15' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
                <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-4/5">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt=""
                />
            </div>
            <div onClick={() => {
                setFinishRidePanel(true)
            }} className='h-1/5 bg-[#f7d519] flex items-center justify-between p-5 relative'>

                <h5 className="text-2xl font-bold text-center w-[92%] absolute top-0 text-gray-600 p-1"><i className="ri-arrow-up-wide-fill"></i></h5>

                <h4 className='text-xl font-semibold'>5 KM away</h4>
                <button className=' bg-black text-white  p-3 px-10 rounded-lg font-semibold '>Complete Ride</button>
            </div>

            <div ref={finishRidePanelRef} className="w-full h-[70%] fixed z-10 bottom-0 px-4 pb-6 bg-white translate-y-full">
                <FinishRide setFinishRidePanel={setFinishRidePanel} />

            </div>
        </div>
    )
}

export default CaptainRiding
