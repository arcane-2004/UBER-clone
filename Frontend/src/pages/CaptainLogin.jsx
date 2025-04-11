import React from 'react'
import { Links } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, } from 'react'

const CaptainLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState({})

  const submitHandler = async (e)=>{
    e.preventDefault();
    setCaptainData({
      email : email,
      password : password
    })
    console.log(captainData)

    setEmail('')
    setPassword('') 
  } 

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>

      <div>
        <img className='w-14 mb-5 ' src="https://pngimg.com/d/uber_PNG24.png" alt="" />

        <form action=" " onSubmit={(e) => {
          submitHandler(e)
        }} >
          <h3 className='text-lg font-medium mb-2'>What is your Email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#efefef] mb-7 rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@exapmle.com' />

          <h3 className='text-lg font-medium  mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#efefef] mb-7 rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password' />

          <button className='bg-black text-white mb-7 font-semibold rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base'>
            Login
          </button>

        </form>
        <p className='text-center' >Join a fleet? <Link to='/captain-signup' className="text-blue-600">Register as a Captain now</Link></p>
      </div>

      <div>
        <Link to='/login' className='bg-[#f7bb25] flex items-center justify-center text-white mb-7 font-semibold rounded-xl px-4 py-2 border w-full text-lg placeholder:text-base'>
          Sign in as User
        </Link>
      </div>

    </div>
  )
}

export default CaptainLogin
