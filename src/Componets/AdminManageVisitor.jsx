import React, { useEffect, useState } from 'react'
import AdminSideBar from '../Pages/AdminSideBar'
import { DltVisitor, GetSecurity, VisitorsList } from '../Api/ApiService'
import { FaBackward, FaForward } from 'react-icons/fa'
import { IoMenu } from 'react-icons/io5'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'



function AdminManageVisitor() {

  
  const [allVisitors,setAllVisitors]=useState(null)
  const[searchItem,setSearchItem]=useState("")
  console.log(allVisitors);
  const[VerifiedVisitor,setVerifiedVisitor]=useState(false)
  const[allSecurityData,setAllSecurityData]=useState(null)
  console.log(allSecurityData);
  
    //Pagination
    // const [currentPage,setCurrentPage]=React.useState(1)
    // const ItemsPerPage=10
    // const TotalPages=Math.ceil(allVisitors?.length/ItemsPerPage)
    // const CurrentPageLastIndex=currentPage*ItemsPerPage
    // const CurrentPageFirstIndex=CurrentPageLastIndex-ItemsPerPage
    // const visibleItemArray=allVisitors?.slice(CurrentPageFirstIndex,CurrentPageLastIndex)
  //For Responsive
      const[menuIcon,setMenuIcon]=React.useState(false)

    // const PrevPage=()=>{
    //   if(TotalPages!=1){
    //     setCurrentPage(currentPage-1)
    //   }
    // }

    // const NextPage=()=>{
    //   if(currentPage!=TotalPages){
    //     setCurrentPage(currentPage+1)
    //   }
    // }

  const GettingAllUsers=async()=>{
    const response=await VisitorsList()
    setAllVisitors(response.data)
  }
    useEffect(()=>{
      GettingAllUsers(),
      AllSecurity()
    },[])

    //Search Component
    const FilterSearch=allVisitors?.filter(item=>item.name?.toLowerCase().includes(searchItem?.toLowerCase()))
    const FilterSearchForVerifiedUsuers=allSecurityData?.filter(item=>item.name?.toLowerCase().includes(searchItem?.toLowerCase()))

    //All Security
    const AllSecurity=async()=>{
      const response=await GetSecurity()
      setAllSecurityData(response.data)
    }

    //Delete Visitor
    const deleteVisitor=async(visId,name)=>{
      Swal.fire({
        title: `Are you sure want to Delete ${name} ?`,
        icon: "question",
        iconHtml: "",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        showCloseButton: true
        }).then(async(result)=>{
            if(result.isConfirmed){
                const response=await DltVisitor(visId)
                toast.success(`${name} Deleted Successfully`)
                setAllVisitors(allVisitors?.filter(item=>item.id!=visId))
            }
        });
    }


  return (
    <div className='flex min-h-screen w-full overflow-x-hidden'>
        <AdminSideBar
        menuIcon={menuIcon}
        setMenuIcon={setMenuIcon}
      />
      <div className='ml-0 min-w-0 w-full shadow rounded min-h-screen p-3 sm:p-5 lg:ml-90'>
         {
            !menuIcon &&
          <div>
            <button type="button" aria-label="Open sidebar" className='lg:hidden' onClick={()=>setMenuIcon(!menuIcon)}>
              <IoMenu className='text-3xl'/>
            </button>
          </div>}
        <div className='flex flex-wrap justify-center gap-2 my-5'>
          <button onClick={()=>setVerifiedVisitor(false)} className='px-3 py-2 font-medium cursor-pointer border border-gray-300 rounded hover:bg-gray-300'>Registered Visitors</button>
          <button onClick={()=>setVerifiedVisitor(true)} className='px-3 py-2 font-medium cursor-pointer border border-gray-300 rounded hover:bg-gray-300'>Verified Visitors</button>
        </div>
        <div className='flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 shadow rounded p-3'>
          {
            VerifiedVisitor ?
            <div className=''>
            <p className='text-xl font-medium'>Verified Visitors</p>
            <p className='text-gray-600'>View all Verified visitors</p>
          </div> :
          <div className=''>
            <p className='text-xl font-medium'>Registered Visitors</p>
            <p className='text-gray-600'>View all registered visitors</p>
          </div>
          }
          <div className='flex w-full sm:w-auto gap-3 sm:gap-5'>
            <input onChange={(e)=>setSearchItem(e.target.value)} className='w-full sm:w-80 min-w-0 border border-gray-300 px-3 py-1 rounded' type="text" placeholder='Search by Name or ID' />
            {/* <input className='border py-1 px-3 border-gray-300 rounded' type="date" placeholder='' /> */}
          </div>
        </div>
        {
          VerifiedVisitor ?
    <div className='table-shell mt-5 w-full'>
    <table className="data-table min-w-[32rem]">
      <thead>
        <tr>
          <th className="border">#</th>
          <th className="border">Security Name</th>
          <th className="border">Verified Visitors</th>
        </tr>
      </thead>

  {
    FilterSearchForVerifiedUsuers?.map((item,index)=>(
        <tbody className='text-center'>
    <tr>
      <td className="border">{index+1}</td>
      <td className="border">{item.name}</td>

      <td className="border p-1">
        {/* Nested Table */}
        <div className='table-shell'>
        <table className="data-table min-w-[26rem]">
          <thead>
            <tr>
              <th className="border">Name</th>
              <th className="border">Image</th>
              <th className="border">Date</th>
            </tr>
          </thead>

          {
            item.accessed ?  
            item.accessed.map(item1=>(
              <tbody>
            <tr>
              <td className="border">{item1.name}</td>
              <td className="border p-2 text-center flex justify-center">
                <img className='w-15' src={item1.imgUrl} alt="" />
              </td>
              <td className="border">{item1.date}</td>
            </tr>
          </tbody>
            )) :
            <div>No Items Found</div>
            }
        </table>
        </div>
      </td>
    </tr>
  </tbody>
    ))
    }
    </table></div> :
        <div className='table-shell mt-5 w-full'>
        <table className='data-table min-w-[60rem]'>
          <tr>
            <th className='border-x'>#</th>
            <th className='border-x'>Photo</th>
            <th className='border-x'>Name</th>
            <th className='border-x'>Unique ID</th>
            <th className='border-x'>Phone</th>
            <th className='border-x'>Purpose</th>
            <th className='border-x'>Date</th>
            <th className='border-x'>Access By</th>
            <th className='border-x'>Action</th>
          </tr>
          <tbody>
            {/* Duplicate */}
            {
              FilterSearch?.map((item,index)=>(
              <tr className='border-y text-center'>
              <td className="border-x border-gray-400">{index+1}</td>
              <td className="border-x border-gray-400 text-center">
                <img className='w-10 py-2' src={item?.imgUrl} alt="No Photo" />
              </td>
              <td className="">{item.name}</td>
              <td className="border-x border-gray-400">{item.id}</td>
              <td className="border-x border-gray-400">+91 {item?.phone}</td>
              <td className="border-x border-gray-400">{item.purpose}</td>
              <td className="border-x border-gray-400">{item.date}</td>
              <td className="border-x border-gray-400"><span className='table-status bg-blue-100 text-blue-700'>Access Pending</span></td>
              <td className="border-x border-gray-400 py-2 text-center">
                {/* <button className='table-action px-3 py-1 bg-green-600 text-white rounded mx-1'>Update</button> */}
                <button onClick={()=>deleteVisitor(item.id,item.name)} className='table-action px-3 py-1 bg-red-600 text-white rounded mx-1'>Delete</button>
              </td>
            </tr>
              ))
              }
            
          </tbody>
        </table></div>}
        {/* {
          !VerifiedVisitor &&
          <div className='flex items-center gap-2 my-5 justify-center'>
          <button onClick={PrevPage} className='px-3 py-1 bg-blue-500 text-white font-medium'>Back</button>
          {currentPage} of {TotalPages}
          <button onClick={NextPage} className='px-3 py-1 bg-blue-500 text-white font-medium'>Next</button>
        </div>} */}
      </div>

    </div>
  )
}

export default AdminManageVisitor