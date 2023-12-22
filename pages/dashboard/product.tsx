import { ClientListComponent } from '@/components/dashboard_components/ClientList'
import React, { ReactElement } from 'react'
import DashboardLayout from './layout'
import { PricingListComponent } from '@/components/dashboard_components/PricingList'
import {ProductListComponent} from "@/components/dashboard_components/ProductsList";


const ProductPage = () => {
  return (
    <ProductListComponent />
  )
}

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default ProductPage