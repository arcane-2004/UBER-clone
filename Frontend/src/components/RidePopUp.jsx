import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setRidePopupPanel(false)
            }} className="text-2xl font-bold text-center w-[92%] text-gray-300 p-1"><i className="ri-arrow-down-wide-fill"></i></h5>

            <h3 className="text-2xl font-semibold mb-3 ml-3 text-center">New ride available!</h3>
            <div className='flex items-center justify-between mt-4 bg-[#f7d519] p-4 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className="h-13 w-15 object-cover rounded-full" src="https://t3.ftcdn.net/jpg/00/00/74/52/360_F_745296_A6pUw6thznbthVnbPLm5Fgzn5FBzn5.jpg" alt="" />
                    <h2 className='text-base font-medium'>{props.ride?.user.fullname.firstname +" "+ props.ride?.user.fullname.lastname} </h2>
                </div>
                <h2 className='text-base font-semibold'>2.8 KM</h2>
            </div>
            <div className='flex flex-col gap-2 justify-between items-center'>
                <div className='w-full p-3'>
                    {/* current location */}
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="text-2xl ri-map-pin-range-line"></i>
                        <div>
                            <h3 className=' font-semibold'>{props.ride?.pickup.split(" ").slice(0, 3).join(" ")}</h3>
                            <p className='texl-sm text-gray-500'>{props.ride?.pickup.split(" ").slice(3, ).join(" ")}</p>
                        </div>
                    </div>

                    {/* destination */}
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="text-2xl ri-map-pin-range-fill"></i>
                        <div>
                            <h3 className='font-semibold'>{props.ride?.destination.split(" ").slice(0, 3).join(" ")}</h3>
                            <p className='texl-sm text-gray-500'>{props.ride?.destination.split(" ").slice(3, ).join(" ")}</p>
                        </div>
                    </div>

                    {/* payment */}
                    <div className='flex items-center gap-5 p-2'>
                        <i className="text-2xl ri-currency-line"></i>
                        <div>
                            <h3 className=' font-bold'>₹{props.ride?.fare}</h3>
                            <p className='texl-sm text-gray-500'>Cash Cash</p>
                        </div>
                    </div>

                </div>
                <div className='flex w-full gap-4'>
                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                        props.confirmRide()
                    }} className='w-full bg-[#f7d519]  p-2 rounded-lg font-semibold '>Accept</button>

                    <button onClick={() => {
                        props.setRidePopupPanel(false)
                    }} className='w-full bg-gray-300 p-2 rounded-lg font-semibold text-gray-700 '>Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp
