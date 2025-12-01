import React from "react";
import { useState, useRef, useEffect } from "react";
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';



const Home = () => {

  const [pickup, setPickup] = useState('')
  const [pickupId, setPickupId] = useState('')
  const [destination, setDestination] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState('')
  const [vehicleImg, setVehicleImg] = useState('')
  const [ride ,setRide ] = useState(null)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {


    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ()=>{
    setWaitingForDriver(false)
    navigate('/riding', {state: {ride}})

  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { q: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        
      })
      console.log("suggestions:" , response.data)
      setPickupSuggestions(response.data)
    } catch {
      // handle error
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { q: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch {
      //handle error
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()
  }

  // location panel
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
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
        transform: 'translateY(0)',
        zIndex: 10
      })
    }

    else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
        zIndex: -1
      })
    }
  }, [confirmRidePanel])

  // vehicle found 
  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
        zIndex: 10
      })
    }

    else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
        zIndex: -1
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


  async function findTrip() {
    if (pickup && destination) {
      setVehiclePanel(true)
      setPanelOpen(false)
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setFare(response.data)
    }

  }

  async function createRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log(response.data);

  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-14 absolute left-5 top-5 "
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="h-screen w-screen">
        <LiveTracking/>  
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="bg-white h-[30%] p-5 rounded-t-3xl relative" >

          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className="absolute top-1 left-5 text-2xl font-bold opacity-0 ">
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-2xl mt-2 font-semibold">Find a trip</h4>
          <form className='relative py-3' onSubmit={(e) => {
            submitHandler(e);
          }}>

            <div className="line h-16 w-1 absolute top-[40%] left-[10%] rounded-full bg-black"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] w-full py-3 px-19 mt-3 rounded-lg text-base"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}

              className="bg-[#eee] w-full py-3 px-19 mt-3 rounded-lg text-base"
              type="text"
              placeholder="Enter your destination"
            />
          </form>

        </div>

        {/* location search panel */}
        <div ref={panelRef} className="bg-white h-0 overflow-hidden">
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            findTrip={findTrip}
            setPickup={setPickup}
            setPickupId={setPickupId}
            setDestination={setDestination}
            setDestinationId={setDestinationId}
            activeField={activeField}
          />

        </div>
      </div>

      {/* card panel for selecting ride */}
      <div ref={vehiclePanelRef} className="w-full fixed z-10 bottom-0 px-4 pb-4 bg-white translate-y-full">
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmedRidePanel={setConfirmRidePanel}
          fare={fare}
          createRide={createRide}
          setVehicleType={setVehicleType}
          setVehicleImg={setVehicleImg}
        />
      </div>

      {/* confirmed ride panel  */}
      <div ref={confirmRidePanelRef} className="w-full fixed -z-1 bottom-0 px-4 pb-6 bg-white translate-y-full">
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          vehicleImg={vehicleImg}
        />
      </div>

      {/* wait for driver */}
      <div ref={vehicleFoundRef} className="w-full fixed -z-1 bottom-0 px-4 pb-6 bg-white translate-y-full">
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          vehicleImg={vehicleImg}
        />
      </div>

      {/* waiting for a driver */}
      <div ref={waitingForDriverRef} className="w-full fixed z-10 bottom-0 translate-y-full px-4 pb-6 bg-white ">
        <WaitingForDriver 
        setWaitingForDriver={setWaitingForDriver} 
        // setVehicleFound={setVehicleFound}
        ride={ride}
        />
      </div>
    </div>
  );
};

export default Home;
