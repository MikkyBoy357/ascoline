import { useCallback, useEffect, useState } from "react";
import { AddOrderModal } from "./AddOrderModal";
import { MeasureUnit } from "./SettingComponents/UnitCard";
import { TransportType } from "./SettingComponents/TransportCard";
import { PackageType } from "./SettingComponents/PackageCard";
import { Country } from "./SettingComponents/CountryCard";
import { Client } from "./ClientList";

import { Pricing } from "./PricingList";
import DeleteCountryModal from "./SettingComponents/SettingPopups/DeleteCountryModal";
import { useRouter } from "next/router";
import CustomLoader from "@/components/CustomLoader";
import { DELETE, GET } from "@/constants/fetchConfig";
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemId, setItemId] = useState("");

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const [modify, setModify] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [selectedOrder, setSelectedOrder] = useState<Commande>();
  const [showModal, setShowModal] = useState(false);

  // Function to fetch clients data
  const fetchClientsData = async () => {
    try {
      /*            const response = await fetch(`/clients`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });*/

      const response = await GET(`/clients`);

      /*            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }*/

      const data: Client[] = response;
      // Set the fetched data into state
      setClientsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  };

  // Function to fetch commandes data
  const fetchCommandesData = useCallback(async () => {
    try {
      /*            const response = await fetch(`/commandes${searchText.length > 0 ? `?search=${searchText}` : ""}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });*/

      const response = await GET(
        `/commandes${searchText.length > 0 ? `?search=${searchText}` : ""}`,
      );

      /*            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }*/

      const data: Commande[] = response;
      // Set the fetched data into state
      setCommandesData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  }, [searchText]);

  // Function to fetch package types data
  const fetchPackageData = async () => {
    try {
      /*           const response = await fetch(`/packageTypes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });*/

      const response = await GET(`/packageTypes`);

      /*            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }*/

      const data: PackageType[] = response;
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
      /*            const response = await fetch(`/transportTypes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });*/

      const response = await GET(`/transportTypes`);

      /*            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }*/

      const data: TransportType[] = response;
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
      /*            const response = await fetch(`/measureUnits`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });*/

      const response = await GET(`/measureUnits`);

      /*           if (!response.ok) {
                throw new Error("Failed to fetch data");
            }*/

      const data: MeasureUnit[] = response;
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
      /*            const response = await fetch(`/countries`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });*/

      const response = await GET(`/countries`);

      /*            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }*/

      const data: Country[] = response;
      // Set the fetched data into state
      setCountryData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  };
  const toggleShowModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      setModify(false);
    }
  };

  const handleModify = (item: Commande) => {
    setModify(true);
    setSelectedOrder(item);
    toggleShowModal();
  };

  useEffect(() => {
    setLoading(true);
    fetchCommandesData().finally(() => setLoading(false));
    fetchPackageData();
    fetchTransportData();
    fetchUnitData();
    fetchCountryData();
    fetchClientsData();
  }, [fetchCommandesData, setLoading]);

  const [commandesData, setCommandesData] = useState<Commande[]>([]);

  const [packageTypesData, setPackageTypesData] = useState<PackageType[]>([]);
  const [transportTypesData, setTransportTypesData] = useState<TransportType[]>(
    [],
  );
  const [measureUnitsData, setMeasureUnitsData] = useState<MeasureUnit[]>([]);
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [clientsData, setClientsData] = useState<Client[]>([]);

  const handleDeleteItem = async () => {
    try {
      console.log(`Deleting client with ID: ${itemId}`);
      /*            const response = await fetch(`/commandes/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });*/

      const response = DELETE(`/commandes/${itemId}`);

      /*            if (!response.ok) {
                const errorData = await response.json()
                alert(`Error => ${errorData.message}`)
                throw new Error(`Failed to delete`);
            }*/

      router.reload();
      //alert(`deleted successfully!`); // Show success alert
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
              <button
                onClick={toggleShowModal}
                className="px-4 py-3 [font-family:'Inter-Regular',Helvetica] font-normal text-[#ffffff] text-sm tracking-[0] leading-[normal] bg-[#4763E4] items-center rounded-xl"
              >
                Ajouter
                <i className="fa-solid fa-plus ml-1"></i>
              </button>
            </div>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Recherche ..."
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </div>

            {loading ? (
              <CustomLoader />
            ) : (
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
                        <th className="py-2 px-4 border-b">
                          Type de transport.
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Statut
                        </th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commandesData.map((item) => (
                        <tr key={item._id} className="text-sm">
                          <td className="py-2 px-4 border-b">
                            {item?.client?.lastName ?? "N/A"}{" "}
                            {item?.client?.firstName ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.pays ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.ville ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.typeColis?.label ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.description ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.pricing?.price ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.trackingId ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.unit?.label ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.transportType?.label ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <div
                              className={`px-4 py-2 rounded-3xl ${
                                item.status === "Commande Arrivée"
                                  ? "bg-[#DCFCE7]"
                                  : "bg-[#FFEDD5]"
                              } ${
                                item.status === "Commande Arrivée"
                                  ? "text-[#166534]"
                                  : "text-[#9A3412]"
                              }`}
                            >
                              {item.status}
                            </div>
                          </td>
                          <td className="py-2 px-4 border-b">
                            {/* Add your action buttons or links here */}
                            <i
                              onClick={() => {
                                setItemId(item._id);
                                toggleShowDeleteModal();
                              }}
                              className="fa-regular fa-trash-can text-red-600 cursor-pointer"
                            ></i>
                            <i
                              onClick={() => handleModify(item)}
                              className="ml-4 fa-regular fa-pen-to-square text-[#5C73DB] cursor-pointer"
                            ></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Footer */}
          </div>
        </div>
      </div>

      <AddOrderModal
        isVisible={showModal}
        onClose={toggleShowModal}
        text="Loading Content Summary"
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
        onClose={() => {
          toggleShowDeleteModal();
        }}
        onYesClick={handleDeleteItem}
      />
    </div>
  );
};
