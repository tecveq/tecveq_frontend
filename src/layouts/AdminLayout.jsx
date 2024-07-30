import React from 'react'
import Sidebar from '../components/Admin/Sidebar/Sidebar';

const AdminLayout = ({children}) => {
  return (
    <>
    <div className="flex">
       <div className="fixed flex">
         <Sidebar />
       </div>
       {children}
     </div>
    </>
  )
}

export default AdminLayout