import React from 'react'
import ProfileLayout from '../Shell'

const page = () => {
    return (
        <ProfileLayout active='account-settings' heading='Account Settings' subheading='Security, billing, and integrations'>
            <div>Account settings page</div>
        </ProfileLayout>
    )
}

export default page