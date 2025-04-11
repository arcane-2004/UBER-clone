import React from 'react'
import { Links } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, } from 'react'

const CaptainSignup = () => {

  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [ , setCaptainData] = useState({})
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      setCaptainData({
        fullName:{
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password
      })
  
 
  
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
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
        onChange={(e)=>{
          setFirstName(e.target.value)
        }}
        />

      <input
        required
        className='bg-[#efefef] mb-7 rounded-xl px-4 py-2  w-1/2 text-base placeholder:text-base'
        type="name"
        placeholder='Last Name'
        value={lastName}
        onChange={(e)=>{
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
        onChange={(e)=>{
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
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
      />

    <button className='bg-black text-white mb-7 font-semibold rounded-xl px-4 py-2 border w-full text-lg '>
      Sign up
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
