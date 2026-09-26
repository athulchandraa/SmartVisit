import React, { useEffect, useState } from 'react'
import AdminSideBar from '../Pages/AdminSideBar'
import { useParams } from 'react-router-dom'
import { GetSecurity } from '../Api/ApiService'


function SecurityVisitLog() {
  const {id}=useParams()
  const[SecurityHistory,setSecurityHistory]=useState(null)
  console.log(SecurityHistory);
  

  const thisSecurityHistory=async()=>{
    const response=await GetSecurity()
    setSecurityHistory(response.data.filter(item=>item.id==id)[0].accessed);
  }
  useEffect(()=>{
    thisSecurityHistory()
  },[])
  return (
     <div className='flex'>
      <AdminSideBar sidebar id={id}/>
      <div className='ml-90 shadow rounded h-screen w-full p-5'>
        <div className='flex justify-between items-center shadow rounded p-3'>
          <div className=''>
            <p className='text-xl font-medium'>Registered Visitors</p>
            <p className='text-gray-600'>View all registered visitors</p>
          </div>
          <div className='flex gap-5'>
            <input className='border border-gray-300  px-3 py-1 w-80 rounded' type="text" placeholder='Search by Name or ID' />
            <input className='border py-1 px-3 border-gray-300 rounded' type="date" placeholder='' />
          </div>
        </div>
        {
          SecurityHistory?.length >0 ?
          <table className='mt-5 w-full border'>
          <tr>
            <th className='border-x'>#</th>
            <th className='border-x'>Photo</th>
            <th className='border-x'>Name</th>
            <th className='border-x'>Unique ID</th>
            <th className='border-x'>Phone</th>
            <th className='border-x'>Purpose</th>
            <th className='border-x'>Date</th>
            <th className='border-x'>CheckIn</th>
            <th className='border-x'>CheckOut</th>
            <th className='border-x'>Action</th>
          </tr>
          <tbody>
            {/* Duplicate */}
            {
              SecurityHistory.map((item,index)=>(
                <tr className='border-y text-center'>
              <td className="border-x border-gray-400">{index+1}</td>
              <td className="border-x border-gray-400 flex justify-center">
                <img className='w-10 py-2' src={item.imgUrl} alt="" />
              </td>
              <td className="">{item.name}</td>
              <td className="border-x border-gray-400">{item.id}</td>
              <td className="border-x border-gray-400">{item.phone}</td>
              <td className="border-x border-gray-400">{item.purpose}</td>
              <td className="border-x border-gray-400">{item.date}</td>
              <td className="border-x border-gray-400">{item.ExpectedTime}</td>
              <td className="border-x border-gray-400">12:55 PM</td>
              <td className="border-x border-gray-400">
                <button className='px-3 py-1 bg-green-600 text-white rounded mx-2'>Update Check-Out</button>
              </td>
            </tr>
              ))
              }
            
          </tbody>
        </table> :
        <div className='flex justify-center my-30 items-center'>
          <img className='h-100' src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif" alt="" />
        </div>
        }
      </div>

    </div>
  )
}

export default SecurityVisitLog