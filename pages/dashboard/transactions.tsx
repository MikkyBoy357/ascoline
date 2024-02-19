import React, { ReactElement } from "react";
import DashboardLayout from "./layout";
import { TransactionListComponent } from "@/components/dashboard_components/TransactionList";

const TransactionsPage = () => {
  return <TransactionListComponent />;
};

TransactionsPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default TransactionsPage;
