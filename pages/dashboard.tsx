import Layout from "@/components/Layout";
import React, { useState } from "react";
import { renderInputField } from "./auth/login";
import { ADD_ORDER_INPUTS, USER_CONFIG_INPUTS } from "@/constants/templates";
import { AddOrderModal } from "@/components/dashboard_components/AddOrderModal";
import { OrderListComponent } from "@/components/dashboard_components/OrderList";
import { PricingListComponent } from "@/components/dashboard_components/PricingList";

function dashboard() {
    return (
        <Layout title="">
            <PricingListComponent />
        </Layout>

    )
}

export default dashboard;