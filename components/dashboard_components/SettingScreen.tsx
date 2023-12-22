import { useEffect, useState } from "react";
import TransportCard, { TransportType } from "./SettingComponents/TransportCard";
import PackageCard, { PackageType } from "./SettingComponents/PackageCard";
import UnitCard, { MeasureUnit } from "./SettingComponents/UnitCard";
import CountryCard, { Country } from "./SettingComponents/CountryCard";
import { AddTransportModal } from "./SettingComponents/SettingPopups/AddTransportModal";
import { AddPackageModal } from "./SettingComponents/SettingPopups/AddPackageModal";
import { AddUnitModal } from "./SettingComponents/SettingPopups/AddUnitModal";
import { AddCountryModal } from "./SettingComponents/SettingPopups/AddCountryModal";
import DeleteCountryModal from "./SettingComponents/SettingPopups/DeleteCountryModal";
import { BaseUrl } from "@/constants/templates";
import {useRouter} from "next/router";



export const SettingScreen = () => {

    const router = useRouter();
    const [modify, setModify] = useState(false);

    const [selectedItem, setSelectedItem] = useState<MeasureUnit | TransportType | PackageType | Country>();

    // const [popup, setPopup] = useState("")
    const [popup, setPopup] = useState<"transportTypes" | "packageTypes" | "measureUnits" | "countries">("transportTypes");

    const [showModal, setShowModal] = useState(false);

    const toggleShowModal = (popup: "transportTypes" | "packageTypes" | "measureUnits" | "countries") => {
        setPopup(popup)
        setShowModal(!showModal);
        if (showModal) { setModify(false) }
    }

    // const handleModify = (
    //     // popup: "transportTypes" | "packageTypes" | "measureUnits" | "countries",
    //     item: MeasureUnit | TransportType | PackageType | Country
    // ) => {
    //     setModify(true)
    //     setSelectedItem(item)
    //     // toggleShowModal(p)
    // }

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

    const handleModify = (item: Country | MeasureUnit | TransportType | PackageType) => {
        setSelectedItem(item)
        setModify(true)
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

            router.reload();
            //alert(`${delPopup} deleted successfully!`); // Show success alert
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
                    <TransportCard
                        toggleShowModal={() => { toggleShowModal("transportTypes") }}
                        toggleShowDelModal={() => toggleShowDeleteModal("transportTypes")}
                        handleSetItemId={handleSetItemId}
                        handleModify={handleModify}
                    />
                    {/* Package type */}
                    <PackageCard
                        toggleShowModal={() => { toggleShowModal("packageTypes") }}
                        toggleShowDelModal={() => toggleShowDeleteModal("packageTypes")}
                        handleSetItemId={handleSetItemId}
                        handleModify={handleModify}
                    />
                </div>
                <div className="mt-4 flex flex-row">
                    {/* Transport */}
                    <UnitCard
                        toggleShowModal={() => { toggleShowModal("measureUnits") }}
                        toggleShowDelModal={() => toggleShowDeleteModal("measureUnits")}
                        handleSetItemId={handleSetItemId}
                        handleModify={handleModify}
                    />
                    {/* Package type */}
                    <CountryCard
                        toggleShowModal={() => { toggleShowModal("countries") }}
                        toggleShowDelModal={() => toggleShowDeleteModal("countries")}
                        handleSetItemId={handleSetItemId}
                        handleModify={handleModify}

                    />
                </div>
            </div>

            {/* <AddTransportModal isVisible={showModal && (popup == 'transport')} onClose={() => { toggleShowModal(popup) }} text='Loading Content Summary' /> */}
            {/* <AddPackageModal isVisible={showModal && (popup == 'package')} onClose={() => { toggleShowModal(popup) }} text='Loading Content Summary' /> */}
            <AddUnitModal
                isVisible={showModal}
                onClose={() => { toggleShowModal(popup) }}
                popup={popup}
                isModify={modify}
                selectedItem={selectedItem!}
            />
            {/* <AddCountryModal isVisible={showModal && (popup == 'country')} onClose={() => { toggleShowModal(popup) }} text='Loading Content Summary' /> */}

            <DeleteCountryModal
                isVisible={showDeleteModal}
                onClose={() => { toggleShowDeleteModal("countries") }}
                onYesClick={handleDeleteItem}
            />

        </div>
    );
};