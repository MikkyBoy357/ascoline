import { BaseUrl } from '@/constants/templates';
import React, {useCallback, useEffect, useState} from 'react';
import { Country } from './CountryCard';
import { PackageType } from './PackageCard';
import { MeasureUnit } from './UnitCard';

export interface TransportType {
    _id: string;
    label: string;
    description: string;
}

interface TransportCardProps {
    toggleShowModal: () => void,
    toggleShowDelModal: () => void,
    handleSetItemId: (id: string) => void,
    handleModify: (item: Country | MeasureUnit | TransportType | PackageType) => void,
}

export const TransportCard: React.FC<TransportCardProps> = ({ toggleShowModal, toggleShowDelModal, handleSetItemId, handleModify }) => {



    const [loading, setLoading] = useState(false);

    const [searchText, setSearchText] = useState("");

    const [transportTypesData, setTransportTypesData] = useState<TransportType[]>([]);

    // Function to fetch transport types data
    const fetchTransportData = useCallback(async () => {
        try {
            const response = await fetch(`${BaseUrl}/transportTypes${searchText.length > 0 ? `?search=${searchText}` : ""}`, {
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
    }, [searchText])


    useEffect(() => {
        setLoading(true);
        fetchTransportData().finally(() => setLoading(false));
    }, [fetchTransportData, setLoading])

    return (
        <div className="w-1/2 mr-10 px-4 py-3 pb-10 bg-white rounded-[12px]">
            <div className="rounded-[12px] border-blue-600">
                <div className="mb-3 flex flex-row justify-between top-[31px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-800 text-[18px] tracking-[0] leading-[normal]">
                    Liste des types de transport
                    <div onClick={toggleShowModal} className="px-4 py-3 [font-family:'Inter-Regular',Helvetica] font-normal text-[#ffffff] text-sm tracking-[0] leading-[normal] bg-[#4763E4] items-center rounded-xl">
                        Ajouter
                        <i className="fa-solid fa-plus ml-1"></i>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input type="search" id="default-search" className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 " placeholder="Recherche ..." onChange={(e)  => {
                        setSearchText(e.target.value);
                    }}/>
                </div>

                {
                    loading ? (<span>Loading ...</span>) : (
                        <div className="inline-flex flex-col items-start gap-[16px]">
                            <div className="container mx-auto mt-8">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className="text-gray-500 text-sm">
                                        <th className="py-2 px-4 border-b">Libellé</th>
                                        <th className="py-2 px-4 border-b">Description</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transportTypesData.map((item) => (
                                        <tr key={item._id} className="text-sm">
                                            <td className="py-2 px-4 border-b">{item.label}</td>
                                            <td className="py-2 px-4 border-b">{item.description}</td>
                                            <td className="py-2 px-4 border-b">
                                                {/* Add your action buttons or links here */}
                                                <div onClick={() => {
                                                    handleModify(item)
                                                    handleSetItemId(item._id)
                                                    toggleShowModal()
                                                }}
                                                     className="h-8 px-4 rounded-lg border border-indigo-500 justify-center items-center inline-flex">
                                                    <div className="text-indigo-500 text-xs font-medium font-['Inter']">Modifier</div>
                                                </div>
                                                <div onClick={() => {
                                                    toggleShowDelModal();
                                                    handleSetItemId(item._id)
                                                }} className="ml-4 h-8 px-4 bg-red-600 rounded-lg justify-center items-center inline-flex">
                                                    <div className="text-white text-xs font-medium font-['Inter']">Supprimer</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }

                {/* Footer */}
            </div>
        </div>
    )
}

export default TransportCard