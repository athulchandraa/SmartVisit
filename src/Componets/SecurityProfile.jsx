import React, { useEffect, useState } from 'react'
AdminSideBar
import { MdOutlineEdit } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaUser } from "react-icons/fa6";
import AdminSideBar from '../Pages/AdminSideBar';
import { useParams } from 'react-router-dom';
import { GetSecurity, StatusChange } from '../Api/ApiService';


function SecurityProfile() {
  const {id}=useParams()
  useEffect(()=>{
    SecurityData()
  },[])
  const [Asecurity,setAsecurity]=useState()
  console.log(Asecurity);

  const SecurityData=async()=>{
    const response=await GetSecurity()
    const response1=response.data
    setAsecurity(response1.find(item=>item.id==id));
  }

  //Change Active to Inactive
  const ChangeInactive=async()=>{
    const UpdatedData={...Asecurity,status:"inactive"}
    const response=await StatusChange(UpdatedData)
    setAsecurity(response.data)
  }
  //ChangeActive

  const ChangeActive=async()=>{
    const UpdatedData={...Asecurity,status:"active"}
    const response=await StatusChange(UpdatedData)
    setAsecurity(response.data)
  }

  return (
    <div className='flex '>
      <AdminSideBar sidebar id={id}/>
      {
        Asecurity &&
        <div className='ml-90 shadow rounded h-screen w-full p-5'>
        <div className='flex justify-between items-center shadow p-2'>
          <div>
            <p className='text-xl font-medium'>My Profile</p>
            <p className='text-gray-500'>View your personal information and account details</p>
          </div>
          <button className='px-3 py-1 bg-blue-600 text-white font-medium rounded flex items-center gap-2'><MdOutlineEdit/>Edit Profile</button>
        </div>
        <div className='p-2 mt-5 shadow rounded flex justify-between items-center px-4'>
          {/* image */}
          
          <div className='flex items-center gap-5'>
            <div>
            <img className='w-40 h-40 rounded-full' src={Asecurity.image} alt="" />
          </div>
            <div>
              <p className='text-2xl font-medium'>{Asecurity.name}</p>
              <p className='px-3 py-1 rounded-2xl text-blue-700 font-medium bg-blue-200 w-fit mt-2'>Security Personnel</p>
              <p className='text-sm text-gray-500'>Committed to a safer environment</p>
            </div>
          </div>
          
          <div>
            {
              Asecurity.status=="active" ?
              <button onClick={ChangeInactive} className='text-green-700 font-medium bg-green-200 px-3 py-1 rounded w-fit rounded-2xl flex items-center gap-2'><GoDotFill/>Active</button>
              :
              <button onClick={ChangeActive} className='text-red-700 font-medium bg-red-200 px-3 py-1 rounded w-fit rounded-2xl flex items-center gap-2'><GoDotFill/>Inactive</button>
            }
            <div>
              <p className='text-gray-400 text-sm'>Security ID</p>
              <p className='font-medium'>SEC{Asecurity.securityId}</p>
            </div>
          </div>
          {/* <div>
            Active Inactive Toggle
            <div className='flex gap-2'>
              <p className='text-2xl font-medium text-red-600'>Offline</p>
              <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultValue />
              <div className="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95" />
            </label>
            <p className='text-2xl font-medium text-green-600'>Online</p>
            </div>
          </div> */}
        </div>
        <div className='my-5  shadow rounded px-2 py-5'>
          <p className='flex items-center gap-2 font-medium my-2'><FaUser/>Personal Information</p>
          <hr className='text-gray-300'/>

          <div className='flex items-center gap-75'>
            <p className='flex items-center gap-2 text-gray-600 my-2'><FaUser/>Name</p>
            <p>{Asecurity?.name}</p>
          </div>
          <hr className='text-gray-300'/>
          <div className='flex items-center gap-72'>
            <p className='flex items-center gap-2 text-gray-600 my-2'><FaUser/>ID Card</p>
            <p> {Asecurity?.id}</p>
          </div>
          <hr className='text-gray-300'/>
          <div className='flex items-center gap-72'>
            <p className='flex items-center gap-2 text-gray-600 my-2'><FaUser/>Gender</p>
            <p>{Asecurity?.gender}</p>
          </div>
          <hr className='text-gray-300'/>
          <div className='flex items-center gap-62'>
            <p className='flex items-center gap-2 text-gray-600 my-2'><FaUser/>Date of Birth</p>
            <p>{Asecurity?.dob}</p>
          </div>
          <hr className='text-gray-300'/>

          <div className='flex items-center gap-76'>
            <p className='flex items-center gap-2 text-gray-600 my-2'><FaUser/>Email</p>
            <p>{Asecurity?.mail}</p>
          </div>
          <hr className='text-gray-300'/>

          <div className='flex items-center gap-74'>
            <p className='flex items-center gap-2 text-gray-600 my-2'><FaUser/>Phone</p>
            <p>{Asecurity?.phone}</p>
          </div>
          <hr className='text-gray-300'/>

          <div className='flex items-center gap-72'>
            <p className='flex items-center gap-2 text-gray-600 my-2'><FaUser/>Status</p>
            <p className='ml-2'>{Asecurity?.status.toUpperCase()}</p>
          </div>
          <hr className='text-gray-300'/>
          
        </div>
      </div>}
    </div>
  )
}

export default SecurityProfile