import { useState } from "react";
import { AddOrderModal } from "./AddOrderModal";

export const OrderListComponent = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = () => {
        setShowModal(!showModal);
    }

    // Dummy data for demonstration
    const data = [
        { id: 1, clients: 'Doe', pays: "Cameroun", villes: 'John', typeColis: 'john.doe@example.com', description: 'contact@sit.cm', trackingId: "233-333-333", poids: 3.33, transportType: "avion", status: 'Réceptionné en Chine' },
        { id: 2, clients: 'Cristiano Ronaldo', pays: "Eget", villes: 'Jane', typeColis: 'jane.smith@example.com', description: 'contact@sit.cm', trackingId: "233-333-333", poids: 6.21, transportType: "bateau", status: 'Commande Arrivée' },
        { id: 2, clients: 'BATCHO Martin', pays: "Benin", villes: 'Harold', typeColis: 'jane.smith@example.com', description: 'contact@sit.cm', trackingId: "233-333-333", poids: 6.21, transportType: "voiture", status: 'Commande Arrivée' },
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
                                        <tr className="text-gray-500 text-sm">
                                            <th className="py-2 px-4 border-b">Clients</th>
                                            <th className="py-2 px-4 border-b">Pays</th>
                                            <th className="py-2 px-4 border-b">Villes</th>
                                            <th className="py-2 px-4 border-b">Type colis</th>
                                            <th className="py-2 px-4 border-b">Description</th>
                                            <th className="py-2 px-4 border-b">Tracking id</th>
                                            <th className="py-2 px-4 border-b">Poids(Kg)</th>
                                            <th className="py-2 px-4 border-b">Type de transport.</th>
                                            <th className="py-2 px-4 border-b">Statut</th>
                                            <th className="py-2 px-4 border-b">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) => (
                                            <tr key={item.id} className="text-sm">
                                                <td className="py-2 px-4 border-b">{item.clients}</td>
                                                <td className="py-2 px-4 border-b">{item.pays}</td>
                                                <td className="py-2 px-4 border-b">{item.villes}</td>
                                                <td className="py-2 px-4 border-b">{item.typeColis}</td>
                                                <td className="py-2 px-4 border-b">{item.description}</td>
                                                <td className="py-2 px-4 border-b">{item.trackingId}</td>
                                                <td className="py-2 px-4 border-b">{item.poids}</td>
                                                <td className="py-2 px-4 border-b">{item.transportType}</td>
                                                <td className="py-2 px-4 border-b">
                                                    <div className={`px-4 py-2 rounded-3xl ${item.status === "Commande Arrivée" ? 'bg-[#DCFCE7]' : "bg-[#FFEDD5]"} ${item.status === "Commande Arrivée" ? 'text-[#166534]' : "text-[#9A3412]"}`}>{item.status}</div>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    {/* Add your action buttons or links here */}
                                                    <i className="fa-regular fa-trash-can text-red-600"></i>
                                                    <i className="ml-4 fa-regular fa-pen-to-square text-[#5C73DB]"></i>
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
            <AddOrderModal isVisible={showModal} onClose={toggleShowModal} text='Loading Content Summary' />


        </div>
    );
};