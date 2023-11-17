import { useEffect, useState } from "react";

interface Client {
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

    const [loaded, setLoaded] = useState(false);

    const [clientsData, setClientsData] = useState<Client[]>([]);


    useEffect(() => {
        if (!loaded) {
            fetchClientsData()
        }
    }, [])



    // Function to fetch clients data
    const fetchClientsData = async () => {
        try {
            const response = await fetch("http://localhost:3000/clients", {
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
                <p className="mb-3 font-semibold text-2xl">Client</p>
                <div className="absolute h-[498px] top-[151px] left-[296px] bg-[#ffffff] rounded-[12px]">
                    <div className="h-px top-[415px] left-0 bg-gray-50" />
                    <p className="mb-3 font-semibold text-2xl">Client</p>

                    <div className="relative w-[1104px] h-[498px] bg-white rounded-[12px] border-blue-600">
                        <div className="absolute w-[1104px] h-px top-[415px] left-0 bg-gray-50" />
                        <div className="absolute top-[31px] left-[32px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-800 text-[18px] tracking-[0] leading-[normal]">
                            Editer un compte
                        </div>
                        <div className="inline-flex flex-col items-start gap-[16px] absolute top-[94px] left-[32px]">
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
                        <div className="inline-flex h-[48px] items-center justify-center gap-[8px] p-[16px] absolute top-[428px] left-[32px] bg-[#4763e4] rounded-[10px]">
                            <div className="relative w-fit mt-[-4.00px] mb-[-2.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#ffffff] text-[18px] tracking-[0] leading-[normal]">
                                Modifier
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};