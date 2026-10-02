import React, { useEffect, useRef, useState } from 'react'
import AdminSideBar from '../Pages/AdminSideBar'
import { useParams } from 'react-router-dom'
import { IoCheckmarkCircle, IoMenu } from 'react-icons/io5'
import { Html5Qrcode } from 'html5-qrcode'
import { AccessedVisitors, DltVisitor, GetSecurity, VisitorsList } from '../Api/ApiService'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { FaArrowRight } from 'react-icons/fa'
import { CgSmileSad } from 'react-icons/cg'


function SecurityLandingPage() {
  const {id}=useParams()

  const [allVisitorsList,setAllVisitorsList]=useState(null)
  const[SpecificVis,setSpecificVis]=useState(null)
  console.log(allVisitorsList);
  const[thisSecurity,setThisSecurity]=useState(null)
  console.log(thisSecurity);

  //For Responsive
  const[menuIcon,setMenuIcon]=useState(false)
  

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
      allVisitors(),
      CurrentGuard()
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

    //Status wise Operation
    const CurrentGuard=async()=>{
      const response=await GetSecurity()
      const response1=response.data;
      setThisSecurity(response1.filter(item=>item?.id==id)[0].status);
    }

    //Play Sound
    const PlaySound=()=>{
      const audio=new Audio("/BeepSound.mp3")
      audio.play().catch(console.error)
    }

    useEffect(()=>{
      if(result){
        PlaySound()
      }
    },[result])




  
  return (
    <div className='flex min-h-screen w-full overflow-x-hidden'>
      <AdminSideBar sidebar id={id}
          menuIcon={menuIcon}
          setMenuIcon={setMenuIcon}
          />
      {
        thisSecurity=="active" ?
        <div className='ml-0 min-w-0 w-full shadow rounded min-h-screen p-3 sm:p-5 lg:ml-90'>
          <div className='flex min-w-0 items-center gap-3 sm:gap-5'>
            {
              !menuIcon &&
              <button type="button" aria-label="Open sidebar" className='lg:hidden' onClick={()=>setMenuIcon(!menuIcon)}>
                <IoMenu className='text-3xl'/>
              </button>}
          <div className='min-w-0 p-2'>
            <p className='text-2xl sm:text-3xl font-medium'>Scan Visitor QR Code</p>
            <p className='text-sm sm:text-base text-gray-600'>Point the camera at the visitor's QR Code</p>
          </div>
          </div>
        <div className='mt-5 grid min-w-0 grid-cols-1 gap-2 xl:grid-cols-2'>
          <div className='min-w-0 shadow p-3 text-center'>
            {/* Scanner */}
            {!isScanning && (
              <button onClick={()=>{
                setResult("")
                setIsScanning(true)
              }} className='w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded'>Scan QR Code</button>
            )}

            {
              isScanning && (
                <div id='reader' className='w-full max-w-sm mx-auto overflow-hidden'></div>
              )
            }
            {
              result &&(
                <div className='mt-5 p-4 bg-green-100 rounded'>
                  <h3 className='text-green-600 font-medium'>Scan Successful!</h3>
                </div>
              )
            }
          </div>
          {
            result ?
            <div className='min-w-0 shadow p-3'>
            <p className='font-medium text-xl my-3'>Visitor Details</p>
            
                
                {
                  allVisitorsList?.find(item=>item.id==result)?
                  allVisitorsList?.filter(item=>item.id==result)?.map(item=>(
                    <div className='grid min-w-0 grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,1fr)_2fr]'>
              <div className='col-span-1'>
                {/* image */}
                <img className='aspect-[10/9] h-auto w-full max-w-50 rounded object-cover shadow p-2' src={item.imgUrl} alt="" />
              </div>
              <div className='min-w-0 shadow p-2 flex justify-center'>
                  {/* Visitor Details */}
                  <div className='grid w-full min-w-0 grid-cols-[minmax(0,110px)_minmax(0,1fr)] gap-x-2 gap-y-3 sm:grid-cols-[minmax(0,130px)_minmax(0,1fr)] sm:gap-x-3 xl:grid-cols-[170px_minmax(0,1fr)]'>
                <span className='text-gray-500'>Unique ID</span>
                <span className='min-w-0 break-words font-semibold'>{item.id}</span>
  
                <span className='text-gray-500'>Name of Visitor</span>
                <span className='min-w-0 break-words font-semibold'>{item.name}</span>
  
                <span className='text-gray-500'>Visit Person</span>
                <span className='min-w-0 break-words font-semibold'>{item.person}</span>
  
                <span className='text-gray-500'>Room no</span>
                <span className='min-w-0 break-words font-semibold'>{item.room}</span>
  
                <span className='text-gray-500'>Visit Purpose</span>
                <span className='min-w-0 break-words font-semibold'>{item.purpose}</span>
  
                <span className='text-gray-500'>Phone</span>
                <span className='min-w-0 break-words font-semibold'>{item.phone}</span>
  
                <span className='text-gray-500'>Visit Time</span>
                <span className='min-w-0 break-words font-semibold'>{item.ExpectedTime}</span>
  
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
              <div className='flex flex-col gap-2 sm:flex-row'>
                <button onClick={()=>EntryAccept()} className='min-w-0 bg-green-800 text-white text-lg font-medium w-full text-center py-2 rounded my-2 cursor-pointer'>Allow Entry</button>
                <button onClick={()=>EntryReject()} className='min-w-0 bg-red-800 text-white text-lg font-medium w-full text-center py-2 rounded my-2 cursor-pointer'>Reject Entry</button>
              </div>
            </div>:
            <div className='text-red-600 font-medium'>
              <p>Ask Him to Register and Come back Again!</p>
              <img className='mx-auto h-auto max-h-100 w-full max-w-full object-contain' src="https://assets-v2.lottiefiles.com/a/7b2dd664-117a-11ee-9e64-fba3b59c5600/UEUIyVlGDt.gif" alt="" />
              </div>}
          </div> :
          <div className='min-w-0 shadow rounded p-3'>
            <div className=' flex justify-center items-center'>
                <p className='text-xl sm:text-2xl font-medium text-green-600'>Scan Visitor QR Code !</p>
            </div>
            <div>
              <img className='h-auto w-full max-w-full object-contain' src="https://assets-v2.lottiefiles.com/a/f1a5aefe-116e-11ee-8abb-fbf02196d0e2/3mUCknrNr9.gif" alt="" />
            </div>
          </div>
            }

        </div>
      </div> :
      <div className='ml-0 min-w-0 w-full p-2 lg:ml-90'>
        {!menuIcon && (
          <button type="button" aria-label="Open sidebar" className='lg:hidden' onClick={()=>setMenuIcon(!menuIcon)}>
            <IoMenu className='text-3xl'/>
          </button>
        )}
        <div className='shadow w-full min-h-screen p-4 sm:p-10 flex flex-col justify-center items-center'>
              <img className='h-auto w-full max-w-100 object-contain' src="https://media.lordicon.com/icons/wired/outline/2100-wifi-cross.gif" alt="" />
              <div className='text-center'>
                <p className='my-2'>It seems You are Offline!😔</p>
                <p className='font-medium text-xl sm:text-2xl'>Steps for Switch online</p>
                <p className='flex flex-col justify-center items-center gap-2 font-medium text-base sm:flex-row sm:gap-5 sm:text-lg'>My Profile <FaArrowRight className='rotate-90 sm:rotate-0'/> <span>Change <span className='text-red-600'>Inactive</span> to <span className='text-green-600'>Active</span></span></p>
              </div>
        </div>
      </div>
      }
    </div>
  )
}

export default SecurityLandingPage