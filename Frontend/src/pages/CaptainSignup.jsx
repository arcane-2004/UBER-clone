import React from 'react'
import { Link } from 'react-router-dom'
import { useState, } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');


  const { setCaptain} = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {

    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color : vehicleColor,
        plate : vehiclePlate,
        capacity : vehicleCapacity,
        vehicleType : vehicleType,
      },
    }
    console.log(captainData);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)

    if(response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>

        <div>
          <img className='w-14 mb-5 ' src="https://pngimg.com/d/uber_PNG24.png" alt="" />

          <form action=" " onSubmit={(e) => {
            submitHandler(e)
          }} >
            <h3 className='text-base font-medium mb-2'>Enter your Name</h3>
            <div className='flex gap-2'>
              <input
                required
                className='bg-[#efefef] mb-7 rounded-xl px-4 py-2 w-1/2 text-base placeholder:text-base'
                type="name"
                placeholder='First Name'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />

              <input
                required
                className='bg-[#efefef] mb-7 rounded-xl px-4 py-2  w-1/2 text-base placeholder:text-base'
                type="name"
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />

            </div>

            <h3 className='text-base font-medium mb-2'>What is your Email</h3>
            <input
              required
              className='bg-[#efefef] mb-7 rounded-xl px-4 py-2  w-full text-base placeholder:text-base'
              type="email"
              placeholder='email@exapmle.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />

            <h3 className='text-base font-medium  mb-2'>Enter Password</h3>
            <input
              required
              className='bg-[#efefef] mb-7 rounded-xl px-4 py-2  w-full text-base placeholder:text-base'
              type="password"
              placeholder='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />

            <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
            <div className='mb-7 flex gap-2 '>
              <div>
                <input
                  required
                  className='bg-[#efefef] rounded-xl px-4 py-2 w-full text-base placeholder:text-base mb-4'
                  type="text"
                  placeholder='Vehicle Plate Number'
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />

                <input
                  required
                  className='bg-[#efefef] rounded-xl px-4 py-2 w-full text-base placeholder:text-base mb-4'
                  type="number"
                  placeholder='Vehicle Capacity'
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                />
              </div>

              <div>
                <input
                  required
                  className='bg-[#efefef] rounded-xl px-4 py-2 w-full text-base placeholder:text-base mb-4'
                  type="text"
                  placeholder='Vehicle Color'
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />


                <select
                  required
                  className='bg-[#efefef] rounded-xl px-4 py-2 w-full text-base placeholder:text-base'
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="" disabled>Select Vehicle Type</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Auto">Auto</option>
                </select>
              </div>
            </div>

            <button className='bg-black text-white mb-7 font-semibold rounded-xl px-4 py-2 border w-full text-lg '>
              Create Captain Account
            </button>

          </form>
          <p className='text-center' >Already have a account? <Link to='/captain-login' className="text-blue-600">Login here</Link></p>
        </div>

        <div>
          <p className='text-[10px] leading-tight text-gray-500'>
            This site is protected by reCAPATCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default CaptainSignup
