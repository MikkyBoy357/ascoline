import { ClientListComponent } from '@/components/dashboard_components/ClientList'
import React, { ReactElement } from 'react'
import DashboardLayout from './layout'
import { EmployeeListComponent } from '@/components/dashboard_components/EmployeeList'
import {UsersPermissionsListComponent} from "@/components/dashboard_components/users-permissions/UsersPermissionsList";


const PermissionsPage = () => {
  return (
    <UsersPermissionsListComponent />
  )
}

PermissionsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default PermissionsPage