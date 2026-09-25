import React from 'react'
import pnfImage from '../assets/pnfImage.jpg'
import { Link } from 'react-router-dom'


function PageNotFound() {
  return (
    <div style={{backgroundImage:`url(${pnfImage})`}} className='h-screen bg-cover'>
      <div className='flex justify-center items-center h-screen'>
        <Link to={'/'} className='px-3 py-2 bg-gray-600 text-white rounded'>Go to Home Page</Link>
        </div>
    </div>
  )
}

export default PageNotFound