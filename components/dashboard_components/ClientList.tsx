import { useEffect, useState } from "react";
import { AddClientModal } from "./AddClientModal";
import { BaseUrl } from "@/constants/templates";

export interface Client {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: string;
}

export const ClientListComponent = () => {

    // // Dummy data for demonstration
    // const data = [
    //     { id: 1, nom: 'Doe', prenom: 'John', email: 'john.doe@example.com', telephone: '123-456-7890', status: 'Actif' },
    //     { id: 2, nom: 'Cristiano Ronaldo', prenom: 'Jane', email: 'jane.smith@example.com', telephone: '987-654-3210', status: 'Inactif' },
    //     { id: 2, nom: 'BATCHO', prenom: 'Harold', email: 'jane.smith@example.com', telephone: '987-654-3210', status: 'Actif' },
    //     // Add more data as needed
    // ];

    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = () => {
        setShowModal(!showModal);
    }

    const [clientsData, setClientsData] = useState<Client[]>([]);


    useEffect(() => {
        fetchClientsData()
    }, [])


    // Function to fetch clients data
    const fetchClientsData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/clients`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data: Client[] = await response.json();
            // Set the fetched data into state
            setClientsData(data);

        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle errors
        }
    };

    return (
        <div className="bg-gray-50 flex flex-col justify-center text-black">
            <div className="pl-4 pt-4">
                <p className="mb-3 font-semibold text-2xl">Clients</p>
                <div className="mb-4 flex w-[1104px] items-start gap-[8px] px-[20px] py-[16px] relative bg-white rounded-[10px] border border-solid border-[#4763e4]">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <p className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-gray-400 text-[14px] tracking-[0] leading-[normal]">
                        Vous cherchez quel client ...
                    </p>
                </div>
                <div onClick={toggleShowModal} className="mb-4 inline-flex h-[48px] items-center justify-center gap-[8px] p-[16px] relative bg-[#4763e4] rounded-[10px]">
                    <div className="relative w-fit mt-[-4.00px] mb-[-2.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[18px] tracking-[0] leading-[normal]">
                        Ajouter un client
                    </div>
                    <i className="fa-solid fa-plus ml-1 text-white"></i>
                </div>
                <div className="mr-10 px-4 pb-10 bg-white rounded-[12px]">
                    <div className="flex flex-col rounded-[12px] border-blue-600">
                        <div className="inline-flex flex-col items-start gap-[16px]">
                            <div className="container mx-auto mt-8">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="text-gray-500">
                                            <th className="py-2 px-4 border-b">Noms</th>
                                            <th className="py-2 px-4 border-b">Prénoms</th>
                                            <th className="py-2 px-4 border-b">E-mails</th>
                                            <th className="py-2 px-4 border-b">Téléphone</th>
                                            <th className="py-2 px-4 border-b">Status</th>
                                            <th className="py-2 px-4 border-b">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientsData.map((item) => (
                                            <tr key={item._id}>
                                                <td className="py-2 px-4 border-b">{item.lastName}</td>
                                                <td className="py-2 px-4 border-b">{item.firstName}</td>
                                                <td className="py-2 px-4 border-b">{item.email}</td>
                                                <td className="py-2 px-4 border-b">{item.phone}</td>
                                                <td className="py-2 px-4 border-b">
                                                    <div className={`px-4 py-2 rounded-3xl ${item.status.toLocaleLowerCase() === "actif" ? 'bg-[#DCFCE7]' : "bg-[#FFEDD5]"} ${item.status.toLocaleLowerCase() === "actif" ? 'text-[#166534]' : "text-[#9A3412]"}`}>{item.status}</div>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    {/* Add your action buttons or links here */}
                                                    <div className="flex items-center justify-center p-[8px] relative rounded-[10px] border border-solid border-[#5c73db]">
                                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#5c73db] text-[12px] tracking-[0] leading-[normal]">
                                                            Modifier
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddClientModal isVisible={showModal} onClose={toggleShowModal} type='client' />

        </div>
    );
};