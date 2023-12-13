

import React from 'react';
import type { NextPageWithLayout } from '../_app'
import type { ReactElement } from 'react'
import DashboardLayout from './layout';
import DashboardScreen from '@/components/dashboard_components/DashboardScreen';

const Page: NextPageWithLayout = () => {
  return (
    <DashboardScreen/>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default Page