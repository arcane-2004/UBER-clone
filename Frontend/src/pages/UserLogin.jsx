import {React, useContext} from 'react'
import { Link } from 'react-router-dom'
import { useState, } from 'react'
import UserContext, { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()
  const { setUser} = useContext(UserDataContext)

  const submitHandler = async (e)=>{
    e.preventDefault();
    const userData = {
      email : email,
      password : password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if(response.status === 200){
      const data = response.data
      setUser(data.user)
      console.log(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setPassword('') 
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>

      <div>
      <img className='w-14 mb-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form action=" " onSubmit={(e)=>{
          submitHandler(e)
        }} >
          <h3 className='text-base font-medium mb-2'>What is your Email</h3>
          <input
            required
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            className='bg-[#efefef] mb-7 rounded-xl px-4 py-2 border w-full text-base placeholder:text-base'
            type="email"
            placeholder='email@exapmle.com' />

          <h3 className='text-base font-medium  mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            className='bg-[#efefef] mb-7 rounded-xl px-4 py-2 border w-full text-base placeholder:text-base'
            type="password"
            placeholder='password' />

          <button className='bg-black text-white mb-7 font-semibold rounded-xl px-4 py-2 border w-full text-lg '>
            Login
          </button>

        </form>
        <p className='text-center' >New here? <Link to='/signup' className="text-blue-600">Create new Account</Link></p>
      </div>

      <div>
        <Link to='/captain-login' className='bg-[#f7bb25] flex items-center justify-center text-white mb-7 font-semibold rounded-xl px-4 py-2 border w-full text-lg '>
          Sign in as Captain
        </Link>
      </div>

    </div>
  )
}

export default UserLogin
