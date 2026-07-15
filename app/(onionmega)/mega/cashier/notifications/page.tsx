import React from 'react'
import ProfileLayout from '../settings/Shell'

const page = () => {
  return (
    <ProfileLayout
      active="/cashier/notifications"
      heading="Notifications"
      subheading="Keep track of important notifications "
    >
      <div className="space-y-[40px]">
        Notifications
      </div>
    </ProfileLayout>
  )
}

export default page