import React, { useEffect, useState } from 'react'
import { FaUserClock } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { FaBuildingUser } from "react-icons/fa6";
import AdminSideBar from '../Pages/AdminSideBar';
import { GetSecurity, VisitorsList } from '../Api/ApiService';



function AdminDashBoard() {

  const[VisitorsTotal,setVisitorsTotal]=useState()
  const[securityTotal,setSecurityTotal]=useState({})
  const[date,setDate]=useState()
  const NowDate=new Date()
  const TodayDate=NowDate.toLocaleDateString()
  console.log(VisitorsTotal);
  
  

  const TotalVisitors=async()=>{
    const response=await VisitorsList()
    setVisitorsTotal(response.data);
  }

  const totalSecurity=async()=>{
    const response=await GetSecurity()
    setSecurityTotal(response.data)
    
  }
  useEffect(()=>{
    TotalVisitors(),
    totalSecurity()
  },[])

  return (
    <div className='flex'>
      {/* SideBar */}
      <AdminSideBar/>
          <div className='ml-90 shadow rounded h-screen w-full p-5'>
            <div>
              <p className='text-3xl font-medium'>Welcome, Admin</p>
              <p className='text-gray-400'>Here's an overview of your visit management system</p>
            </div>
            <div className='grid grid-cols-4 justify-items-center mt-5'>
              <div className='flex items-center gap-3 shadow w-fit p-3 rounded bg-blue-200'>
                <FaUserClock className='text-4xl text-blue-600' />
                <div>
                  <p className='text-blue-600'>Total Visitors</p>
                  <p className='text-3xl text-blue-600 font-medium'>{VisitorsTotal?.length}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 shadow w-fit p-3 rounded bg-green-200'>
                <FaUserShield className='text-4xl text-green-600' />
                <div>
                  <p className='text-green-600'>Total Security</p>
                  <p className='text-3xl text-green-600 font-medium'>{securityTotal?.length}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 shadow w-fit p-3 rounded bg-purple-200'>
                <FaUserCheck className='text-4xl text-purple-600' />
                <div>
                  <p className='text-purple-600'>Today Vistors</p>
                  <p className='text-3xl text-purple-600 font-medium'>{VisitorsTotal?.filter(item=>item.id==TodayDate).length}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 shadow w-fit p-3 rounded bg-yellow-200'>
                <FaBuildingUser className='text-4xl text-yellow-600' />
                <div>
                  <p className='text-yellow-600'>Active Now</p>
                  <p className='text-3xl text-yellow-800 font-medium'>128</p>
                </div>
              </div>
            </div>
            
          </div>
    </div>
  )
}

export default AdminDashBoard