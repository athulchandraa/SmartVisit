import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaCross, FaUser, FaUsersCog } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import Swal from 'sweetalert2';
import { MdQrCodeScanner } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { IoClose } from 'react-icons/io5';



function AdminSideBar({sidebar,id,menuIcon,setMenuIcon}) {
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
       <>
       {menuIcon && <button
        type="button"
        aria-label="Close sidebar"
        onClick={()=>setMenuIcon(false)}
        className='fixed inset-0 z-40 bg-black/50 opacity-100 transition-opacity duration-300 lg:hidden'
       />}
       <div className={`${menuIcon ? 'translate-x-0' : '-translate-x-full'} fixed left-0 top-0 z-50 flex h-[100dvh] w-72 max-w-[85vw] flex-col overflow-hidden rounded border bg-slate-900 px-3 text-white transition-transform duration-300 sm:w-80 lg:h-screen lg:w-90 lg:max-w-none lg:translate-x-0`}>
        <div className='flex min-h-0 flex-1 flex-col'>
            <div className='flex shrink-0 flex-col justify-center items-center h-20'>
                <div className='flex items-center w-full justify-between'>
                    <p className='ml-0 text-3xl font-medium text-white lg:ml-25'>Smart Visit</p>
                    {/* <IoClose onClick={()=>setMenuIcon(false)} className='cursor-pointer text-3xl'/> */}
                </div>
                {
                    sidebar ?
                    <p className='text-gray-600'>Welcome Security</p>
                    :
                    <p className='text-gray-600'>Welcome Admin</p>}
            </div>
            <nav className='min-h-0 flex-1 overflow-y-auto'>
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

            </nav>
        </div>
        <Link onClick={logout} className='mt-auto flex shrink-0 items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800'>
                <IoIosLogOut className='text-xl'/>
                <p className='text-xl '>Logout</p>
        </Link>
        
    </div>
    </>
  )
}

export default AdminSideBar