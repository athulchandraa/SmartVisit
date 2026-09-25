import React, { useEffect, useState } from 'react'
import VisitorBgImage from '../assets/VisitorBgImage.png'
import CameraAccess from '../Pages/CameraAccess'
import axios from 'axios'
import { toast } from 'react-toastify'
import { PostVisitors } from '../Api/ApiService'
import { useNavigate } from 'react-router-dom'


function VisitorRegistration() {
  const Location=useNavigate()
  const num=Math.round(Math.random()*100000)
  const [visitorData,setVisitorData]=useState({
    name:"",
    phone:"",
    mail:"",
    purpose:"",
    person:"",
    room:"",
    ExpectedTime:"",
    time:"",
    imgUrl:"",
    date:"",
    visitorId:num
  })
  console.log(visitorData);

  
  
  const [Photo,setPhoto]=useState(null)
  //Clodinary Hosting Function
  const uploadImage=async()=>{
    const formData=new FormData();
    formData.append("file",Photo);
    formData.append(
      "upload_preset","smart_visit"
    );
    const response=await axios.post(
      "https://api.cloudinary.com/v1_1/njir3ki1/image/upload",formData
    );
    return response.data.secure_url;
    
  };
  //After Clicking Submit btn
  const userRegistrationBtn=()=>{
    const{name,phone,mail,purpose,person,room,ExpectedTime,imgUrl}=visitorData
    console.log(name,phone,mail,purpose,person,room,ExpectedTime,imgUrl);
    
    if(name && phone && mail && purpose && person && room && ExpectedTime && imgUrl){
      const date=new Date()
      const Todaytime=date.toLocaleTimeString()
      const today=date.toLocaleDateString()  
      const updatedData={...visitorData,time:Todaytime,date:today}
      setVisitorData(updatedData)
      postingToJson(updatedData)
    }else{
      toast.warning("Please complete the form !")
    }
  }

  const postingToJson=async(data)=>{
        const response=await PostVisitors(data)
    if(response.status==201){
      toast.success("Success")
      Location(`/visitor`,{
        state:visitorData
      })
    }else{
      toast.error("Something happened!")
    }
  }




  return (
    <div className='bg-cover bg-center bg-no-repeat h- p-4 text-black'>
      <div>
        <p className='text-3xl text-black font-medium'>Visitor Registration Form</p>
        <p className='text-gray-500'>Fill in your details to get your visitor pass</p>
      </div>
      <form action="">
        <div className='flex justify-between items-center gap-5 mt-5 mb-3'>
          <div className='w-full'>
            <p className='text-sm'>Full Name<span className='text-red-600'>*</span></p>
            <input onChange={(e)=>setVisitorData({...visitorData,name:e.target.value})} className='border rounded px-3 py-0.5 w-full' placeholder='Enter Full Name' required type="text" />
          </div>
          <div className='w-full'>
            <p className='text-sm'>Phone Number <span className='text-red-600'>*</span></p>
            <input onChange={(e)=>setVisitorData({...visitorData,phone:e.target.value})} className='border rounded px-3 py-0.5 w-full' placeholder='Enter Phone number' required type="text" />
          </div>
        </div>
        <div>
          <div className='w-full'>
            <p className='text-sm'>Email <span className='text-red-600'>*</span></p>
            <input value={visitorData.mail} onChange={(e)=>setVisitorData({...visitorData,mail:e.target.value})} className='border rounded px-3 py-0.5 w-full' placeholder='abc@gmail.com' required type="email" />
          </div>
        </div>
        <div className='flex justify-between items-center gap-5 mt-5 mb-3'>
          <div className='w-full'>
            <p className='text-sm'>Purpose of Visit <span className='text-red-600'>*</span></p>
            <input value={visitorData.value} onChange={(e)=>setVisitorData({...visitorData,purpose:e.target.value})} className='border w-full py-0.5 px-3 rounded' placeholder='Enter Purpose of Visit' type="text" />
          </div>
          <div className='w-full'>
            <p className='text-sm'>Person to Meet <span className='text-red-600'>*</span></p>
            <input value={visitorData.value} onChange={(e)=>setVisitorData({...visitorData,person:e.target.value})} className='w-full border py-0.5 px-3 rounded' placeholder='Meeting person name' type="text" />
          </div>
        </div>
        <div className='flex justify-between items-center gap-5 mt-5 mb-3'>
          <div className='w-full'>
            <p className='text-sm'>Room No <span className='text-red-600'>*</span></p>
            <input value={visitorData.value} onChange={(e)=>setVisitorData({...visitorData,room:e.target.value})} className='border w-full py-0.5 px-3 rounded' placeholder='Room Number' type="text" />
          </div>
          <div className='w-full'>
            <p className='text-sm'>Expected Time</p>
            <input value={visitorData.value} onChange={(e)=>setVisitorData({...visitorData,ExpectedTime:e.target.value})} className='w-full border py-0.5 px-3 rounded' type="time" placeholder='24:00' />
          </div>
        </div>
        <div className=''>
          <CameraAccess onPhotoCapture={(file)=>{
            setPhoto(file)
          }}/>
          <button className='bg-green-600 text-white font-medium px-3 py-2 my-1 rounded cursor-pointer' type='button' onClick={async()=>{
            const imageUrl=await uploadImage();
            console.log("Image URL :",imageUrl)
            setVisitorData({...visitorData,imgUrl:imageUrl})
          }}>UploadPhoto</button>
        </div>
      </form>
      <div>
          {
            visitorData.imgUrl ?
            <button onClick={userRegistrationBtn} type='submit' className='bg-purple-600 w-full py-1 my-2 rounded text-white font-medium'>Registor & Get QR Code</button>
          :
          <button disabled className='bg-gray-600 w-full py-1 my-2 rounded text-white font-medium'>Registor & Get QR Code</button>
          }
      </div>
    </div>
  )
}

export default VisitorRegistration