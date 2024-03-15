import { useCallback, useEffect, useState } from "react";
import { AddOrderModal } from "./AddOrderModal";
import { MeasureUnit } from "../SettingComponents/UnitCard";
import { TransportType } from "../SettingComponents/TransportCard";
import { PackageType } from "../SettingComponents/PackageCard";
import { Country } from "../SettingComponents/CountryCard";
import { Client } from "../clients/ClientList";

import { Pricing } from "../pricings/PricingList";
import DeleteCountryModal from "../SettingComponents/SettingPopups/DeleteCountryModal";
import { useRouter } from "next/router";
import CustomLoader from "@/components/CustomLoader";
import { DELETE, GET } from "@/constants/fetchConfig";
import StatusFilter from "@/components/dashboard_components/filters/StatusFilter";
import ClientFilter from "@/components/dashboard_components/filters/ClientFilter";
import PackageTypeFilter from "@/components/dashboard_components/filters/PackageTypeFilter";
import TransportTypeFilter from "@/components/dashboard_components/filters/TransportTypeFilter";
import DateRangeFilter from "@/components/dashboard_components/filters/DateRangeFilter";
import { DateRange } from "react-day-picker";
import ResetFilter from "@/components/dashboard_components/filters/ResetFilter";
import OrderImagesModal from "@/components/dashboard_components/orders/OrderImagesModal";
import { FiltersType } from "@/components/dashboard_components/productOrders/ProductOrderList";
import { PaginationElement } from "@/components/dashboard_components/PaginationElement";
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
  paymentStatus: string;
  specialNote: string;
  images: string[];
}

