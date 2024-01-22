'use client';

import React, {Fragment, useCallback, useContext, useMemo, useState} from 'react';
import router, { useRouter } from "next/router";
import Image from "next/image";
import { SidebarContext } from '@/context/sidebar-context';
import Link from 'next/link';
import {usePathname} from "next/navigation";
import {Power} from "lucide-react";
import clsx from "clsx";
import {PermissionName, User} from "@/components/dashboard_components/users-permissions/UsersPermissionsList";
import {signOut, useSession} from "next-auth/react";
import logoPic from "@/public/logo.jpeg";


export interface SidebarItem {
    id: string;
    label: string;
    url: string;
    target?: string;
    icon: any;
    permissions: any;
}

interface Props {
    items: SidebarItem[];
    onShowPopup: () => void;

}

const Sidebar: React.FC<Props> = ({ items, onShowPopup}) => {
    const sidebarSectionContext = useContext(SidebarContext);

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathName = usePathname();
    const { data: session, status } = useSession();


    const handleClick = () => {
        router.push('/dashboard');
    };
    const isActive = (url: string): boolean => {
        return url.endsWith(pathName)
    };
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClickSidebarItem = (item: any) => {
        // console.log(item);
        // console.log(sidebarSectionContext?.selectedSidebarItem);
        sidebarSectionContext?.changeSidebarItem(item);
        // console.log(sidebarSectionContext?.selectedSidebarItem, "omo");
        router.push(item.url)
    }

    const checkPermissions = useCallback((permissions : {name: PermissionName, action: "update" | "read" | "create" | "delete"}[]) => {
        const user : User  | null = session?.user as User;


        if (user) {
            if (user.type === "admin")
                return true
            else return permissions.every((p) => {return user.permissions.find((up) => p.name === up.name && p.action === up.action) !== undefined;})
        } else {
            return false
        }
    }, [session])



    if (status === "loading") {
        return (
            <div className="h-screen w-60 bg-white">
            </div>
        );
    }


    return (
        <>
            <button
                className="
                z-50
                w-10 h-10 fixed top-4 left-4 md:hidden bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={toggleSidebar}
            >
                <i className={`fas fa-${isOpen ? 'times' : 'bars'} text-primary`} />
            </button>
            <aside
                className={`h-screen sticky top-0 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 justify-between`}
            >

                <div className="w-60 flex flex-col items-center justify-center p-4 hover:cursor-pointer"
                    onClick={handleClick}>
                    <div className="flex flex-row">
                        <Image src={logoPic} alt="Jema.ai" width="75" height="300" />



                    </div>
                </div>

                <nav className="flex-1 h-screen">
                    <ul className="py-4">
                        {items.map((item, index) => (
                            <Fragment key={index}>
                                <li className={clsx( !checkPermissions(item.permissions) && "hidden", item === item && 'font-semibold', isActive(item.url) ? 'text-white bg-[#4763e4]' : 'text-gray-500', `mb-6 mx-8 py-2 px-4 group rounded-md hover:bg-[#4763e4] hover:text-white transition duration-300 hover:cursor-pointer`)} onClick={() => { handleClickSidebarItem(item) }}>
                                    <Link href={item.url} className='flex flex-row'>
                                        <item.icon className="mr-3" color="black"/> {item.label}

                                    </Link>
                                </li>
                            </Fragment>
                        ))}
                        <button className={`mb-6 mx-8 py-2 px-4 group rounded-md hover:bg-[#4763e4] text-gray-500 hover:text-white transition duration-300`} onClick={() => {
                            signOut({callbackUrl: "/auth/login"});
                        }}>
                            <div className='flex flex-row items-center font-semibold'>
                                <Power className="mr-3" color="black"/>
                                Déconnexion
                            </div>
                        </button>
                    </ul>



                </nav>

            </aside>

        </>
    );
};

export default Sidebar;
