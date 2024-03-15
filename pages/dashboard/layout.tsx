"use client";

import Sidebar from "@/components/Sidebar";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRightIcon,
  AsteriskSquare,
  BookUser,
  Boxes,
  Coins,
  PackageSearch,
  PieChart,
  Settings,
  SquareGanttIcon,
  Users,
} from "lucide-react";
import { User } from "@/components/dashboard_components/usersPermissions/UsersPermissionsList";

interface Props {
  children: React.ReactNode;
  title: string;
  handleChangeItem: (val: any) => void;
}

export const SIDEBAR_ITEMS: any = [
  {
    id: "dashboard",
    label: "Dashboard",
    url: "/dashboard",
    icon: PieChart,
    permissions: [],
  },
  {
    id: "clients",
    label: "Clients",
    url: "/dashboard/clients",
    icon: Users,
    permissions: [{ name: "client", action: "read" }],
  },
  {
    id: "commandes",
    label: "Commandes",
    url: "/dashboard/orders",
    icon: Boxes,
    permissions: [{ name: "commande", action: "read" }],
  },
  {
    id: "product",
    label: "Produits",
    url: "/dashboard/product",
    icon: PackageSearch,
    permissions: [{ name: "product", action: "read" }],
  },
  {
    id: "productOrders",
    label: "Commandes de produit",
    url: "/dashboard/productOrders",
    icon: SquareGanttIcon,
    permissions: [{ name: "commande", action: "read" }],
  },
  {
    id: "transaction",
    label: "Transactions",
    url: "/dashboard/transactions",
    icon: ArrowLeftRightIcon,
    permissions: [{ name: "transaction", action: "read" }],
  },
  {
    id: "collaborateurs",
    label: "Collaborateurs",
    url: "/dashboard/partners",
    icon: BookUser,
    permissions: [{ name: "employee", action: "read" }],
  },
  {
    id: "setting",
    label: "Permissions",
    url: "/dashboard/permissions",
    icon: AsteriskSquare,
    permissions: [{ name: "user", action: "read" }],
  },
  {
    id: "tarification",
    label: "Tarification",
    url: "/dashboard/tarification",
    icon: Coins,
    permissions: [{ name: "pricing", action: "read" }],
  },
  {
    id: "setting",
    label: "Paramètres",
    url: "/dashboard/setting",
    icon: Settings,
    permissions: [
      { name: "country", action: "read" },
      { name: "transportType", action: "read" },
      { name: "packageType", action: "read" },
      { name: "measureUnit", action: "read" },
    ],
  },
];

const DashboardLayout = ({ children }: any) => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-white relative w-full md:flex md:flex-row">
        <div className="md:hidden z-10 fixed left-0 top-0 h-full ">
          <Sidebar onShowPopup={handlePopup} items={SIDEBAR_ITEMS} />
        </div>
        <div className="hidden md:block min-[50vh] w-80   ">
          <Sidebar onShowPopup={handlePopup} items={SIDEBAR_ITEMS} />
        </div>
        <main className=" w-full md:flex-grow bg-gray-50">
          {/* {title && <h1 className="text-black text-2xl font-bold mb-4 mt-10 pr-4 pl-4 pt-4">{title}</h1>} */}
          {children}
        </main>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
