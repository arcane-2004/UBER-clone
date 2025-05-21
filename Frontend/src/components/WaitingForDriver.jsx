import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 onClick={() => {
        props.setWaitingForDriver(false)
      }} className="text-2xl font-bold text-center w-[92%] text-gray-300 p-1"><i className="ri-arrow-down-wide-fill"></i></h5>

      <div className='flex relative items-center justify-between my-6'>
        <div className='flex'>
          <img className='rounded-full h-15 w-15 object-cover absolute z-1 top-0' src="https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg" alt="" />

          <img className='h-15 absolute top-0 left-10 ' src="https://pngimg.com/d/suzuki_PNG12294.png" alt="" />
        </div>

        <div className='text-right' >
          <h4 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname} </h4>
          <h3 className=' font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate} </h3>
          <p className='text-sm text-gray-500'>White Suzuki Swift</p>
          <h1 className='text-lg font-medium'>{props.ride?.otp} </h1>
        </div>
      </div>


      <div className='w-full p-3 '>
        {/* current location */}
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className="text-2xl ri-map-pin-range-line"></i>
          <div>
            <h3 className='text-lg font-semibold'>{props.ride?.pickup.split(" ").slice(0, 3).join(" ")}</h3>
            <p className='texl-sm text-gray-500'>{props.ride?.pickup.split(" ").slice(3, ).join(" ")}</p>
          </div>
        </div>

        {/* destination */}
        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
          <i className="text-2xl ri-map-pin-range-fill"></i>
          <div>
            <h3 className='text-lg font-semibold'>{props.ride?.destination.split(" ").slice(0, 3).join(" ")}</h3>
            <p className='texl-sm text-gray-500'>{props.ride?.destination.split(" ").slice(3, ).join(" ")}</p>
          </div>
        </div>

        {/* payment */}
        <div className='flex items-center gap-5 p-2'>
          <i className="text-2xl ri-currency-line"></i>
          <div>
            <h3 className='text-lg font-bold'>{props.ride?.fare} </h3>
            <p className='texl-sm text-gray-500'>Cash Cash</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default WaitingForDriver
