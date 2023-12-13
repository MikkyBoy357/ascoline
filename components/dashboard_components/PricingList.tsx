import { useEffect, useState } from "react";
import { AddOrderModal } from "./AddOrderModal";
import { AddPricingModal } from "./AddPricingModal";
import { PackageType } from "./SettingComponents/PackageCard";
import { TransportType } from "./SettingComponents/TransportCard";
import { MeasureUnit } from "./SettingComponents/UnitCard";
import { BaseUrl } from "@/constants/templates";

export interface Pricing {
    _id: string;
    price: number;
    typeColis: {
        _id: string;
        label: string;
    };
    transportType: {
        _id: string;
        label: string;
    };
    unit: {
        _id: string;
        label: string;
    };
    description: string;
    quantity: number;
    status: string;
}

export const PricingListComponent = () => {

    const [loaded, setLoaded] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = () => {
        setShowModal(!showModal);
    }

    useEffect(() => {
        fetchPricingsData()
        fetchPackageData()
        fetchTransportData()
        fetchUnitData()
    }, [])

    const [pricingsData, setPricingsData] = useState<Pricing[]>([]);

    const [packageTypesData, setPackageTypesData] = useState<PackageType[]>([]);
    const [transportTypesData, setTransportTypesData] = useState<TransportType[]>([]);
    const [measureUnitsData, setMeasureUnitsData] = useState<MeasureUnit[]>([]);

    // Function to fetch pricings data
    const fetchPricingsData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/pricings`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data: Pricing[] = await response.json();
            // Set the fetched data into state
            setPricingsData(data);

        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle errors
        }
    };

    // Function to fetch package types data
    const fetchPackageData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/packageTypes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data: PackageType[] = await response.json();
            // Set the fetched data into state
            setPackageTypesData(data);

        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle errors
        }
    };

    // Function to fetch transport types data
    const fetchTransportData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/transportTypes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data: TransportType[] = await response.json();
            // Set the fetched data into state
            setTransportTypesData(data);

        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle errors
        }
    };

    // Function to fetch measure units data
    const fetchUnitData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/measureUnits`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data: MeasureUnit[] = await response.json();
            // Set the fetched data into state
            setMeasureUnitsData(data);

        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle errors
        }
    };


    return (
        <div className="flex flex-col justify-center text-black">
            <div className="pl-4 pt-4">
                <p className="mb-3 font-semibold text-2xl">Tarifications</p>
                <div className="mr-10 px-4 py-3 pb-10 bg-white rounded-[12px]">
                    <div className="rounded-[12px] border-blue-600">
                        <div className="mb-3 flex justify-between top-[31px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-800 text-[18px] tracking-[0] leading-[normal]">
                            Liste des tarifications
                            <div onClick={toggleShowModal} className="px-4 py-3 [font-family:'Inter-Regular',Helvetica] font-normal text-[#ffffff] text-sm tracking-[0] leading-[normal] bg-[#4763E4] items-center rounded-xl">
                                Ajouter
                                <i className="fa-solid fa-plus ml-1"></i>
                            </div>
                        </div>
                        <div className="flex w-[1040px] items-start gap-[8px] px-[20px] py-[12px] relative bg-white rounded-[10px] border border-solid border-[#4763e480]">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-gray-400 text-[14px] tracking-[0] leading-[normal]">
                                Vous cherchez une tarification...
                            </div>
                        </div>
                        <div className="inline-flex flex-col items-start gap-[16px]">
                            <div className="container mx-auto mt-8">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="text-gray-500 text-sm">
                                            <th className="py-2 px-4 border-b">Type de transport</th>
                                            <th className="py-2 px-4 border-b">Type de colis</th>
                                            <th className="py-2 px-4 border-b">Prix / Unité</th>
                                            <th className="py-2 px-4 border-b">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pricingsData.map((item) => (
                                            <tr key={item._id} className="text-sm">
                                                <td className="py-2 px-4 border-b">{item.transportType.label}</td>
                                                <td className="py-2 px-4 border-b">{item.typeColis.label}</td>
                                                <td className="py-2 px-4 border-b">{item.price}/{item.unit.label}</td>
                                                <td className="py-2 px-4 border-b">
                                                    {/* Add your action buttons or links here */}
                                                    <div className="w-32 h-8 p-2 rounded-lg border border-indigo-500 justify-center items-center inline-flex">
                                                        <div className="text-indigo-500 text-xs font-medium font-['Inter']">Modifier</div>
                                                    </div>
                                                    <div className="ml-4 w-32 h-8 p-2 bg-red-600 rounded-lg justify-center items-center inline-flex">
                                                        <div className="text-white text-xs font-medium font-['Inter']">Supprimer</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Footer */}
                    </div>
                </div>
            </div>

            <AddPricingModal
                isVisible={showModal}
                onClose={toggleShowModal}
                text='Loading Content Summary'
                packageTypesData={packageTypesData.map((packageType: PackageType) => packageType.label)}
                transportTypesData={transportTypesData.map((transportType: TransportType) => transportType.label)}
                measureUnitsData={measureUnitsData.map((measureUnit: MeasureUnit) => measureUnit.label)}
            />

        </div>
    );
};