import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')


  const navigate = useNavigate()

  const { setUser } = useContext(UserDataContext)
  
  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data;

      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>

      <div>
        <img className='w-14 mb-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

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

          <button className='bg-black text-white mb-7 font-semibold rounded-xl px-4 py-2 border w-full text-lg '>
            Create Account
          </button>

        </form>
        <p className='text-center' >Already have a account? <Link to='/login' className="text-blue-600">Login here</Link></p>
      </div>

      <div>
        <p className='text-[10px] leading-tight text-gray-500'>
          This site is protected by reCAPATCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>
        </p>
      </div>

    </div>
  )
}

export default UserSignup
