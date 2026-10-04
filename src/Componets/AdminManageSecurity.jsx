import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify'
import AdminSideBar from '../Pages/AdminSideBar'
import { AiOutlineUserAdd } from "react-icons/ai";
import { DltGuard, GetSecurity, PostSecurity, UpdateGuardsData } from '../Api/ApiService';
import { GoDotFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import Swal from 'sweetalert2';
import { FaBackward } from "react-icons/fa";
import { FaForward } from 'react-icons/fa6';
import { IoMenu } from 'react-icons/io5';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: { xs: 2, sm: 4 },
  width: { xs: '92vw', sm: 'min(60vw, 900px)' },
  maxHeight: '90vh',
  overflowY: 'auto'
};


function AdminManageSecurity() {

  React.useEffect(()=>{
    AllSecurity()
  },[])


  const[SearchInput,setSearchInput]=React.useState("")
  const [filterItem,setFilterItem]=React.useState("")
  const [isUpdate,setIsUpdate]=React.useState(false)
  const[UpdatedData,setUpdatedData]=React.useState(null)

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
    accessed:[]
  })
  const[allsecurity,setAllsecurity]=React.useState([])


  //Pagination
  const [currentPage,setCurrentPage]=React.useState(1)
  const ItemsPerPage=6
  const TotalPages=Math.ceil(allsecurity.length/ItemsPerPage)
  const CurrentPageLastIndex=currentPage*ItemsPerPage
  const CurrentPageFirstIndex=CurrentPageLastIndex-ItemsPerPage
  const visibleItemArray=allsecurity.slice(CurrentPageFirstIndex,CurrentPageLastIndex)

  //For Responsive
    const[menuIcon,setMenuIcon]=React.useState(false)


  const AddGuards=async(e)=>{
    e.preventDefault();
    setIsUpdate(false)
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

  //Update Security
  const UpdateSecurity=(thisGuard)=>{
    setIsUpdate(true)
    handleOpen()
    setUpdatedData(thisGuard)
  }
  const UpdateGuards=async()=>{
    const response=await UpdateGuardsData(UpdatedData)
    
  }



    

  return (
    <div className='flex min-h-screen w-full overflow-x-hidden'>
        <AdminSideBar
        menuIcon={menuIcon}
        setMenuIcon={setMenuIcon}
        />
      <div className='ml-0 min-w-0 w-full shadow rounded min-h-screen p-3 sm:p-5 lg:ml-90'>
        <div className='flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 shadow rounded p-3'>

          <div className='flex items-center gap-5'>
            {
              !menuIcon &&
              <div>
              <button type="button" aria-label="Open sidebar" className='lg:hidden' onClick={()=>setMenuIcon(!menuIcon)}>
                <IoMenu className='text-3xl'/>
              </button>
            </div>}
            <div>
              <p className='text-xl font-medium'>Manage Security Staff</p>
              <p className='text-gray-600'>Add,view and manage security personnel</p>
            </div>
          </div>
          {/* <div className='flex gap-5'>
            <input className='border border-gray-300  px-3 py-1 w-80 rounded' type="text" placeholder='Search by Name or ID' />
            <input className='border py-1 px-3 border-gray-300 rounded' type="date" placeholder='' />
          </div> */}
          <div className='sm:shrink-0'>
            <button onClick={handleOpen} className='px-3 py-1 bg-blue-600 text-white rounded font-medium'>+ Add Security</button>
          </div>
        </div>
        <div className='p-2 shadow my-2'>
          <div className='flex flex-col lg:flex-row lg:justify-between gap-3'>
            <div className='relative flex min-w-0 items-center'>
              <CiSearch className='absolute left-1 text-2xl text-gray-400'/>
              <input onChange={(e)=>setSearchInput(e.target.value)} className='w-full min-w-0 border rounded border-gray-400 px-7 py-1' placeholder='Search by name,Id,phone' type="text" /></div>
            <div className='flex flex-wrap items-center gap-3 sm:gap-5'>
              <select onChange={(e)=>setFilterItem(e.target.value)} className='max-w-full border px-4 sm:px-10 py-1 rounded' name="" id="">
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
        <div className='table-shell mt-1 w-full'>
        <table className='data-table min-w-[58rem]'>
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
              <td className="text-center w-20 h-20">
                <img className='py-2 rounded-full object-cover' src={item.image} alt="" />
              </td>
              <td className="font-medium">{item.name}</td>
              <td className="font-bold">SEC{item.securityId}</td>
              <td className="">{item.phone}</td>
              <td className="">{item.password}</td>
              <td className="">{item.status =="active" ? <p className='table-status bg-green-100 text-green-700'><GoDotFill/>Active</p> : <p className='table-status bg-red-100 text-red-700'><GoDotFill/>Inactive</p>}</td>
              <td className="">
                <button onClick={()=>UpdateSecurity(item)} className='table-action px-3 py-1 bg-blue-600 text-white rounded mx-1 my-1'>Update</button>
                <button onClick={(e)=>DltSecurity(item?.id)} className='table-action px-3 py-1 bg-red-600 text-white rounded mx-1 my-1'>Delete</button>
              </td>
            </tr>
            
              ))
              }
            
          </tbody>
        </table></div>
        
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
          {
            isUpdate ? 
            <p className='text-xl font-medium my-2'>Update Security</p> :
            <p className='text-xl font-medium my-2'>Add Security</p>}
          <hr className='text-gray-400'/>
          {
            isUpdate ?
            <form onSubmit={UpdateGuards} className='my-2' action="">
            <div>
              <input value={UpdatedData.name} onChange={(e)=>{setUpdatedData({...UpdatedData,name:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' placeholder='Enter Full name' type="text" required />
            </div>
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 justify-around'>
                <input value={UpdatedData.image} onChange={(e)=>{setUpdatedData({...UpdatedData,image:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' placeholder='Image URL' type="text" required />
              </div>
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 items-stretch sm:items-center'>
                <select value={UpdatedData.gender} onChange={(e)=>{setUpdatedData({...UpdatedData,gender:e.target.value})}} className='border rounded py-1 px-3 w-full mt-4.5' name="" id="">
                  <option value="" hidden>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div>
                  <p className='text-sm text-red-600 font-medium'>Date of Birth</p>
                  <input value={UpdatedData.dob} onChange={(e)=>{setUpdatedData({...UpdatedData,dob:e.target.value})}} type="date" className='border sm:mt-2 lg:mt-0 px-3 py-1 rounded w-full ' /></div>
               
              </div>
              <div className=''>
                <input value={UpdatedData.mail} onChange={(e)=>{setUpdatedData({...UpdatedData,mail:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' placeholder='Email' type="mail" required />
                <input value={UpdatedData.phone} onChange={(e)=>{setUpdatedData({...UpdatedData,phone:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' type="text" placeholder='Phone' required />
              </div>
              <div className='mt-5 flex flex-col-reverse sm:flex-row gap-3 justify-end'>
                <button type='reset' className='px-3 py-2 bg-gray-300 font-medium rounded'>Clear</button>
                <button type='submit' className='px-3 py-2 bg-blue-700 text-white font-medium rounded flex gap-2 items-center justify-center'><AiOutlineUserAdd className='text-xl'/>Update</button>
              </div>

          </form> :
            <form onSubmit={AddGuards} className='my-2' action="">
            <div>
              <input onChange={(e)=>{setSecurity({...addSecurity,name:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' placeholder='Enter Full name' type="text" required />
            </div>
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 justify-around'>
                <input onChange={(e)=>{setSecurity({...addSecurity,image:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' placeholder='Image URL' type="text" required />
                <input onChange={(e)=>{setSecurity({...addSecurity,securityId:e.target.value})}} className='border px-3 py-1 rounded my-2 w-full' type="text" placeholder='Enter Security ID' required />
              </div>
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 items-stretch sm:items-center'>
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
              <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5'>
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
              <div className='mt-5 flex flex-col-reverse sm:flex-row gap-3 justify-end'>
                <button type='reset' className='px-3 py-2 bg-gray-300 font-medium rounded'>Clear</button>
                <button type='submit' className='px-3 py-2 bg-blue-700 text-white font-medium rounded flex gap-2 items-center justify-center'><AiOutlineUserAdd className='text-xl'/>Add Security</button>
              </div>
          </form>}
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