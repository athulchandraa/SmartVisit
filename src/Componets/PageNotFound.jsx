import React from 'react'
import pnfImage from '../assets/pnfImage.jpg'
import { Link } from 'react-router-dom'


function PageNotFound() {
  return (
    <div style={{backgroundImage:`url(https://assets.dochipo.com/editor/animations/404-error/34436078-a766-4673-b05a-1a30bdf86537.gif)`}} className='min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center'>
      <div className='flex justify-center items-center min-h-screen w-full px-4'>
        <Link to={'/'} className='px-3 py-2 bg-gray-600 text-white rounded'>Go to Home Page</Link>
        </div>
    </div>
  )
}

export default PageNotFound