import React, { useEffect, useState } from 'react';

interface Country {
    _id: string;
    label: string;
    description: string;
}

interface CountryCardProps {
    toggleShowModal: () => void
}

export const CountryCard: React.FC<CountryCardProps> = ({ toggleShowModal }) => {

    useEffect(() => {
        fetchCountryData()
    }, [])

    const [countryData, setCountryData] = useState<Country[]>([]);

    // Function to fetch country data
    const fetchCountryData = async () => {
        try {
            const response = await fetch("http://localhost:3000/countries", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data: Country[] = await response.json();
            // Set the fetched data into state
            setCountryData(data);

        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle errors
        }
    };

    return (
        <div className="w-1/2 mr-10 px-4 py-3 pb-10 bg-white rounded-[12px]">
            <div className="rounded-[12px] border-blue-600">
                <div className="mb-3 flex flex-row justify-between top-[31px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-800 text-[18px] tracking-[0] leading-[normal]">
                    Liste des pays
                    <div onClick={toggleShowModal} className="px-4 py-3 [font-family:'Inter-Regular',Helvetica] font-normal text-[#ffffff] text-sm tracking-[0] leading-[normal] bg-[#4763E4] items-center rounded-xl">
                        Ajouter
                        <i className="fa-solid fa-plus ml-1"></i>
                    </div>
                </div>
                <div className="flex w-min items-start gap-[8px] px-[20px] py-[12px] relative bg-white rounded-[10px] border border-solid border-[#4763e480]">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <div className="relative w-max [font-family:'Inter-Regular',Helvetica] font-normal text-gray-400 text-[14px] tracking-[0] leading-[normal]">
                        Vous cherchez une compétence ...
                    </div>
                </div>
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
                                {countryData.map((item) => (
                                    <tr key={item._id} className="text-sm">
                                        <td className="py-2 px-4 border-b">{item.label}</td>
                                        <td className="py-2 px-4 border-b">{item.description}</td>
                                        <td className="py-2 px-4 border-b">
                                            {/* Add your action buttons or links here */}
                                            <div className="h-8 px-4 rounded-lg border border-indigo-500 justify-center items-center inline-flex">
                                                <div className="text-indigo-500 text-xs font-medium font-['Inter']">Modifier</div>
                                            </div>
                                            <div className="ml-4 h-8 px-4 bg-red-600 rounded-lg justify-center items-center inline-flex">
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
    )
}

export default CountryCard