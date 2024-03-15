import { ClientListComponent } from "@/components/dashboard_components/clients/ClientList";
import React, { ReactElement } from "react";
import DashboardLayout from "./layout";
import { PricingListComponent } from "@/components/dashboard_components/pricings/PricingList";
import { SettingScreen } from "@/components/dashboard_components/SettingScreen";

const SettingPage = () => {
  return <SettingScreen />;
};

SettingPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SettingPage;
