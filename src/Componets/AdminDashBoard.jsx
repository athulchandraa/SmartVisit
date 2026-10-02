import React, { useEffect, useState } from 'react'
import { FaUserClock } from "react-icons/fa6";
import { FaArrowRight, FaCross, FaIcons, FaUserShield } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { FaBuildingUser } from "react-icons/fa6";
import AdminSideBar from '../Pages/AdminSideBar';
import { GetSecurity, VisitorsList } from '../Api/ApiService';
import { CiMenuBurger } from 'react-icons/ci';
import { IoMenu } from 'react-icons/io5';



function AdminDashBoard() {

  const[VisitorsTotal,setVisitorsTotal]=useState()
  const[securityTotal,setSecurityTotal]=useState({})
  const[date,setDate]=useState()
  const NowDate=new Date()
  const TodayDate=NowDate.toLocaleDateString()
  console.log(VisitorsTotal);

  //For Responsive
  const[menuIcon,setMenuIcon]=useState(false)
  

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
    <div className='flex min-h-screen w-full overflow-x-hidden'>
      {/* SideBar */}
      <AdminSideBar
          menuIcon={menuIcon}
          setMenuIcon={setMenuIcon}
          />
          <div className='ml-0 min-w-0 w-full shadow rounded min-h-screen p-3 sm:p-5 lg:ml-90'>
            <div className='flex items-center gap-2'>
              {
                !menuIcon &&
                <button type="button" aria-label="Open sidebar" className='lg:hidden' onClick={()=>setMenuIcon(!menuIcon)}>
                  <IoMenu className='text-3xl'/>
                </button>}
              <div className='min-w-0'>
                <p className='text-2xl sm:text-3xl font-medium'>Welcome, Admin</p>
                <p className='text-sm sm:text-base text-gray-400'>Here's an overview of your visit management system</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-5'>
              <div className='flex items-center gap-3 shadow w-full p-3 rounded bg-blue-200'>
                <FaUserClock className='text-4xl text-blue-600' />
                <div>
                  <p className='text-blue-600'>Total Visitors</p>
                  <p className='text-3xl text-blue-600 font-medium'>{VisitorsTotal?.length}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 shadow w-full p-3 rounded bg-green-200'>
                <FaUserShield className='text-4xl text-green-600' />
                <div>
                  <p className='text-green-600'>Total Security</p>
                  <p className='text-3xl text-green-600 font-medium'>{securityTotal?.length}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 shadow w-full p-3 rounded bg-purple-200'>
                <FaUserCheck className='text-4xl text-purple-600' />
                <div>
                  <p className='text-purple-600'>Today Vistors</p>
                  <p className='text-3xl text-purple-600 font-medium'>{VisitorsTotal?.filter(item=>item.date==TodayDate).length}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 shadow w-full p-3 rounded bg-yellow-200'>
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