import { SidebarDemo } from '@/components/user-dashboard/sidebar'
import React from 'react'
import {fetchListingsByUserId} from '@/actions/lists'

const UserDashboard = async () => {
  const response = await fetchListingsByUserId();
  //fetch user data and listings here
  console.log("response data", response.data);
  return (
    <>
      <SidebarDemo data={response.data} />
    </>
  )
}

export default UserDashboard