import { useEffect, useState } from 'react'
import AdminSideBar from '../Pages/AdminSideBar'
import { useParams } from 'react-router-dom'
import { GetSecurity, UpdateCheckOutTimeInServer } from '../Api/ApiService'
import { IoMenu } from 'react-icons/io5'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//Clock
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { toast } from 'react-toastify'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};


function SecurityVisitLog() {
  const {id}=useParams()
  const [menuIcon,setMenuIcon]=useState(false)
  const [SearchBox,setSearchBox]=useState("")
  const[searchDate,setSearchDate]=useState("")
  const[SecurityHistory,setSecurityHistory]=useState(null)
  console.log(SecurityHistory);
  const[dataforTimeSet,setDataForTimeSet]=useState(null)
  const[ampm,setampm]=useState("AM")

  //For Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const[checkOutTime,setCheckOutTime]=useState(null)
  console.log(checkOutTime);
  
  

  const thisSecurityHistory=async()=>{
    const response=await GetSecurity()
    setSecurityHistory(response.data.filter(item=>item.id==id)[0].accessed);
  }
  useEffect(()=>{
    thisSecurityHistory()
  },[])


  //Search Function
  const FilterSearch=SecurityHistory?.filter(item=>item?.name.toLowerCase().includes(SearchBox.toLowerCase()))
  const ClearFilter=()=>{
    setSearchBox("")
  }

  //Update UpdateCheckOutBtn
  const UpdateCheckOutBtn=(item)=>{
    setDataForTimeSet(item)
    handleOpen()
  }

  const setCheckoutTimeVisitor=async()=>{
    
    const response=await UpdateCheckOutTimeInServer(id,dataforTimeSet,checkOutTime)
    if(response.status==200){
      toast.success("Checkout Time Updated")
      handleClose()
      thisSecurityHistory()
    }
  }

  return (
     <div className='flex min-h-screen w-full overflow-x-hidden'>
      <AdminSideBar sidebar id={id} menuIcon={menuIcon} setMenuIcon={setMenuIcon}/>
      <div className='ml-0 min-w-0 w-full shadow rounded min-h-screen p-3 sm:p-5 lg:ml-90'>
        <button type="button" aria-label="Open sidebar" className='mb-2 lg:hidden' onClick={()=>setMenuIcon(!menuIcon)}>
          <IoMenu className='text-3xl'/>
        </button>
        <div className='flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 shadow rounded p-3'>
          <div className=''>
            <p className='text-xl font-medium'>Registered Visitors</p>
            <p className='text-gray-600'>View all registered visitors</p>
          </div>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-5'>
            <input value={SearchBox} onChange={(e)=>setSearchBox(e.target.value)} className='w-full sm:w-80 min-w-0 border border-gray-300 px-3 py-1 rounded' type="text" placeholder='Search by Name or ID' />
            {/* <input onChange={(e)=>setSearchDate(e.target.value)} className='border py-1 px-3 border-gray-300 rounded' type="date" placeholder='' /> */}
            <button onClick={ClearFilter} className='px-3 py-1 bg-green-600 text-white rounded'>Clear Filter</button>
          </div>
        </div>
        {
          SecurityHistory ?
          <div className='table-shell mt-5 w-full'>
          <table className='data-table min-w-[68rem]'>
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
              FilterSearch.map((item,index)=>(
                <tr className='border-y text-center'>
              <td className="border-x border-gray-400">{index+1}</td>
              <td className="border-x border-gray-400 text-center">
                <img className='w-10 py-2' src={item?.imgUrl} alt="" />
              </td>
              <td className="">{item.name}</td>
              <td className="border-x border-gray-400">{item?.id}</td>
              <td className="border-x border-gray-400">{item?.phone}</td>
              <td className="border-x border-gray-400">{item?.purpose}</td>
              <td className="border-x border-gray-400">{item?.date}</td>
              <td className="border-x border-gray-400">{item?.ExpectedTime}</td>
              <td className="border-x border-gray-400">{item?.checkout}</td>
              <td className="border-x border-gray-400 py-1 text-center">
                {
                  item?.checkout=="" ?
                  <button onClick={()=>UpdateCheckOutBtn(item)} className='table-action px-3 py-1 bg-green-600 text-white rounded mx-1'>Update Check-Out</button> :
                  <p>Completed</p>
                
                  }
              </td>
            </tr>
              ))
              }
            
          </tbody>
        </table></div> :
        <div className='flex justify-center my-30 items-center'>
          <img className='h-auto w-full max-w-100' src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif" alt="" />
        </div>
        }
      </div>
      {/* Modal */}
        <div className=''>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className='flex justify-between'>
              <button onClick={()=>setampm("AM")} className='bg-gray-600 px-2 text-white py-1 font-medium hover:bg-white hover:text-gray-600'>AM</button>
              <button onClick={()=>setampm("PM")} className='bg-gray-600 px-2 text-white py-1 font-medium hover:bg-white hover:text-gray-600'>PM</button>
            </div>
           
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimeClock onChange={(newvalue)=>{
                setCheckOutTime(`${newvalue.format("hh:mm")} ${ampm}`)
              }}/>
            </LocalizationProvider>
            <div className='flex justify-center'>
              <p className='shadow rounded py-1 px-3 text-green-600 font-bold'>{checkOutTime}</p>
            </div>
            <div className='flex justify-center'>
              <button onClick={setCheckoutTimeVisitor} className='px-3 py-1 text-white bg-green-600 font-medium rounded mt-5'>Set Checkout Time</button>
            </div>
          </div>
        </Box>
      </Modal>
      
        </div>

    </div>
  )
}

export default SecurityVisitLog