import { QRCodeCanvas } from 'qrcode.react';
import React, { useEffect, useRef, useState } from 'react'
import { FaDownload } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { Link, useLocation, useParams } from 'react-router-dom';
import { VisitorsList } from '../Api/ApiService';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';



function VisitorPass() {

  const Location=useLocation()
  const[allVisitor,setAllVisitor]=useState()
  console.log(allVisitor);

  //All Users
  const allUser=async()=>{
    const Prevdata=Location.state
    const response=await VisitorsList()
    setAllVisitor(response.data.find(item=>item.visitorId==Prevdata.visitorId))
  }

  useEffect(()=>{
    allUser()
  },[])

  const date=new Date()


  //For Pdf Download
  const passRef=useRef(null)
  const downloadPdf=async()=>{
    if(!passRef.current)return
    try{
      const image=await toPng(passRef.current,{
        backgroundColor:"#ffffff",pixelRatio:2
      });

      const pdf=new jsPDF("p","mm","a4")
      const imgWidth=170
      const originalWidth=passRef.current.offsetWidth;
      const originalHeight=passRef.current.offsetHeight;

      const imgHeight=(originalHeight*imgWidth)/originalWidth;

      pdf.addImage(image,"PNG",20,20,imgWidth,imgHeight)
      pdf.save("VisitorPass.pdf")
    }catch(error){
      console.log(error)
    }
  }
  
  return (
    <div className='flex h-screen justify-center items-center'>
      
        {
          allVisitor ?
          <div className='shadow rounded px-4 py-5 w-120'>
          <div ref={passRef}>
            <p className='font-medium text-center text-2xl'>Your Visitor Pass</p>
            <div className='flex justify-center mt-8'>
              <div className='flex justify-center'>
                <QRCodeCanvas value={allVisitor?.id} size={200} level='H'/>
              </div>
            </div>
            <hr className='mt-5 text-gray-300'/>
            <div className='flex justify-center my-5'>
              
              <div className='grid grid-cols-[250px_1fr] gap-y-3 gap-x-5 text-sm'>
                <span className='text-gray-500'>Unique ID</span>
                <span className='font-semibold'>{allVisitor.id}</span>
  
                <span className='text-gray-500'>Name of Visitor</span>
                <span className='font-semibold'>{allVisitor.name}</span>
  
                <span className='text-gray-500'>Visit Person</span>
                <span className='font-semibold'>{allVisitor.person}</span>
  
                <span className='text-gray-500'>Room no</span>
                <span className='font-semibold'>{allVisitor.room}</span>
  
                <span className='text-gray-500'>Visit Purpose</span>
                <span className='font-semibold'>{allVisitor.purpose}</span>
  
                <span className='text-gray-500'>Valid on</span>
                <span className='font-semibold'>{
                    date.toLocaleDateString()
                    }</span>
  
                <span className='text-gray-500'>Visit Time</span>
                <span className='font-semibold'>{allVisitor.ExpectedTime}</span>
  
                <span className='text-gray-500'>Visit Purpose</span>
                <span className='font-semibold'>{allVisitor.purpose}</span>
  
              </div>
            </div>
          </div>
          <div className='my-2 w-full'>
            <button onClick={downloadPdf} className='bg-green-600 px-3 py-2 w-full rounded text-white font-medium mb-2 flex justify-center items-center gap-2'><FaDownload/>Download QR Code</button>
            <Link to={'/visitorregistration'} className='bg-blue-600 px-3 py-2 w-full rounded text-white font-medium flex items-center justify-center gap-2'><GrPowerReset/>Register Another Visitor</Link>
          </div>
        </div> :
          <div>
            <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif" alt="" />
          </div> 
        }
    </div>
  )
}

export default VisitorPass