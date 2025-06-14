import React from 'react'
import { Link } from 'react-router-dom'
import { useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'


const CaptainLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setCaptain} = React.useContext(CaptainDataContext);
  const navigate = useNavigate(); 

  const submitHandler = async (e)=>{
    e.preventDefault();
    const captain = {
      email : email,
      password : password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain)
    
    if(response.status === 200){
      const data = response.data
      setCaptain(data.captain)

      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

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
