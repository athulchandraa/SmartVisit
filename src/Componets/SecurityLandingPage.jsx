import React, { useEffect, useRef, useState } from 'react'
import AdminSideBar from '../Pages/AdminSideBar'
import { useParams } from 'react-router-dom'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { Html5Qrcode } from 'html5-qrcode'
import { VisitorsList } from '../Api/ApiService'


function SecurityLandingPage() {

  const [allVisitorsList,setAllVisitorsList]=useState(null)
  const[SpecificVis,setSpecificVis]=useState(null)
  console.log(allVisitorsList);
  

  //For Scanner
    const[result,setResult]=useState("")
    const[isScanning,setIsScanning]=useState(false)
    const ScannerRef=useRef(null)
    
    useEffect(()=>{
      if(!isScanning)return

      let Cancelled=false
      const scanner=new Html5Qrcode("reader")
      ScannerRef.current=scanner

      const startScanner=async ()=>{
        try{
          await scanner.start(
            {facingMode:"environment"},
            {fps:10,qrbox:250},
            (decodedText)=>{
              if(Cancelled)return
              setResult(decodedText)
              setIsScanning(false)
            },
            ()=>{}
          );
        }catch(error){
          console.error(error)
          setIsScanning(false)
        }
      };
      startScanner();
      return ()=>{
        Cancelled=true;
        scanner.stop().catch(()=>{}).finally(()=>scanner.clear());
      }
    },[isScanning])

    useEffect(()=>{
      allVisitors()
    },[])

    const allVisitors=async()=>{
      const response=await VisitorsList()
      setAllVisitorsList(response.data)
    }




  const {id}=useParams()
  return (
    <div className='flex'>
      <AdminSideBar sidebar id={id}/>
      <div className='ml-90 shadow rounded h-screen w-full p-5'>
        <div className='p-2'>
          <p className='text-3xl font-medium'>Scan Visitor QR Code</p>
          <p className='text-gray-600'>Point the camera at the visitor's QR Code</p>
        </div>
        <div className='grid grid-cols-2 mt-5'>
          <div>
            {/* Scanner */}
            {!isScanning && (
              <button onClick={()=>{
                setResult("")
                setIsScanning(true)
              }} className='bg-blue-600 text-white px-5 py-2 rounded'>Scan QR Code</button>
            )}

            {
              isScanning && (
                <div id='reader' className='max-w-sm mx-auto'></div>
              )
            }
            {
              result &&(
                <div className='mt-5 p-4 bg-green-100 rounded'>
                  <h3>Scan Successful!</h3>
                  <p>{result}</p>
                </div>
              )
            }
          </div>
          <div className='shadow p-3'>
            <p className='font-medium text-xl my-3'>Visitor Details</p>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1'>
                {/* image */}
                <img className='w-50 h-45 rounded shadow p-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8qh6bj65apXQ5cNMTGlRUO4JgHCyR0zNNitLecRMgYkfrvbxMuD_rVvQ&s=10" alt="" />
              </div>
              <div className='col-span-2 shadow p-2 flex justify-center'>
                  {/* Visitor Details */}
                  <div className='grid grid-cols-[170px_1fr] gap-y-3 gap-x-5 '>
                <span className='text-gray-500'>Unique ID</span>
                <span className='font-semibold'>id</span>
  
                <span className='text-gray-500'>Name of Visitor</span>
                <span className='font-semibold'>name</span>
  
                <span className='text-gray-500'>Visit Person</span>
                <span className='font-semibold'>person</span>
  
                <span className='text-gray-500'>Room no</span>
                <span className='font-semibold'>room</span>
  
                <span className='text-gray-500'>Visit Purpose</span>
                <span className='font-semibold'>purpose</span>
  
                <span className='text-gray-500'>Phone</span>
                <span className='font-semibold'>+918848512322</span>
  
                <span className='text-gray-500'>Visit Time</span>
                <span className='font-semibold'>time</span>
  
                <span className='text-gray-500'>Visit Purpose</span>
                <span className='font-semibold'>purpose</span>
  
              </div>
              </div>

            </div>
            <div>
              <div className='w-full bg-green-200 py-2 text-center font-semibold text-lg rounded text-green-900 flex items-center gap-2 justify-center mt-5 mb-2'>
                <IoCheckmarkCircle className='text-3xl'/>
                Valid Visitor
              </div>
              <button className='bg-green-800 text-white text-lg font-medium w-full text-center py-2 rounded'>Allow Entry</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SecurityLandingPage