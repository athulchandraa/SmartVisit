import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaUser, FaUsersCog } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import Swal from 'sweetalert2';
import { MdQrCodeScanner } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";



function AdminSideBar({sidebar,id}) {
    const Location=useNavigate()

    const logout=()=>{
        Swal.fire({
            title: "Are you sure want to Logout ?",
            icon: "question",
            iconHtml: "",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            showCancelButton: true,
            showCloseButton: true
            }).then((result)=>{
                if(result.isConfirmed){
                    Location('/')
                }
            });
    }

  return (
       <div className='border w-90 bg-slate-900 px-3 rounded fixed left-0 top-0 min-h-screen text-white flex flex-col justify-between'>
        <div >
            <div className='flex flex-col justify-center items-center h-20'>
                <p className='text-3xl font-medium text-white'>Smart Visit</p>
                {
                    sidebar ?
                    <p className='text-gray-600'>Welcome Security</p>
                    :
                    <p className='text-gray-600'>Welcome Admin</p>}
            </div>
            {
                sidebar ? 
                <Link to={`/securitylandingpage/${id}`} className='flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800'>
                <MdQrCodeScanner className='text-xl'/>
                <p className='text-xl'>Scan QR</p>
                </Link>
                :
                <Link to={"/admindashboard"} className='flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800'>
                <MdOutlineDashboard className='text-xl'/>
                <p className='text-xl'>Dashboard</p>
            </Link>}
            {
                sidebar ? 
                <Link  to={`/securityvisitlog/${id}`} className='flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800'>
                <CiBoxList className='text-xl'/>
                <p className='text-xl '>Visit Log</p>
                </Link>
                :
                <Link to={`/adminmanagevisitor/${id}`} className='flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800'>
                <FaUsersCog className='text-xl'/>
                <p className='text-xl '>Manage Visitors</p>
                </Link>}
            {
                sidebar ?
                <Link to={`/securityprofile/${id}`} className='flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800'>
                <FaUser className='text-xl'/>
                <p className='text-xl'>My Profile</p>
                </Link>
                :
                <Link to={`/adminmanagesecurity/${id}`} className='flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800'>
                <RiUserSettingsLine className='text-xl'/>
                <p className='text-xl'>Manage Security</p>
                </Link>}
            {
                !sidebar &&
                <Link className='flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800'>
                <TbReportSearch className='text-xl'/>
                <p className='text-xl '>Report</p>
            </Link>
            }

            <div className='flex items-bottom'>
            
        </div>
        </div>
        <Link onClick={logout} className='flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800'>
                <IoIosLogOut className='text-xl'/>
                <p className='text-xl '>Logout</p>
        </Link>
        
    </div>
  )
}

export default AdminSideBar