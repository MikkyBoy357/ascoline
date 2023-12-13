import { ClientListComponent } from '@/components/dashboard_components/ClientList'
import React, { ReactElement } from 'react'
import DashboardLayout from './layout'
import { OrderListComponent } from '@/components/dashboard_components/OrderList'


const OrdersPage = () => {
  return (
    <OrderListComponent />
  )
}

OrdersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default OrdersPage