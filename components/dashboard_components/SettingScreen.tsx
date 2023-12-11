import { useEffect, useState } from "react";
import TransportCard from "./SettingComponents/TransportCard";
import PackageCard from "./SettingComponents/PackageCard";
import UnitCard from "./SettingComponents/UnitCard";
import CountryCard from "./SettingComponents/CountryCard";
import { AddTransportModal } from "./SettingComponents/SettingPopups/AddTransportModal";
import { AddPackageModal } from "./SettingComponents/SettingPopups/AddPackageModal";
import { AddUnitModal } from "./SettingComponents/SettingPopups/AddUnitModal";
import { AddCountryModal } from "./SettingComponents/SettingPopups/AddCountryModal";
import DeleteCountryModal from "./SettingComponents/SettingPopups/DeleteCountryModal";
import { BaseUrl } from "@/constants/templates";



export const SettingScreen = () => {

    // // Dummy data for demonstration
    // const data = [
    //     { id: 1, transportType: "avion", typeColis: "CMR", pricePerUnit: '8000F / Kg' },
    //     { id: 2, transportType: "bateau", typeColis: "Batterie", pricePerUnit: '120 000f / M3' },
    //     // Add more data as needed
    // ];

    const [loaded, setLoaded] = useState(false);

    // const [popup, setPopup] = useState("")
    const [popup, setPopup] = useState<"transport" | "package" | "unit" | "country">("transport");

    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = (popup: "transport" | "package" | "unit" | "country") => {
        setPopup(popup)
        setShowModal(!showModal);
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [delPopup, setDelPopup] = useState<"transportTypes" | "packageTypes" | "measureUnits" | "countries">("countries");

    const toggleShowDeleteModal = (delPopup: "transportTypes" | "packageTypes" | "measureUnits" | "countries") => {
        // setPopup(popup)
        setDelPopup(delPopup)
        setShowDeleteModal(!showDeleteModal)
    }

    const [itemId, setItemId] = useState("")

    const handleSetItemId = (id: string) => {
        setItemId(id)
    }

    const handleDeleteItem = async () => {
        try {
            console.log(`Deleting country with ID: ${itemId}`);
            const response = await fetch(`${BaseUrl}/${delPopup}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json()
                alert(`Error => ${errorData.message}`)
                throw new Error(`Failed to delete ${delPopup}`);
            }

            alert(`${delPopup} deleted successfully!`); // Show success alert
            // window.location.reload(); // Refresh the page

        } catch (error) {
            console.error(`Error deleting ${delPopup}:`, error);
            alert(`Failed to delete ${delPopup}`); // Show error alert
        }
    };

    return (

        <div className="flex flex-col justify-center text-black">
            <div className="pl-4 pt-4">
                <p className="mb-3 font-semibold text-2xl">Parametres</p>
                <div className="flex flex-row">
                    {/* Transport */}
                    <TransportCard toggleShowModal={() => { toggleShowModal("transport") }} />
                    {/* Package type */}
                    <PackageCard toggleShowModal={() => { toggleShowModal("package") }} />
                </div>
                <div className="mt-4 flex flex-row">
                    {/* Transport */}
                    <UnitCard toggleShowModal={() => { toggleShowModal("unit") }} />
                    {/* Package type */}
                    <CountryCard
                        toggleShowModal={() => { toggleShowModal("country") }}
                        toggleShowDelModal={() => toggleShowDeleteModal("countries")}
                        handleSetItemId={handleSetItemId}

                    />
                </div>
            </div>

            <AddTransportModal isVisible={showModal && (popup == 'transport')} onClose={() => { toggleShowModal(popup) }} text='Loading Content Summary' />
            <AddPackageModal isVisible={showModal && (popup == 'package')} onClose={() => { toggleShowModal(popup) }} text='Loading Content Summary' />
            <AddUnitModal isVisible={showModal && (popup == 'unit')} onClose={() => { toggleShowModal(popup) }} text='Loading Content Summary' />
            <AddCountryModal isVisible={showModal && (popup == 'country')} onClose={() => { toggleShowModal(popup) }} text='Loading Content Summary' />

            <DeleteCountryModal
                isVisible={showDeleteModal}
                onClose={() => { toggleShowDeleteModal("countries") }}
                onYesClick={handleDeleteItem}
            />

        </div>
    );
};