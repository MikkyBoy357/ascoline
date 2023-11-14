import React, {Fragment, useState} from "react";
import Sidebar from "./Sidebar";

interface Props {
    children: React.ReactNode;
    title: string;
}
export const SIDEBAR_ITEMS: any = [
    {
        label: "Dashboard",
        url: "/firsthome",
    },
    {
        label: "Clients (Users)",
        url: "/firsthome",
    },
    {
        label: "Commandes(Package)",
        url: "/firsthome",
    },
    {
        label: "Collaborateurs(Employee)",
        url: "/firsthome",
    },
    {
        label: "Tarification(Pricing)",
        url: "/firsthome",
    },
    {
        label: "Profile",
        url: "/firsthome",
    },
    {
        label: "Setting (Paramètre)",
        url: "/firsthome",
    },
    // {
    //     label: "Templates",
    //     url: "/",
    //     // target: "blank"
    // },
    // {
    //     label: "Contact",
    //     url: "https://tidycal.com/yuvalsuede/60-minute-consultation-with-yuval",
    //     target: "blank"
    // },
    // {
    //     label: "Account",
    //     url: "https://www.linkedin.com/in/yuval-suede/",
    //     target: "blank"
    // },
];


const Layout: React.FC<Props> = ({ children, title }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handlePopup = () => {
        setShowPopup(!showPopup);
    }
    return (
        <Fragment>
            <div className="min-h-screen bg-white relative w-full md:flex md:flex-row">
                <div className="md:hidden z-10 fixed left-0 top-0 h-full">
                    <Sidebar onShowPopup={handlePopup} items={SIDEBAR_ITEMS} />
                </div>
                <div className="hidden md:block md:relative ">
                    <Sidebar onShowPopup={handlePopup} items={SIDEBAR_ITEMS} />
                </div>
                <main className="w-full md:flex-grow">
                    { title && <h1 className="text-black text-2xl font-bold mb-4 mt-10 pr-4 pl-4 pt-4">{title}</h1> }
                    {children}
                </main>
            </div>
        </Fragment>
    );
};

export default Layout;
