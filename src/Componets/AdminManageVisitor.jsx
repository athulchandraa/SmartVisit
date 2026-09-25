import React, { useEffect, useState } from 'react'
import AdminSideBar from '../Pages/AdminSideBar'
import { VisitorsList } from '../Api/ApiService'



function AdminManageVisitor() {

  
  const [allVisitors,setAllVisitors]=useState(null)
  const[searchItem,setSearchItem]=useState("")
  console.log(allVisitors);
  

  const GettingAllUsers=async()=>{
    const response=await VisitorsList()
    setAllVisitors(response.data)
  }
    useEffect(()=>{
      GettingAllUsers()
    },[])

    //Search Component
    const FilterSearch=allVisitors?.filter(item=>item.name?.toLowerCase().includes(searchItem?.toLowerCase()))
  return (
    <div className='flex'>
      <AdminSideBar/>
      <div className='ml-90 shadow rounded w-full p-5'>
        <div className='flex justify-between items-center shadow rounded p-3'>
          <div className=''>
            <p className='text-xl font-medium'>Registered Visitors</p>
            <p className='text-gray-600'>View all registered visitors</p>
          </div>
          <div className='flex gap-5'>
            <input onChange={(e)=>setSearchItem(e.target.value)} className='border border-gray-300  px-3 py-1 w-80 rounded' type="text" placeholder='Search by Name or ID' />
            <input className='border py-1 px-3 border-gray-300 rounded' type="date" placeholder='' />
          </div>
        </div>
        <table className='mt-5 w-full border'>
          <tr>
            <th className='border-x'>#</th>
            <th className='border-x'>Photo</th>
            <th className='border-x'>Name</th>
            <th className='border-x'>Unique ID</th>
            <th className='border-x'>Phone</th>
            <th className='border-x'>Purpose</th>
            <th className='border-x'>Date</th>
            <th className='border-x'>Access By</th>
            <th className='border-x'>Action</th>
          </tr>
          <tbody>
            {/* Duplicate */}
            {
              FilterSearch?.map((item,index)=>(
              <tr className='border-y text-center'>
              <td className="border-x border-gray-400">{index+1}</td>
              <td className="border-x border-gray-400 flex justify-center">
                <img className='w-10 py-2' src={item?.imgUrl} alt="No Photo" />
              </td>
              <td className="">{item.name}</td>
              <td className="border-x border-gray-400">{item.id}</td>
              <td className="border-x border-gray-400">+91 {item?.phone}</td>
              <td className="border-x border-gray-400">{item.purpose}</td>
              <td className="border-x border-gray-400">{item.date}</td>
              <td className="border-x border-gray-400">Accessed</td>
              <td className="border-x border-gray-400">
                <button className='px-3 py-1 bg-green-600 text-white rounded mx-2'>Update</button>
                <button className='px-3 py-1 bg-red-600 text-white rounded mx-2'>Delete</button>
              </td>
            </tr>
              ))
              }
            
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AdminManageVisitor