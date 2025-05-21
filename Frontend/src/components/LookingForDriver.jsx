import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
      <h5 onClick={() => {
        props.setVehicleFound(false)
      }} className="text-2xl font-bold text-center w-[92%] text-gray-300 p-1"><i className="ri-arrow-down-wide-fill"></i></h5>

      <h3 className="text-2xl font-semibold mb-3 ml-3">Looking for a driver</h3>

      <div className='flex flex-col gap-2 justify-between items-center'>
        <img className='h-40' src={props.vehicleImg} alt="" />
        <div className='w-full p-3'>
          {/* current location */}
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <i className="text-2xl ri-map-pin-range-line"></i>
            <div>
              <h3 className='text-lg font-semibold'>{props.pickup.split(" ").slice(0, 3).join(" ")}</h3>
              <p className='texl-sm text-gray-500'>{props.pickup.split(" ").slice(3, ).join(" ")}</p>
            </div>
          </div>

          {/* destination */}
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <i className="text-2xl ri-map-pin-range-fill"></i>
            <div>
              <h3 className='text-lg font-semibold'>{props.destination.split(" ").slice(0, 3).join(" ")}</h3>
              <p className='texl-sm text-gray-500'>{props.destination.split(" ").slice(3,).join(" ")}</p>
            </div>
          </div>

          {/* payment */}
          <div className='flex items-center gap-5 p-2'>
            <i className="text-2xl ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-bold'>{props.fare[props.vehicleType]}</h3>
              <p className='texl-sm text-gray-500'>Cash Cash</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LookingForDriver
