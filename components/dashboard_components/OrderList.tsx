import { useEffect, useState } from "react";
import { AddOrderModal } from "./AddOrderModal";
import { MeasureUnit } from "./SettingComponents/UnitCard";
import { TransportType } from "./SettingComponents/TransportCard";
import { PackageType } from "./SettingComponents/PackageCard";
import { Country } from "./SettingComponents/CountryCard";
import { Client } from "./ClientList";
import { BaseUrl } from "@/constants/templates";
import { Pricing } from "./PricingList";
import DeleteCountryModal from "./SettingComponents/SettingPopups/DeleteCountryModal";
// import { Unit } from "../MyInputFieldComponents";

export interface Commande {
    _id: string;
    trackingId: string;
    typeColis: PackageType;
    transportType: TransportType;
    client: Client;
    pricing?: Pricing;
    description: string;
    unit: MeasureUnit;
    pays: string;
    quantity: number;
    ville: string;
    status: string;
    specialNote: string;
}

export const OrderListComponent = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemId, setItemId] = useState("")

    const toggleShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    const [modify, setModify] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState<Commande>();
    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = () => {
        setShowModal(!showModal);
        if (showModal) { setModify(false) }
    }

    const handleModify = (item: Commande) => {
        setModify(true)
        setSelectedOrder(item)
        toggleShowModal()
    }

    useEffect(() => {
        fetchCommandesData()
        fetchPackageData()
        fetchTransportData()
        fetchUnitData()
        fetchCountryData()
        fetchClientsData()
    }, [])

    const [commandesData, setCommandesData] = useState<Commande[]>([]);

    const [packageTypesData, setPackageTypesData] = useState<PackageType[]>([]);
    const [transportTypesData, setTransportTypesData] = useState<TransportType[]>([]);
    const [measureUnitsData, setMeasureUnitsData] = useState<MeasureUnit[]>([]);
    const [countryData, setCountryData] = useState<Country[]>([]);
    const [clientsData, setClientsData] = useState<Client[]>([]);

    // Function to fetch commandes data
    const fetchCommandesData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/commandes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data: Commande[] = await response.json();
            console.log(data, "omo");
            // Set the fetched data into state
            setCommandesData(data);

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

    // Function to fetch country data
    const fetchCountryData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/countries`, {
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

    const handleDeleteItem = async () => {
        try {
            console.log(`Deleting client with ID: ${itemId}`);
            const response = await fetch(`${BaseUrl}/commandes/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json()
                alert(`Error => ${errorData.message}`)
                throw new Error(`Failed to delete`);
            }

            alert(`deleted successfully!`); // Show success alert
            // window.location.reload(); // Refresh the page

        } catch (error) {
            console.error(`Error deleting:`, error);
            alert(`Failed to delete`); // Show error alert
        }
    };

    return (
        <div className="flex flex-col justify-center text-black">
            <div className="pl-4 pt-4">
                {/* <p className="mb-3 font-semibold text-2xl">{modify.toString()}</p> */}
                <p className="mb-3 font-semibold text-2xl">Commandes</p>
                <div className="mr-10 px-4 py-3 pb-10 bg-white rounded-[12px]">
                    <div className="rounded-[12px] border-blue-600">
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
                                            <th className="py-2 px-4 border-b">Clients</th>
                                            <th className="py-2 px-4 border-b">Pays</th>
                                            <th className="py-2 px-4 border-b">Villes</th>
                                            <th className="py-2 px-4 border-b">Type colis</th>
                                            <th className="py-2 px-4 border-b">Description</th>
                                            <th className="py-2 px-4 border-b">Price</th>
                                            <th className="py-2 px-4 border-b">Tracking id</th>
                                            <th className="py-2 px-4 border-b">Unité</th>
                                            <th className="py-2 px-4 border-b">Type de transport.</th>
                                            <th className="py-2 px-4 border-b text-center">Statut</th>
                                            <th className="py-2 px-4 border-b">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commandesData.map((item) => (
                                            <tr key={item._id} className="text-sm">
                                                <td className="py-2 px-4 border-b">{item.client.lastName} {item.client.firstName}</td>
                                                <td className="py-2 px-4 border-b">{item.pays}</td>
                                                <td className="py-2 px-4 border-b">{item.ville}</td>
                                                <td className="py-2 px-4 border-b">{item.typeColis.label}</td>
                                                <td className="py-2 px-4 border-b">{item.description}</td>
                                                <td className="py-2 px-4 border-b">{item.pricing?.price ?? "N/A"}</td>
                                                <td className="py-2 px-4 border-b">{item.trackingId}</td>
                                                <td className="py-2 px-4 border-b">{item.unit.label}</td>
                                                <td className="py-2 px-4 border-b">{item.transportType.label}</td>
                                                <td className="py-2 px-4 border-b">
                                                    <div className={`px-4 py-2 rounded-3xl ${item.status === "Commande Arrivée" ? 'bg-[#DCFCE7]' : "bg-[#FFEDD5]"} ${item.status === "Commande Arrivée" ? 'text-[#166534]' : "text-[#9A3412]"}`}>{item.status}</div>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    {/* Add your action buttons or links here */}
                                                    <i onClick={() => {
                                                        setItemId(item._id);
                                                        toggleShowDeleteModal()
                                                    }} className="fa-regular fa-trash-can text-red-600"></i>
                                                    <i onClick={() => handleModify(item)} className="ml-4 fa-regular fa-pen-to-square text-[#5C73DB]"></i>
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

            <AddOrderModal
                isVisible={showModal}
                onClose={toggleShowModal}
                text='Loading Content Summary'
                isModify={modify}
                selectedOrder={selectedOrder!}
                packageTypesData={packageTypesData}
                transportTypesData={transportTypesData}
                measureUnitsData={measureUnitsData}
                countryData={countryData.map((country: Country) => country.label)}
                clientsData={clientsData}
            />

            <DeleteCountryModal
                isVisible={showDeleteModal}
                onClose={() => { toggleShowDeleteModal() }}
                onYesClick={handleDeleteItem}
            />

        </div>
    );
};