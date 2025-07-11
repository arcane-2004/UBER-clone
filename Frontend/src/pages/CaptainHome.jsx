import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useRef } from "react";
import axios from 'axios';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'


const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

          console.log({
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }
    setInterval(updateLocation, 10000)

    updateLocation()

    // return () => clearInterval(locationInterval)

  }, [])

  socket.on('new-ride', (data) => {
    console.log(data);
    setRide(data)
    setRidePopupPanel(true)

  })


  async function confirmRide() {

    axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

      rideId: ride._id,
      captainId: captain._id,


    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)

  }

  // ride accept/reject pop up
  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }

    else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])

  // confirm ride pop-up panel
  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }

    else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])


  return (
    <div className='h-screen'>
      <div className='fixed flex items-center justify-between w-full p-6'>
        <img className='w-15' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <Link to='/captain/logout' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>

      <div ref={ridePopupPanelRef} className="w-full fixed z-10 bottom-0 px-4 pb-6 bg-white translate-y-full">
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          ride={ride}
          confirmRide={confirmRide}
        />
      </div>

      <div ref={confirmRidePopupPanelRef} className="w-full h-screen fixed z-10 bottom-0 px-4 pb-6 bg-white translate-y-full">
        <ConfirmRidePopUp 
        setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
        setRidePopupPanel={setRidePopupPanel} 
        ride={ride}
        />
      </div>
    </div>
  )
}

export default CaptainHome
