import { ClientListComponent } from "@/components/dashboard_components/clients/ClientList";
import React from "react";
import type { NextPageWithLayout } from "../../_app";
import type { ReactElement } from "react";
import DashboardLayout from "../layout";

const ClientsPage = () => {
  return <ClientListComponent />;
};

ClientsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ClientsPage;
