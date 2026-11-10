import React from 'react'
import ProfileLayout from '../Shell'

const page = () => {
  return (
    <ProfileLayout
      active="/branch-manager/profile/logout"
      heading="Staff Settings"
      subheading="Roles, permissions, and app access"
    >
      <div className="space-y-[40px]">
        Logout
      </div>
    </ProfileLayout>
  )
}

export default page