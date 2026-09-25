import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { GetSecurity } from '../Api/ApiService';
import { toast } from 'react-toastify';


function SecurityLogin() {

    const [login,setLogin]=useState()
    const[userInput,setUserInput]=useState({
        securityId:"",
        password:""
    })
    const[id,setId]=useState()
    const Location=useNavigate()

    useEffect(()=>{
        LoginGuards()
    },[])

    const LoginGuards=async()=>{
        const response=await GetSecurity()
        setLogin(response.data);
    }

    const LoginBtn=()=>{
        if(userInput.securityId && userInput.password){
            const response2=login.filter(item=>item.securityId==userInput.securityId)
            if(response2==""){
                toast.warning("You are not Authorized Security !")
            }else{
                if(response2[0].password==userInput.password){
                    toast.success("Login Successfull")
                    Location(`/securitylandingpage/${response2[0].id}`)
                }else{
                    toast.error("Incorrect password!")                    
                }
            }
        }else{
            toast.error("Please fill the Page")
        }
    }

  return (
    <div className='h-screen flex justify-center items-center p-3'>
        <div className='shadow rounded p-5 w-250'>
            <div className='text-center'>
                <p className='text-3xl font-medium text-center my-2'>Security Login</p>
                <p className='text-gray-600 text-sm'>Please Login with your credentials</p>
                <div className='my-5'>
                    <input value={userInput.securityId} onChange={(e)=>{setUserInput({...userInput,securityId:e.target.value})}} className='my-2 border w-full px-3 py-1 rounded border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300' type="text" placeholder='Security ID' />
                    <input value={userInput.password} onChange={(e)=>{setUserInput({...userInput,password:e.target.value})}} className='my-2 border w-full px-3 py-1 rounded border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300' type="password" placeholder='Password' />
                    <button onClick={LoginBtn} className='py-1.5 bg-green-600 w-full rounded font-medium text-white my-4'>Login</button>
                </div>
                <div className='flex justify-center'>
                    <Link to={'/'} className='flex items-center gap-2 text-green-600'><FaArrowLeft/>Back to role selection</Link>
                </div>
            </div>
        </div>

    </div>
  )
}

export default SecurityLogin