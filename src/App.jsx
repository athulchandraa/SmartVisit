import { Bounce, ToastContainer } from 'react-toastify'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './Componets/DashBoard'
import SecurityLogin from './Componets/SecurityLogin'
import SecurityLandingPage from './Componets/SecurityLandingPage'
import SecurityVisitLog from './Componets/SecurityVisitLog'
import SecurityProfile from './Componets/SecurityProfile'
import VisitorPass from './Componets/VisitorPass'
import VisitorRegistration from './Componets/VisitorRegistration'
import AdminManageVisitor from './Componets/AdminManageVisitor'
import AdminDashBoard from './Componets/AdminDashBoard'
import AdminManageSecurity from './Componets/AdminManageSecurity'
import AdminLogin from './Componets/AdminLogin'
import PageNotFound from './Componets/PageNotFound'



function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<DashBoard/>}/>
      <Route path='/securitylogin' element={<SecurityLogin/>}/>
      <Route path='/securitylandingpage/:id' element={<SecurityLandingPage/>}/>
      <Route path='/securityvisitlog/:id' element={<SecurityVisitLog/>}/>
      <Route path='/securityprofile/:id' element={<SecurityProfile/>}/>
      <Route path='/visitorregistration' element={<VisitorRegistration/>}/>
      <Route path='/visitor' element={<VisitorPass/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/admindashboard' element={<AdminDashBoard/>}/>
      <Route path='/adminmanagevisitor/:id' element={<AdminManageVisitor/>}/>
      <Route path='/adminmanagesecurity/:id' element={<AdminManageSecurity/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>

    <ToastContainer position="top-right" autoClose={5000} theme="light" transition={Bounce}/>
    </>
  )
}

export default App
