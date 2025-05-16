import {React, useState} from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {

    const [otp, setOtp] = useState('')

    const submitHandler = (e) => [
        e.preventDefault
    ]

    return (
        <div >
            <h5 onClick={() => {
                props.setRidePopupPanel(false)
                props.setConfirmRidePopupPanel(false)
            }} className="text-2xl font-bold text-center w-[92%] text-gray-300 p-1"><i className="ri-arrow-down-wide-fill"></i></h5>

            <h3 className="text-2xl font-semibold mb-3 ml-3 text-center">Confirm Ride</h3>
            <div className='flex items-center justify-between mt-4 bg-[#f7d519] p-4 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className="h-13 w-15 object-cover rounded-full" src="https://t3.ftcdn.net/jpg/00/00/74/52/360_F_745296_A6pUw6thznbthVnbPLm5Fgzn5FBzn5.jpg" alt="" />
                    <h2 className='text-lg font-medium'>Arun Jain</h2>
                </div>
                <h2 className='text-lg font-semibold'>2.8 KM</h2>
            </div>
            <div className='flex flex-col gap-2 justify-between items-center'>
                <div className='w-full p-3'>
                    {/* current location */}
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="text-2xl ri-map-pin-range-line"></i>
                        <div>
                            <h3 className='text-lg font-semibold'>TTS Type/1-230</h3>
                            <p className='texl-sm text-gray-500'>Vindhyanagar, Singrauli (M.P.)</p>
                        </div>
                    </div>

                    {/* destination */}
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="text-2xl ri-map-pin-range-fill"></i>
                        <div>
                            <h3 className='text-lg font-semibold'>Bargawan railway station</h3>
                            <p className='texl-sm text-gray-500'>Bargawan, Madhya Pradesh</p>
                        </div>
                    </div>

                    {/* payment */}
                    <div className='flex items-center gap-5 p-2'>
                        <i className="text-2xl ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-bold'>199.20</h3>
                            <p className='texl-sm text-gray-500'>Cash Cash</p>
                        </div>
                    </div>

                </div>
                <div className='mt-6 w-full'>
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className='text-center'>
                            <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='w-[70%] bg-[#eee] p-3 mb-3 rounded-lg text-center text-lg font-mono' placeholder='Enter OTP' />
                        </div>
                        <div className='flex gap-4 w-full'>
                            <Link to={'/captain-riding'} className='w-full bg-[#f7d519] p-2 rounded-lg font-semibold flex justify-center items-center'>Confirm</Link>

                            <button onClick={() => {
                                props.setConfirmRidePopupPanel(false)
                                props.setRidePopupPanel(false)
                            }} className='w-full bg-red-600 p-2 rounded-lg font-semibold text-white '>Cancel</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp
