import React from 'react'
import ProfileLayout from '../Shell'

const page = () => {
  return (
      <ProfileLayout active='my-profile' heading='My Profile' subheading='Manage your personal Information'>
        <div>Profile page</div>
    </ProfileLayout>
  )
}

export default page