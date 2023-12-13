import React, { ReactElement } from 'react'
import DashboardLayout from './layout'


const ProfilePage = () => {
    return (
        <div className='text-black'>Profile Page</div>
    )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export default ProfilePage