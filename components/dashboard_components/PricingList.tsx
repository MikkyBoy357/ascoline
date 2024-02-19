import { useCallback, useEffect, useState } from "react";
import { AddOrderModal } from "./AddOrderModal";
import { AddPricingModal } from "./AddPricingModal";
import { PackageType } from "./SettingComponents/PackageCard";
import { TransportType } from "./SettingComponents/TransportCard";
import { MeasureUnit } from "./SettingComponents/UnitCard";

import DeleteCountryModal from "./SettingComponents/SettingPopups/DeleteCountryModal";
import { useRouter } from "next/router";
import CustomLoader from "@/components/CustomLoader";
import { DELETE, GET } from "@/constants/fetchConfig";

export interface Pricing {
  _id: string;
  price: number;
  typeColis: {
    _id: string;
    label: string;
  };
  transportType: {
    _id: string;
    label: string;
  };
  unit: {
    _id: string;
    label: string;
  };
  description: string;
  quantity: number;
  status: string;
}

export const PricingListComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemId, setItemId] = useState("");

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const [modify, setModify] = useState(false);

  const [selectedItem, setSelectedItem] = useState<Pricing>();
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      setModify(false);
    }
  };

  const handleModify = (item: Pricing) => {
    setModify(true);
    setSelectedItem(item);
    toggleShowModal();
  };

  // Function to fetch pricings data

  const fetchPricingsData = useCallback(async () => {
    try {
      /*           const response = await fetch(`/pricings${searchText.length > 0 ? `?search=${searchText}` : ""}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });*/

      const response = await GET(
        `/pricings${searchText.length > 0 ? `?search=${searchText}` : ""}`,
      );

      /*          if (!response.ok) {
                throw new Error("Failed to fetch data");
            }*/

      const data: Pricing[] = response;
      // Set the fetched data into state
      setPricingsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  }, [searchText]);

  useEffect(() => {
    setLoading(true);
    fetchPricingsData().finally(() => setLoading(false));
    fetchPackageData();
    fetchTransportData();
    fetchUnitData();
  }, [fetchPricingsData, setLoading]);

  const [pricingsData, setPricingsData] = useState<Pricing[]>([]);

  const [packageTypesData, setPackageTypesData] = useState<PackageType[]>([]);
  const [transportTypesData, setTransportTypesData] = useState<TransportType[]>(
    [],
  );
  const [measureUnitsData, setMeasureUnitsData] = useState<MeasureUnit[]>([]);

  // Function to fetch package types data
  const fetchPackageData = async () => {
    try {
      /*            const response = await fetch(`/packageTypes`, {
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

      /*            if (!response.ok) {
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

  const handleDeleteItem = async () => {
    try {
      console.log(`Deleting client with ID: ${itemId}`);
      /*            const response = await fetch(`/pricings/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });*/

      const response = await DELETE(`/pricings/${itemId}`);

      /*            if (!response.ok) {
                const errorData = await response.json()
                alert(`Error => ${errorData.message}`)
                throw new Error(`Failed to delete`);
            }*/

      //alert(`deleted successfully!`);
      router.reload(); // Show success alert
      // window.location.reload(); // Refresh the page
    } catch (error) {
      console.error(`Error deleting:`, error);
      alert(`Failed to delete`); // Show error alert
    }
  };

  return (
    <div className="flex flex-col justify-center text-black">
      <div className="pl-4 pt-4">
        <p className="mb-3 font-semibold text-2xl">Tarifications</p>
        <div className="mr-10 px-4 py-3 pb-10 bg-white rounded-[12px]">
          <div className="rounded-[12px] border-blue-600">
            <div className="mb-3 flex justify-between top-[31px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-800 text-[18px] tracking-[0] leading-[normal]">
              Liste des tarifications
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
                      <tr className="text-gray-500 text-sm">
                        <th className="py-2 px-4 border-b">
                          Type de transport
                        </th>
                        <th className="py-2 px-4 border-b">Type de colis</th>
                        <th className="py-2 px-4 border-b">Prix / Unité</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingsData.map((item) => (
                        <tr key={item._id} className="text-sm">
                          <td className="py-2 px-4 border-b">
                            {item.transportType.label}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item.typeColis.label}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item.price}/{item.unit.label}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {/* Add your action buttons or links here */}
                            <button
                              onClick={() => handleModify(item)}
                              className="w-32 h-8 p-2 rounded-lg border border-indigo-500 justify-center items-center inline-flex"
                            >
                              <div className="text-indigo-500 text-xs font-medium font-['Inter']">
                                Modifier
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                setItemId(item._id);
                                toggleShowDeleteModal();
                              }}
                              className="ml-4 w-32 h-8 p-2 bg-red-600 rounded-lg justify-center items-center inline-flex"
                            >
                              <div className="text-white text-xs font-medium font-['Inter']">
                                Supprimer
                              </div>
                            </button>
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

      <AddPricingModal
        isVisible={showModal}
        onClose={toggleShowModal}
        text="Loading Content Summary"
        isModify={modify}
        selectedItem={selectedItem!}
        packageTypesData={packageTypesData}
        transportTypesData={transportTypesData}
        measureUnitsData={measureUnitsData}
      />

      <DeleteCountryModal
        isVisible={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(!showDeleteModal);
        }}
        onYesClick={handleDeleteItem}
      />
    </div>
  );
};
