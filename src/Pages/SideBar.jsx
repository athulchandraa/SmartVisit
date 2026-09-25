import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


import { FaUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import Swal from 'sweetalert2';

function SideBar() {

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
    <div className='p-2'>
        <div className='border w-90 bg-blue-950 px-3 rounded fixed left-0 top-0 h-screen'>
            <div className='flex justify-center items-center h-20'>
                <p className='text-3xl font-medium text-white'>Smart Visit</p>
            </div>
            {/* <Link className='text-white flex items-center gap-5 justify-center border py-2 my-5'>
                <MdQrCodeScanner className='text-3xl'/>
                <p className='text-xl '></p>
            </Link> */}
            {/* <Link to={`/securityvisitlog/:id`} className='text-white flex items-center gap-5 justify-center border py-2 my-2'>
                <CiBoxList className='text-3xl'/>
                <p className='text-xl '>Visit Log</p>
            </Link> */}
            <Link to={`/securityprofile/:id`} className='text-white flex items-center gap-5 justify-center border py-2 my-2'>
                <FaUser className='text-3xl'/>
                <p className='text-xl'></p>
            </Link>
            <Link onClick={logout} className='text-white flex items-center gap-2 justify-center border py-2 my-2'>
                <IoIosLogOut className='text-3xl'/>
                <p className='text-xl '>Logout</p>
            </Link>
        </div>
    </div>
  )
}

export default SideBar