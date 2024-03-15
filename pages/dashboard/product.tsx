import { ClientListComponent } from "@/components/dashboard_components/clients/ClientList";
import React, { ReactElement } from "react";
import DashboardLayout from "./layout";
import { PricingListComponent } from "@/components/dashboard_components/pricings/PricingList";
import { ProductListComponent } from "@/components/dashboard_components/products/ProductsList";

const ProductPage = () => {
  return <ProductListComponent />;
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProductPage;
