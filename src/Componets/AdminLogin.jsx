import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { GetAdminData } from '../Api/ApiService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


function AdminLogin() {

    const [adminData,setAdminData]=useState({})
    const [userid,setUserid]=useState("")
    const [pass,setPass]=useState("")
    const Location=useNavigate()
    console.log(adminData);
    

    useEffect(()=>{
        Admin()
    },[])


    const Admin=async()=>{
        const response=await GetAdminData()
        if(response.status==200){
            setAdminData(response.data)
        }
    }

    const adminLogin=()=>{
        if(userid && pass){
            if((userid).toLowerCase()==adminData.email && pass==adminData.password){
                Swal.fire({
                    title: "Admin Verified!",
                    icon: "success"
                    });
                    setUserid("")
                    setPass("")
                    Location('/admindashboard')
            }else{
                Swal.fire({
                    title: "Try again!",
                    text:"Wrong credentials" ,
                    icon: "error"
                    });
            }
        }else{
            toast.warning("Enter Admin Credentials")
        }
    }



  return (
    <div className='min-h-screen w-full flex justify-center items-center p-3 sm:p-5'>
        <div className='shadow rounded p-4 sm:p-5 w-full max-w-2xl'>
            <div className='text-center'>
                <p className='text-2xl sm:text-3xl font-medium text-center my-2'>Welcome admin</p>
                <p className='text-gray-600 text-sm'>First of all who are you ?</p>
                <div className='my-5'>
                    <input value={userid} onChange={(e)=>setUserid(e.target.value)} className='my-2 border w-full px-3 py-1 rounded border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300' type="text" placeholder='Admin Id' />
                    <input value={pass} onChange={(e)=>setPass(e.target.value)} className='my-2 border w-full px-3 py-1 rounded border-gray-300 focus:border-blue-500 focus:outline-none transition duration-300' type="password" placeholder='Admin Password' />
                    <button onClick={adminLogin} className='py-1.5 bg-blue-600 w-full rounded font-medium text-white my-4'>Login</button>
                </div>
                <div className='flex justify-center'>
                    <Link to={'/'} className='flex items-center gap-2 text-sm sm:text-base text-blue-600'><FaArrowLeft/>Back to role selection</Link>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AdminLogin