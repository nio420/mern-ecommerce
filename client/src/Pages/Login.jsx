import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login') 
  const {token, setToken, backendUrl, name, setName, email, setEmail, password, setPassword} = useContext(ShopContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if(currentState === 'Sign Up'){
        const url = `${backendUrl}/api/user/register`;
        const res = await axios.post(url, { name, email, password });
        // register
        if(res.data.success){
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token )
          toast.success("You have successfully registered!")
          navigate('/')
          setName('')
          setEmail('')
          setPassword('')          
        }  else {
          toast.error(res.data.message)
        } 

        // login 
      } else {
        const url = `${backendUrl}/api/user/login`;
        const res = await axios.post(url, { email, password });

        if(res.data.success){
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token )
          toast.success("Logged in Successfully!")
          setEmail('')  // clear input fields
          setPassword('')
        }  else {
          toast.error(res.data.message)
        } 
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    if(token){
      navigate('/')
    }
  },[navigate, token])

  return (
    <form onSubmit={onSubmitHandler} action="" className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-primary'>
      <div className='inline-flex items-center mt-10 mb-2 gap-2 '>
        <p className='prata-regular text-3xl'> {currentState} </p>
        <span className="w-8 md:w-11 h-0.5 bg-[#414141]"></span>
      </div>

      {/* input  */}
      {currentState === 'Login' ? '' : <input onChange={(e)=> setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter a Name' required/>}
      <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter a Email' required/>
      <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter a Password' required/>

      {/* <input logic /> */}
      <div className='-mt-2 text-sm w-full flex justify-between '>
        <p className='cursor-pointer text-xs text-primary-light hover:underline hover:text-primary '> Forgot Your Password</p>
        {
          currentState === 'Login' ? <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer text-primary-light hover:underline hover:text-primary"> Create a account </p> :  <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-primary-light hover:underline hover:text-primary"> login here </p>
        }
      </div>

      {/* button for login */}
      <button type='submit' className='text-sm text-white bg-primary-dark px-8 py-3 rounded-md shadow-md transition-all duration-300 hover:bg-black active:scale-98 focus:outline-none focus:ring-2 focus:ring-primary-light cursor-pointer uppercase font-light'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login