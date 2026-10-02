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
    <div className='flex min-h-screen w-full justify-center items-center overflow-x-hidden p-3 sm:p-5'>
      
        {
          allVisitor ?
          <div className='w-full max-w-xl shadow rounded px-3 py-4 sm:px-4 sm:py-5'>
          <div ref={passRef}>
            <p className='font-medium text-center text-2xl'>Your Visitor Pass</p>
            <div className='flex justify-center mt-8'>
              <div className='flex justify-center'>
                <QRCodeCanvas value={allVisitor?.id} size={200} level='H'/>
              </div>
            </div>
            <hr className='mt-5 text-gray-300'/>
            <div className='flex justify-center my-5'>
              
              <div className='grid w-full grid-cols-[minmax(0,110px)_minmax(0,1fr)] gap-x-2 gap-y-3 text-xs sm:grid-cols-[minmax(0,160px)_minmax(0,1fr)] sm:gap-x-5 sm:text-sm'>
                <span className='text-gray-500'>Unique ID</span>
                <span className='min-w-0 break-words font-semibold'>{allVisitor.id}</span>
  
                <span className='text-gray-500'>Name of Visitor</span>
                <span className='min-w-0 break-words font-semibold'>{allVisitor.name}</span>
  
                <span className='text-gray-500'>Visit Person</span>
                <span className='min-w-0 break-words font-semibold'>{allVisitor.person}</span>
  
                <span className='text-gray-500'>Room no</span>
                <span className='min-w-0 break-words font-semibold'>{allVisitor.room}</span>
  
                <span className='text-gray-500'>Visit Purpose</span>
                <span className='min-w-0 break-words font-semibold'>{allVisitor.purpose}</span>
  
                <span className='text-gray-500'>Valid on</span>
                <span className='font-semibold'>{
                    date.toLocaleDateString()
                    }</span>
  
                <span className='text-gray-500'>Visit Time</span>
                <span className='min-w-0 break-words font-semibold'>{allVisitor.ExpectedTime}</span>
  
                <span className='text-gray-500'>Visit Purpose</span>
                <span className='min-w-0 break-words font-semibold'>{allVisitor.purpose}</span>
  
              </div>
            </div>
          </div>
          <div className='my-2 w-full'>
            <button onClick={downloadPdf} className='bg-green-600 px-3 py-2 w-full rounded text-white font-medium mb-2 flex justify-center items-center gap-2'><FaDownload/>Download QR Code</button>
            <Link to={'/visitorregistration'} className='bg-blue-600 px-3 py-2 w-full rounded text-white font-medium flex items-center justify-center gap-2'><GrPowerReset/>Register Another Visitor</Link>
          </div>
        </div> :
          <div>
            <img className='h-auto w-full max-w-sm' src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif" alt="" />
          </div> 
        }
    </div>
  )
}

export default VisitorPass