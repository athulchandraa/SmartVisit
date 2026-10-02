import React from 'react'
import BgImage from '../assets/BgImage.png'
import { GiAmericanShield } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiGuards } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { Link } from 'react-router-dom';



function DashBoard() {
  return (
    <div className=' md:h-screen h-fit bg-cover bg-center flex justify-center items-center ' style={{backgroundImage:`url(${BgImage})`}}>
      <div className=''>
        <div className=' flex justify-center'>
          <div className='flex justify-center items-center text-white my-10'>
            <GiAmericanShield className='text-6xl'/>
            <div>
                <p className='text-3xl font-medium'>Smart Visit</p>
                <p>Choose your role to continue</p>
            </div>
          </div>
        </div>
        <div className='md:grid md:flex grid-cols-3 gap-5 p-5 justify-items-center'>
          <div style={{width:"300px"}} className='shadow p-3 w-fit text-center bg-white rounded my-2'>
            <div className='flex justify-center'><RiAdminFill className='text-blue-600 text-4xl'/></div>
            <div className=''>
              <p className='text-3xl font-medium'>Admin</p>
              <p className=''>Manage visitors and  security staff</p>
              <div className='flex justify-center'>
                <Link to={'/adminlogin'} className='flex items-center gap-2 text-white px-3 py-1 bg-blue-600 my-5 rounded font-medium cursor-pointer'>Login<FaArrowRightLong/></Link>
              </div>
            </div>
          </div>
  
          <div style={{width:"300px"}} className='shadow p-3 text-center bg-white rounded my-2'>
            <div className='flex justify-center'><GiGuards className=' text-4xl text-green-600'/></div>
            <div className=''>
              <p className='text-3xl font-medium '>Security</p>
              <p className=''>Verify and allow visitors</p>
              <div className='flex justify-center'><Link to={'/securitylogin'} className='flex items-center gap-2 text-white px-3 py-1 bg-green-600 my-5 rounded font-medium cursor-pointer'>Login<FaArrowRightLong/></Link></div>
            </div>
          </div>
  
          <div style={{width:"300px"}} className='shadow p-3 w-fit text-center bg-white rounded my-2'>
            <div className='flex justify-center'><IoPeople className=' text-4xl text-purple-600'/></div>
            <div className=''>
              <p className='text-3xl font-medium '>Visitor</p>
              <p className=''>Register your visit</p>
              <div className='flex justify-center'><Link to={'/visitorregistration'} className='flex items-center gap-2 text-white px-3 py-1 bg-purple-600 my-5 rounded font-medium cursor-pointer'>Login<FaArrowRightLong/></Link></div>
            </div>
          </div>
        </div>
        <p className='text-center text-white  my-10'>A safer tomorrow starts with a smarter today</p>
      </div>
    </div>
  )
}

export default DashBoard