export const OrderListComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemId, setItemId] = useState("");
  const defaultFilters: FiltersType = {
    status: [],
    clients: [],
    packageTypes: [],
    transportTypes: [],
    products: [],
    date: undefined,
  };
  const [filters, setFilters] = useState(defaultFilters);

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const [modify, setModify] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [selectedOrder, setSelectedOrder] = useState<Commande>();
  const [showModal, setShowModal] = useState(false);
  const [showImagesModal, setShowImagesModal] = useState(false);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);

  // Function to fetch clients data
  const fetchClientsData = async () => {
    try {
      const response = await GET(`/clients?limit=0`);

      const data: Client[] = response.clients;
      // Set the fetched data into state
      setClientsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  };

  // Function to fetch commandes data
  const fetchCommandesData = useCallback(async () => {
    let apiUrl = "/commandes";
    let queryParams = [];

    queryParams.push(`page=${page}`);
    if (searchText.length > 0) queryParams.push(`search=${searchText}`);
    if (filters.status.length > 0) queryParams.push(`status=${filters.status}`);
    if (filters.clients.length > 0)
      queryParams.push(`clients=${filters.clients}`);
    if (filters.packageTypes.length > 0)
      queryParams.push(`packages=${filters.packageTypes}`);
    if (filters.transportTypes.length > 0)
      queryParams.push(`transports=${filters.transportTypes}`);
    if (
      filters.date !== undefined &&
      filters.date.from !== undefined &&
      filters.date.to !== undefined
    ) {
      queryParams.push(`startDate=${filters.date.from}`);
      queryParams.push(`endDate=${filters.date.to}`);
    }

    if (queryParams.length > 0) {
      apiUrl += "?" + queryParams.join("&");
    }

    try {
      const response = await GET(`${apiUrl}`);

      const data: Commande[] = response.orders;
      // Set the fetched data into state
      setCommandesData(data);
      setPage(response.currentPage);
      setPages(response.totalPages);
      setTotal(response.total);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  }, [searchText, filters, page]);

  // Function to fetch package types data
  const fetchPackageData = async () => {
    try {
      const response = await GET(`/packageTypes?limit=0`);

      const data: PackageType[] = response.packageTypes;
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
      const response = await GET(`/transportTypes?limit=0`);

      const data: TransportType[] = response.transportTypes;
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
      const response = await GET(`/measureUnits?limit=0`);

      const data: MeasureUnit[] = response.measureUnits;
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
      const response = await GET(`/countries?limit=0`);

      const data: Country[] = response.countries;
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

  const handleShowImage = (item: Commande) => {
    setSelectedOrder(item);
    setShowImagesModal(true);
  };

  const handleModify = (item: Commande) => {
    setModify(true);
    setSelectedOrder(item);
    toggleShowModal();
  };

  useEffect(() => {
    setLoading(true);
    fetchPackageData();
    fetchTransportData();
    fetchUnitData();
    fetchCountryData();
    fetchClientsData();
    fetchCommandesData().finally(() => setLoading(false));
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

      const response = DELETE(`/commandes/${itemId}`);

      router.reload();
    } catch (error) {
      console.error(`Error deleting:`, error);
      alert(`Failed to delete`); // Show error alert
    }
  };

  return (
    <div className="flex flex-col justify-center text-black">
      <div className="pl-4 pt-4">
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

            <div className=" grid grid-cols-5 items-center gap-4  text-sm">
              <StatusFilter filters={filters} setFilters={setFilters} />
              <ClientFilter
                filters={filters}
                setFilters={setFilters}
                clientsData={clientsData}
              />
              <PackageTypeFilter
                filters={filters}
                setFilters={setFilters}
                packageTypeData={packageTypesData}
              />
              <TransportTypeFilter
                filters={filters}
                setFilters={setFilters}
                transportTypeData={transportTypesData}
              />
              <DateRangeFilter filters={filters} setFilters={setFilters} />

              <ResetFilter filters={filters} setFilters={setFilters} />
            </div>

            {loading ? (
              <CustomLoader />
            ) : (
              <div className="inline-flex flex-col items-start gap-[16px] min-w-full max-w-6xl overflow-auto">
                <div className="container mx-auto h-[60vh] mt-8">
                  <table className="min-w-full p-5">
                    <thead>
                      <tr className="text-gray-500 text-sm text-left">
                        <th className="py-2 px-4 border-b">Images</th>
                        <th className="py-2 px-4 border-b">Client</th>
                        <th className="py-2 px-4 border-b">Pays</th>
                        <th className="py-2 px-4 border-b">Ville</th>
                        <th className="py-2 px-4 border-b">Type colis</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Tracking id</th>
                        <th className="py-2 px-4 border-b">Tarif</th>
                        <th className="py-2 px-4 border-b">Quantité</th>
                        <th className="py-2 px-4 border-b">Unité</th>
                        <th className="py-2 px-4 border-b">Prix Total</th>
                        <th className="py-2 px-4 border-b">
                          Type de transport.
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Statut
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Statut du paiement
                        </th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commandesData.map((item) => (
                        <tr key={item._id} className="text-sm">
                          <td className="py-2 px-4 border-b">
                            {/* Add your action buttons or links here */}
                            <i
                              onClick={() => handleShowImage(item)}
                              className="ml-4 fa-regular fa-image text-[#5C73DB] cursor-pointer"
                            ></i>
                          </td>
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
                            {item?.trackingId ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.pricing?.price && item.pricing?.unit.label
                              ? `${item?.pricing?.price} F CFA / ${item.pricing?.unit.label}`
                              : "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.quantity ?? "N/A"}
                          </td>

                          <td className="py-2 px-4 border-b">
                            {item?.unit?.label ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.pricing?.price && item.quantity
                              ? `${Math.round(
                                  item?.pricing?.price * item.quantity,
                                )} F CFA`
                              : "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.transportType?.label ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <div
                              className={`px-4 py-2 rounded-2xl w-fit ${
                                item.status === "Arrivée"
                                  ? "bg-[#DCFCE7]"
                                  : "bg-[#FFEDD5]"
                              } ${
                                item.status === "Arrivée"
                                  ? "text-[#166534]"
                                  : "text-[#9A3412]"
                              }`}
                            >
                              {item.status}
                            </div>
                          </td>
                          <td className="py-2 px-4 border-b">
                            <div
                              className={`px-4 py-2 rounded-2xl w-fit ${
                                item.paymentStatus === "paid"
                                  ? "bg-[#DCFCE7]"
                                  : "bg-[#FFEDD5]"
                              } ${
                                item.paymentStatus === "paid"
                                  ? "text-[#166534]"
                                  : "text-[#9A3412]"
                              }`}
                            >
                              {item.paymentStatus === "paid"
                                ? "Payée"
                                : "Non payée"}
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
            <PaginationElement
              page={page}
              setPage={setPage}
              pages={pages}
              total={total}
            />
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

      <OrderImagesModal
        isOpen={showImagesModal}
        closeModal={setShowImagesModal}
        selectedOrder={selectedOrder}
      />
    </div>
  );
};
