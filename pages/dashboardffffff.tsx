
import React, { useContext, useEffect, useState } from "react";
import { ADD_ORDER_INPUTS, USER_CONFIG_INPUTS } from "@/constants/templates";
import { AddOrderModal } from "@/components/dashboard_components/AddOrderModal";
import { OrderListComponent } from "@/components/dashboard_components/OrderList";
import { PricingListComponent } from "@/components/dashboard_components/PricingList";
import { ClientListComponent } from "@/components/dashboard_components/ClientList";
import { SidebarContext, SidebarContextProvider } from "@/context/sidebar-context";
import { EmployeeListComponent } from "@/components/dashboard_components/EmployeeList";
import { SettingScreen } from "@/components/dashboard_components/SettingScreen";
import Layout, { SIDEBAR_ITEMS } from "./dashboard/layout";

function Dashboard() {
    const [item, setItem] = useState(SIDEBAR_ITEMS[0]);
    const sidebarSectionContext = useContext(SidebarContext);

    const handleChangeItem = (val: any) => {
        console.log(val, "NewVal")
        setItem(val);
    }

    useEffect(() => {
        console.log(sidebarSectionContext?.selectedSidebarItem, "lol")
    })

    return (
        <SidebarContextProvider>
                <div className="text-blue-400">
                    {/* <PricingListComponent /> */}
                    {/* <div className="text-green-400">hello{sidebarSectionContext?.selectedSidebarItem.label}</div> */}
                    {(() => {
                        switch (item) {
                            case SIDEBAR_ITEMS[0]:
                                return <div className="text-green-400">Dashboard</div>
                            case SIDEBAR_ITEMS[1]:
                                return <ClientListComponent />
                            case SIDEBAR_ITEMS[2]:
                                return <OrderListComponent />
                            case SIDEBAR_ITEMS[3]:
                                return <EmployeeListComponent />
                            case SIDEBAR_ITEMS[4]:
                                return <PricingListComponent />
                            case SIDEBAR_ITEMS[5]:
                                return <div>Profile</div>
                            case SIDEBAR_ITEMS[6]:
                                return <SettingScreen />
                            default:
                                return <div>NO SCREEN</div>
                        }
                    })()}
                </div>
            </SidebarContextProvider>

    )
}

export default Dashboard;