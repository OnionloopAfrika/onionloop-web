import React from 'react'
import ProfileLayout from '../Shell'

const page = () => {
    return (
        <ProfileLayout active='staff-app-settings' heading='Staff Settings' subheading='Roles, permissions, and app access'>
            <div>Staff settings page</div>
        </ProfileLayout>
    )
}

export default page