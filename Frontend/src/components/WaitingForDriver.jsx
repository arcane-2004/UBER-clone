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
          <h4 className='text-lg font-medium'>Ayush</h4>
          <h3 className='text-xl font-semibold -mt-1 -mb-1'>MP 66 T 3412</h3>
          <p className='text-sm text-gray-500'>White Suzuki Swift</p>
        </div>
      </div>


      <div className='w-full p-3 '>
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

    </div>
  )
}

export default WaitingForDriver
