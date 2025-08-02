import { DashboardLayout } from '@/components/user-dashboard/dashboard-layout'
import React from 'react'
// import {fetchListingsByUserId} from '@/actions/lists'

const UserDashboard = async () => {
  // const response = await fetchListingsByUserId();
  // fetch user data and listings here
  // console.log("response data", response.data);
  
  return (
    <>
    
      <DashboardLayout />
    </>
  )
}

export default UserDashboard