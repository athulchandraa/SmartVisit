import React from 'react'
import AdminSideBar from '../Pages/AdminSideBar'
import { useParams } from 'react-router-dom'


function SecurityVisitLog() {
  const {id}=useParams()
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
            <tr className='border-y text-center'>
              <td className="border-x border-gray-400">1</td>
              <td className="border-x border-gray-400 flex justify-center">
                <img className='w-10 py-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB5cOHy6mU1zA_Ky6YVxl-C5T6twTXCr0aPTPTn5LmZRpc24mVSSpGMYCK&s=10" alt="" />
              </td>
              <td className="">Rahul K</td>
              <td className="border-x border-gray-400">VST20265432</td>
              <td className="border-x border-gray-400">+91 7306201861</td>
              <td className="border-x border-gray-400">Meeting</td>
              <td className="border-x border-gray-400">06/05/2026</td>
              <td className="border-x border-gray-400">9:56 AM</td>
              <td className="border-x border-gray-400">12:55 PM</td>
              <td className="border-x border-gray-400">
                <button className='px-3 py-1 bg-green-600 text-white rounded mx-2'>Update Check-Out</button>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default SecurityVisitLog