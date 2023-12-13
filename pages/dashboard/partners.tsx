import { ClientListComponent } from '@/components/dashboard_components/ClientList'
import React, { ReactElement } from 'react'
import DashboardLayout from './layout'
import { EmployeeListComponent } from '@/components/dashboard_components/EmployeeList'


const PartnersPage = () => {
  return (
    <EmployeeListComponent />
  )
}

PartnersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default PartnersPage