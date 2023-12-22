'use client';

import React, { Fragment, useContext, useState } from 'react';
import { useRouter } from "next/router";
// import { Link } from "react-router-dom";
import Image from "next/image";
import { SidebarContext } from '@/context/sidebar-context';
import Link from 'next/link';
import {usePathname} from "next/navigation";

export interface SidebarItem {
    id: string;
    label: string;
    url: string;
    target?: string;
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

    return (
        <>
            <button
                className="
                z-50
                w-10 h-10 fixed top-4 left-4 z-10 md:hidden bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
                        <Image src={"/logo.jpeg"} alt="Jema.ai" width="75" height="300" />
                        {/* <div className="ml-2 [font-family:'MADE_TOMMY-Medium',Helvetica] font-medium text-[#04009a] text-[22px] tracking-[-0.96px] leading-[normal]">
                            Ascoline
                        </div> */}
                        {/* <h1 className="text-lg font-normal text-gray-700 text-center">Open Source </h1> */}
                        {/* <h1 className="text-lg font-semibold text-gray-700  text-center">Jasper <i
                            className="fas fa-arrow-right text-primary"/> alternative</h1> */}


                    </div>
                </div>

                <nav className="flex-1 h-screen">
                    <ul className="py-4">
                        {items.map((item, index) => (
                            <Fragment key={index}>
                                <li className={`mb-6 mx-8 py-2 px-4 group rounded-md hover:bg-[#4763e4] hover:text-white transition duration-300 ${isActive(item.url) ? 'text-white bg-[#4763e4]' : 'text-gray-500'
                                    } ${item === item ? 'font-semibold' : ''} hover:cursor-pointer`} onClick={() => { handleClickSidebarItem(item) }}>
                                    <Link href={item.url} className='flex flex-row'>
                                        <Image className='mr-3'  src={`/sidebar_icons/${item.id}.svg`} alt="Jema.ai" width="25" height="80" /> {item.label}
                                    </Link>
                                </li>
                            </Fragment>
                        ))}
                    </ul>

                    {/* <div className="flex flex-col pl-8 h-full w-full align-bottom justify-center pt-20">
                        <Fragment >
                            <p className="mt-60 pl-8 text-gray-500 hover:text-gray-700 transition duration-300 blue-gray font-semibold hover:cursor-pointer" onClick={onShowPopup}>
                                Help
                            </p>
                        </Fragment>
                    </div> */}

                </nav>

            </aside>

        </>
    );
};

export default Sidebar;
