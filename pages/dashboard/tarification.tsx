import { ClientListComponent } from '@/components/dashboard_components/ClientList'
import React, { ReactElement } from 'react'
import DashboardLayout from './layout'
import { PricingListComponent } from '@/components/dashboard_components/PricingList'


const TarificationPage = () => {
  return (
    <PricingListComponent />
  )
}

TarificationPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default TarificationPage