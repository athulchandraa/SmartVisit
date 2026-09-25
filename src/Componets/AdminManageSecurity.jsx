import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify'
import AdminSideBar from '../Pages/AdminSideBar'
import { AiOutlineUserAdd } from "react-icons/ai";
import { DltGuard, GetSecurity, PostSecurity } from '../Api/ApiService';
import { GoDotFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import Swal from 'sweetalert2';
import { FaBackward } from "react-icons/fa";
import { FaForward } from 'react-icons/fa6';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width:'60%',
  maxWidth:'900px'
};


function AdminManageSecurity() {

  React.useEffect(()=>{
    AllSecurity()
  },[])


  const[SearchInput,setSearchInput]=React.useState("")
  const [filterItem,setFilterItem]=React.useState("")

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addSecurity,setSecurity]=React.useState({
    name:"",
    image:"",
    securityId:"",
    gender:"",
    dob:"",
    mail:"",
    phone:"",
    password:"",
    confirmpassword:"",
    status:"",
    accessed:[{
      name:"",
      checkin:"",
      checkout:""
    }]
  })
  const[allsecurity,setAllsecurity]=React.useState([])


      //Pagination
  const [currentPage,setCurrentPage]=React.useState(1)
  const ItemsPerPage=6
  const TotalPages=Math.ceil(allsecurity.length/ItemsPerPage)
  const CurrentPageLastIndex=currentPage*ItemsPerPage
  const CurrentPageFirstIndex=CurrentPageLastIndex-ItemsPerPage
  const visibleItemArray=allsecurity.slice(CurrentPageFirstIndex,CurrentPageLastIndex)



  const AddGuards=async(e)=>{
    e.preventDefault();
    if(addSecurity.password==addSecurity.confirmpassword){
      const response=await PostSecurity(addSecurity)
        AllSecurity()
        toast.success("Done")
        handleClose()
    }else{
      toast.error("Error")
    }
  }

  //Get Security Data
  const AllSecurity=async()=>{
    const response=await GetSecurity()
    setAllsecurity(response.data)
  }

  //Delete Security
  const DltSecurity=async(id)=>{
    Swal.fire({
  title:"Are you want to delete Security",
  icon: "question",
  iconHtml: "?",
  confirmButtonText: "Yes",
  cancelButtonText: "No",
  showCancelButton: true,
  showCloseButton: true
  }).then(async(result)=>{
    if(result.isConfirmed){
      const response=await DltGuard(id)
      toast.success("Done")
      setAllsecurity(allsecurity.filter(item=>item.id!=id))
    }
  })
  }

  const BackwardBtn=()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }
  const ForwardBtn=()=>{
    if(currentPage!=TotalPages){
      setCurrentPage(currentPage+1)
    }
  }

  //Search Part
  const FilterSearch=visibleItemArray?.filter(item=>item.name.toLowerCase().includes(SearchInput.toLowerCase())).filter(item=>filterItem==="" || item.status==filterItem)
  //Filter By Active or Inactive 


    

  return (
    <div className='flex'>
      <AdminSideBar/>
      <div className='ml-90 shadow rounded h-screen w-full p-5'>
        <div className='flex justify-between items-center shadow rounded p-3'>
          <div className=''>
            <p className='text-xl font-medium'>Manage Security Staff</p>
            <p className='text-gray-600'>Add,view and manage security personnel</p>
          </div>
          {/* <div className='flex gap-5'>
            <input className='border border-gray-300  px-3 py-1 w-80 rounded' type="text" placeholder='Search by Name or ID' />
            <input className='border py-1 px-3 border-gray-300 rounded' type="date" placeholder='' />
          </div> */}
          <div>
            <button onClick={handleOpen} className='px-3 py-1 bg-blue-600 text-white rounded font-medium'>+ Add Security</button>
          </div>
        </div>
        <div className='p-2 shadow my-2'>
          <div className='flex justify-between'>
            <div className='flex items-center'>
              <CiSearch className='text-2xl text-gray-400 fixed ml-1'/>
              <input onChange={(e)=>setSearchInput(e.target.value)} className='border  rounded border-gray-400 px-7 py-1' placeholder='Search by name,Id,phone' type="text" /></div>
            <div className='flex items-center gap-5'>
              <select onChange={(e)=>setFilterItem(e.target.value)} className='border px-10 py-1 rounded' name="" id="">
                <option hidden>All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div>
                <button onClick={()=>setFilterItem("")} className='bg-green-600 px-3 py-1 text-white rounded font-medium'>Clear Filter</button>
              </div>
            </div>
          </div>
        </div>
        <table className='mt-1 w-full'>
          <tr className='bg-blue-100'>
            <th className='py-2 px-2'>#</th>
            <th className=''>Photo</th>
            <th className=''>Name</th>
            <th className=''>Security ID</th>
            <th className=''>Phone</th>
            <th className=''>Password</th>
            <th className=''>Status</th>
            <th className=''>Action</th>
          </tr>
          <tbody>
            {/* Duplicate */}
            {
              FilterSearch ?.map((item,index)=>(
              <tr key={item.id} className=' text-center'>
              <td className="">{index+1}</td>
              <td className=" text-center flex justify-center">
                <img className='py-2 rounded-full w-20 h-20 object-cover' src={item.image} alt="" />
              </td>
              <td className="font-medium">{item.name}</td>
              <td className="font-bold">SEC{item.securityId}</td>
              <td className="">{item.phone}</td>
              <td className="">{item.password}</td>
              <td className="">{item.status =="active" ? <p className='flex items-center gap-1  rounded-xl bg-green-200 text-green-700 justify-center font-medium py-0.5'><GoDotFill/>Active</p> : <p className='flex items-center gap-1  rounded-xl bg-red-200 text-red-700 justify-center font-medium py-0.5'><GoDotFill/>Inactive</p>}</td>
              <td className="">
                <button className='px-3 py-1 bg-blue-600 text-white rounded mx-2 '>Update</button>
                <button onClick={(e)=>DltSecurity(item?.id)} className='px-3 py-1 bg-red-600 text-white rounded mx-2'>Delete</button>
              </td>
            </tr>
            
              ))
              }
            
          </tbody>
        </table>
        
        {/* Modal Only triggered when button clicked */}
        <div>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Security
          </Typography> */}
          <p className='text-xl font-medium my-2'>Add Security</p>
          <hr className='text-gray-400'/>
          <form onSubmit={AddGuards} className='my-2' action="">
            <div>
              <input onChange={(e)=>{setSecurity({...addSecurity,name:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' placeholder='Enter Full name' type="text" required />
            </div>
              <div className='flex gap-5 justify-around'>
                <input onChange={(e)=>{setSecurity({...addSecurity,image:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' placeholder='Image URL' type="text" required />
                <input onChange={(e)=>{setSecurity({...addSecurity,securityId:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' type="text" placeholder='Enter Security ID' required />
              </div>
              <div className='flex gap-5 items-center'>
                <select onChange={(e)=>{setSecurity({...addSecurity,gender:e.target.value})}} className='border rounded py-1 px-3 w-full' name="" id="">
                  <option value="" hidden>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input onChange={(e)=>{setSecurity({...addSecurity,dob:e.target.value})}} type="date" className='border sm:mt-2 lg:mt-0 px-3 py-1 rounded w-full ' />
              </div>
              <div className=''>
                <input onChange={(e)=>{setSecurity({...addSecurity,mail:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' placeholder='Email' type="mail" required />
                <input onChange={(e)=>{setSecurity({...addSecurity,phone:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' type="text" placeholder='Phone' required />
              </div>
              <div className='flex items-center gap-5'>
                <input onChange={(e)=>{setSecurity({...addSecurity,password:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' placeholder='Enter Password' type="password" required />
                <input onChange={(e)=>{setSecurity({...addSecurity,confirmpassword:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' type="text" placeholder='Confirm Password' required />
              </div>
              <div>
                <select onChange={(e)=>{setSecurity({...addSecurity,status:e.target.value})}} className='border rounded px-3 py-1' name="" id="">
                  <option hidden value="active">Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Not Active</option>
                </select>
              </div>
              <div className='mt-5 flex gap-3 justify-end'>
                <button type='reset' className='px-3 py-2 bg-gray-300 font-medium rounded'>Clear</button>
                <button type='submit' className='px-3 py-2 bg-blue-700 text-white font-medium rounded flex gap-2 items-center'><AiOutlineUserAdd className='text-xl'/>Add Security</button>
              </div>
          </form>
        </Box>
      </Modal>
        </div>
        {
          allsecurity?.length>ItemsPerPage &&
          <div className='flex items-center justify-center'>
          <button onClick={BackwardBtn} className='mx-2'><FaBackward/></button>
          {currentPage} of {TotalPages}
          <button onClick={ForwardBtn} className='mx-2'><FaForward/></button>
        </div>}
      </div>
      

    </div>
  )
}

export default AdminManageSecurity