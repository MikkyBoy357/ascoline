import { useState } from "react";
import { AddOrderModal } from "./AddOrderModal";
import { AddPricingModal } from "./AddPricingModal";

export const PricingListComponent = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = () => {
        setShowModal(!showModal);
    }

    // Dummy data for demonstration
    const data = [
        { id: 1, transportType: "avion", typeColis: "CMR", pricePerUnit: '8000F / Kg' },
        { id: 2, transportType: "bateau", typeColis: "Batterie", pricePerUnit: '120 000f / M3' },
        // Add more data as needed
    ];

    return (
        <div className="bg-gray-50 flex flex-col justify-center text-black">
            <div className="pl-4 pt-4">
                <p className="mb-3 font-semibold text-2xl">Commandes</p>
                <div className="absolute h-[498px] top-[151px] bg-[#ffffff] rounded-[12px]">
                    <div className="h-px top-[415px] bg-gray-50" />
                    <p className="mb-3 font-semibold text-2xl">Commandes</p>

                    {/* Card */}
                    <div className="flex flex-col py-2 w-[1104px] h-[498px] bg-gray-50 rounded-[12px] border-blue-600">
                        <div className="w-[1104px] h-px top-[415px] bg-gray-50" />
                        <div className="mb-3 flex justify-between top-[31px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-800 text-[18px] tracking-[0] leading-[normal]">
                            Liste des commandes
                            <div onClick={toggleShowModal} className="px-4 py-3 [font-family:'Inter-Regular',Helvetica] font-normal text-[#ffffff] text-sm tracking-[0] leading-[normal] bg-[#4763E4] items-center rounded-xl">
                                Ajouter
                                <i className="fa-solid fa-plus ml-1"></i>
                            </div>
                        </div>
                        <div className="flex w-[1040px] items-start gap-[8px] px-[20px] py-[12px] relative bg-white rounded-[10px] border border-solid border-[#4763e480]">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-gray-400 text-[14px] tracking-[0] leading-[normal]">
                                Vous cherchez une commande...
                            </div>
                        </div>
                        <div className="inline-flex flex-col items-start gap-[16px]">
                            <div className="container mx-auto mt-8">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="text-gray-500 text-sm text-left">
                                            <th className="py-2 px-4 border-b">Type de transport</th>
                                            <th className="py-2 px-4 border-b">Type de colis</th>
                                            <th className="py-2 px-4 border-b">Prix / Unité</th>
                                            <th className="py-2 px-4 border-b">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) => (
                                            <tr key={item.id} className="text-sm">
                                                <td className="py-2 px-4 border-b">{item.transportType}</td>
                                                <td className="py-2 px-4 border-b">{item.typeColis}</td>
                                                <td className="py-2 px-4 border-b">{item.pricePerUnit}</td>
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
            <AddPricingModal isVisible={showModal} onClose={toggleShowModal} text='Loading Content Summary' />


        </div>
    );
};