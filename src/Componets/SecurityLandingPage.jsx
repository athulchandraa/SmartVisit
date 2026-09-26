import React, { useEffect, useRef, useState } from 'react'
import AdminSideBar from '../Pages/AdminSideBar'
import { useParams } from 'react-router-dom'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { Html5Qrcode } from 'html5-qrcode'
import { AccessedVisitors, DltVisitor, VisitorsList } from '../Api/ApiService'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'


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

    //Entry Rejected
    const EntryReject=()=>{
      // sweet Alert
      Swal.fire({
        title: "Are you sure want to Reject Entry !",
        icon: "question",
        iconHtml: "?",
        confirmButtonText: "YES",
        cancelButtonText: "NO",
        showCancelButton: true,
        showCloseButton: true
      }).then((Btnresult)=>{
        if(Btnresult.isConfirmed){
          //DELETE THIS VISITOR FROM DATA BASE
          DltVisitor(result)
          toast.success("Deleted Success")
          window.location.reload()
        }else{
          toast.error("Something went Wrong...")
        }
      })
    }

    //Entry Accepter
    const EntryAccept=async()=>{
      const ResponseAfterAccepted=allVisitorsList.filter(item=>item.id==result)
      console.log(ResponseAfterAccepted);
      const responseAfterAccept=await AccessedVisitors(id,ResponseAfterAccepted)
      if(responseAfterAccept.status==200){
        toast.success("Success")
        DeleteVisitorAfterVerified(ResponseAfterAccepted[0].id)
       
      }else{
        toast.error("Failed!")
      }
    }

    // delete From Visitor Table Instantly
    const DeleteVisitorAfterVerified=async(idOfVisitor)=>{
      await DltVisitor(idOfVisitor)
      window.location.reload()
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
        <div className='grid grid-cols-2 mt-5 gap-2'>
          <div className='shadow p-3'>
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
                  <h3 className='text-green-600 font-medium'>Scan Successful!</h3>
                  <p></p>
                </div>
              )
            }
          </div>
          {
            result ?
            <div className='shadow p-3'>
            <p className='font-medium text-xl my-3'>Visitor Details</p>
            
                
                {
                  allVisitorsList?.find(item=>item.id==result)?
                  allVisitorsList?.filter(item=>item.id==result)?.map(item=>(
                    <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-1'>
                {/* image */}
                <img className='w-50 h-45 rounded shadow p-2' src={item.imgUrl} alt="" />
              </div>
              <div className='col-span-2 shadow p-2 flex justify-center'>
                  {/* Visitor Details */}
                  <div className='grid grid-cols-[170px_1fr] gap-y-3 gap-x-5 '>
                <span className='text-gray-500'>Unique ID</span>
                <span className='font-semibold'>{item.id}</span>
  
                <span className='text-gray-500'>Name of Visitor</span>
                <span className='font-semibold'>{item.name}</span>
  
                <span className='text-gray-500'>Visit Person</span>
                <span className='font-semibold'>{item.person}</span>
  
                <span className='text-gray-500'>Room no</span>
                <span className='font-semibold'>{item.room}</span>
  
                <span className='text-gray-500'>Visit Purpose</span>
                <span className='font-semibold'>{item.purpose}</span>
  
                <span className='text-gray-500'>Phone</span>
                <span className='font-semibold'>{item.phone}</span>
  
                <span className='text-gray-500'>Visit Time</span>
                <span className='font-semibold'>{item.ExpectedTime}</span>
  
              </div>
              </div>

                </div>
                  ))
                   :
                <div className='text-3xl font-medium text-red-700'>Invalid User</div>
                } 
            
            {
              allVisitorsList?.find(item=>item.id==result)?
              <div>
              <div className='w-full bg-green-200 py-2 text-center font-semibold text-lg rounded text-green-900 flex items-center gap-2 justify-center mt-5 mb-2'>
                <IoCheckmarkCircle className='text-3xl'/>
                Valid Visitor
              </div>
              <div className='flex gap-2'>
                <button onClick={()=>EntryAccept()} className='bg-green-800 text-white text-lg font-medium w-full text-center py-2 rounded my-2 cursor-pointer'>Allow Entry</button>
                <button onClick={()=>EntryReject()} className='bg-red-800 text-white text-lg font-medium w-full text-center py-2 rounded my-2 cursor-pointer'>Reject Entry</button>
              </div>
            </div>:
            <div className='text-red-600 font-medium'>
              <p>Ask Him to Register and Come back Again!</p>
              <img className='h-100' src="https://assets-v2.lottiefiles.com/a/7b2dd664-117a-11ee-9e64-fba3b59c5600/UEUIyVlGDt.gif" alt="" />
              </div>}
          </div> :
          <div className='shadow rounded p-3'>
            <div className=' flex justify-center items-center'>
                <p className='text-2xl font-medium text-green-600'>Scan Visitor QR Code !</p>
            </div>
            <div>
              <img src="https://assets-v2.lottiefiles.com/a/f1a5aefe-116e-11ee-8abb-fbf02196d0e2/3mUCknrNr9.gif" alt="" />
            </div>
          </div>
            }

        </div>
      </div>
    </div>
  )
}

export default SecurityLandingPage