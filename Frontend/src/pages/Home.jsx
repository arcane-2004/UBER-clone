import React from "react";
import { useState, useRef } from "react";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";



const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
  }

  // location panel
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '68%',
        padding: 20
      })
      gsap.to(panelCloseRef.current, {
        opacity: '1'
      })
    }

    else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: '0'
      })
    }

  }, [panelOpen])

  // select ride panel
  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }

    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  // confirm ride panel
  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }

    else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  // vehicle found 
  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    }

    else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  // waitingForDriver
  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }

    else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-14 absolute left-5 top-5 "
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="h-screen w-screen">
        <img
          className="h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="bg-white h-[30%] p-5 rounded-t-3xl relative" >

          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className="absolute top-1 left-5 text-2xl font-bold opacity-0 ">
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-2xl mt-2 font-semibold">Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e);
          }}>

            <div className="line h-16 w-1 absolute top-[40%] left-[10%] rounded-full bg-black"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              className="bg-[#eee] w-full py-3 px-19 mt-3 rounded-lg text-base"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className="bg-[#eee] w-full py-3 px-19 mt-3 rounded-lg text-base"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen} />
        </div>
      </div>

      {/* card panel for selecting ride */}
      <div ref={vehiclePanelRef} className="w-full fixed z-10 bottom-0 px-4 pb-4 bg-white translate-y-full">
        <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmedRidePanel={setConfirmRidePanel} />
      </div>

      {/* confirmed ride panel  */}
      <div ref={confirmRidePanelRef} className="w-full fixed z-10 bottom-0 px-4 pb-6 bg-white translate-y-full">
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      {/* wait for driver */}
      <div ref={vehicleFoundRef} className="w-full fixed z-10 bottom-0 px-4 pb-6 bg-white translate-y-full">
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

      {/* waiting for a driver */}
      <div ref={waitingForDriverRef} className="w-full fixed z-10 bottom-0 translate-y-full px-4 pb-6 bg-white ">
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
