import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {  useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {

    const location = useLocation()
    const {ride} = location.state || {}
    const {socket} = useContext(SocketContext)
    const navigate = useNavigate()

    socket.on('ride-ended', ()=>{
        navigate('/home')
    })

    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full right-2 top-2 '>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className="h-1/2">
                <LiveTracking/>
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex relative items-center justify-between my-6'>
                    <div className='flex'>
                        <img className='rounded-full h-15 w-17 absolute z-1 top-0' src="https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg" alt="" />

                        <img className='h-15 absolute top-0 left-10 ' src="https://pngimg.com/d/suzuki_PNG12294.png" alt="" />
                    </div>

                    <div className='text-right' >
                        <h4 className='text-lg font-medium'>{ride?.captain.fullname.firstname+ " "+ ride?.captain.fullname.lastname} </h4>
                        <h3 className=' font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate} </h3>
                        <p className='text-sm text-gray-500'>White Suzuki Swift</p>
                    </div>
                </div>


                <div className='w-full '>

                    {/* destination */}
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="text-2xl ri-map-pin-range-fill"></i>
                        <div>
                            <h3 className='text-lg font-semibold'>{ride?.destination.split(" ").slice(0, 3).join(" ")}</h3>
                            <p className='texl-sm text-gray-500'>{ride?.destination.split(" ").slice(3, ).join(" ")} </p>
                        </div>
                    </div>

                    {/* payment */}
                    <div className='flex items-center gap-5 p-2'>
                        <i className="text-2xl ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-bold'>{ride?.fare} </h3>
                            <p className='texl-sm text-gray-500'>Cash Cash</p>
                        </div>
                    </div>

                </div>

                <button className='w-full bg-green-600 p-2 rounded-lg font-semibold text-white mt-8'>Make a payment</button>
            </div>
        </div>
    )
}

export default Riding
