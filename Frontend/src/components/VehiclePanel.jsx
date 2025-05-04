import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
         <h5 onClick={()=>{
          props.setVehiclePanel(false)
        }} className="text-2xl font-bold w-[92%] text-center text-gray-300"><i className="ri-arrow-down-wide-fill"></i></h5>

        <h3 className="text-2xl font-semibold mb-5 ml-3">Choose a vehicle</h3>

        {/* 1st ride ubergo */}
        <div onClick={()=>{
            props.setConfirmedRidePanel(true)      
        }} className="w-full mb-3 border-2 border-gray-200 active:border-black rounded-2xl flex items-center justify-between p-1">
          <img className=" h-15 " src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
          <div className="ml-2 w-1/2">
            <h4 className="text-lg font-bold"> UberGo <span><i className="text-base ri-user-fill">4 </i></span> </h4>
            <h5 className="text-sm font-bold ">2 mins away</h5>
            <p className="text-xs font-semibold text-gray-500">Affordable, compact rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹199.20</h2>
        </div>

        {/* 2nd ride */}
        <div onClick={()=>{
            props.setConfirmedRidePanel(true)
        }}className="w-full mb-3 border-2 border-gray-200 active:border-black rounded-2xl flex items-center justify-between p-1">
          <img className=" h-15" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className="-ml-5 w-1/2">
            <h4 className="text-lg font-bold"> Moto <span><i className="text-base ri-user-fill">1 </i></span> </h4>
            <h5 className="text-sm font-bold ">3 mins away</h5>
            <p className="text-xs font-semibold text-gray-500">Affordable, motocycle rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹75</h2>
        </div>

        {/* 3rd ride */}
        <div onClick={()=>{
            props.setConfirmedRidePanel(true)
        }}className="w-full mb-3 border-2 border-gray-200 active:border-black rounded-2xl flex items-center justify-between p-1">
          <img className=" h-15" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className="ml-2 w-1/2">
            <h4 className="text-lg font-bold"> UberAuto <span><i className="text-base ri-user-fill">3 </i></span> </h4>
            <h5 className="text-sm font-bold ">2 mins away</h5>
            <p className="text-xs font-semibold text-gray-500">Affordable, auto rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹118.68</h2>
        </div>
    </div>
  )
}

export default VehiclePanel