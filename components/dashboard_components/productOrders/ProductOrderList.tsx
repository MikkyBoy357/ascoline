import { useCallback, useEffect, useState } from "react";
import { Client } from "../clients/ClientList";
import { useRouter } from "next/router";
import CustomLoader from "@/components/CustomLoader";
import { DELETE, GET } from "@/constants/fetchConfig";
import StatusFilter from "@/components/dashboard_components/filters/StatusFilter";
import ClientFilter from "@/components/dashboard_components/filters/ClientFilter";
import DateRangeFilter from "@/components/dashboard_components/filters/DateRangeFilter";
import { DateRange } from "react-day-picker";
import ResetFilter from "@/components/dashboard_components/filters/ResetFilter";
import { Product } from "@/components/dashboard_components/products/ProductsList";
import ProductFilter from "@/components/dashboard_components/filters/ProductFilter";
import { AddProductOrderModal } from "@/components/dashboard_components/productOrders/AddProductOrderModal";
import DeleteCountryModal from "@/components/dashboard_components/SettingComponents/SettingPopups/DeleteCountryModal";
import { PaginationElement } from "@/components/dashboard_components/PaginationElement";

// import { Unit } from "../MyInputFieldComponents";

export interface ProductOrder {
  _id: string;
  reference: string;
  product: Product;
  client: Client;
  quantity: number;
  price: number;
  total: number;
  specialNote: string;
  status: string;
  paymentStatus: "unpaid" | "paid";
}

export interface FiltersType {
  status: string[];
  clients: string[];
  packageTypes: string[];
  transportTypes: string[];
  products: string[];
  date: DateRange | undefined;
}

export const ProductOrderListComponent = () => {
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

  const [selectedProductOrder, setSelectedProductOrder] =
    useState<ProductOrder>();

  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);

  // Function to fetch product orders data
  const fetchProductOrderData = useCallback(async () => {
    let apiUrl = "/productOrders";
    let queryParams = [];

    queryParams.push(`page=${page}`);
    if (searchText.length > 0) queryParams.push(`search=${searchText}`);
    if (filters.status.length > 0) queryParams.push(`status=${filters.status}`);
    if (filters.clients.length > 0)
      queryParams.push(`clients=${filters.clients}`);
    if (filters.products.length > 0)
      queryParams.push(`products=${filters.products}`);
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

      const data: ProductOrder[] = response.productOrders;
      // Set the fetched data into state
      setProductOrdersData(data);
      setPage(response.currentPage);
      setPages(response.totalPages);
      setTotal(response.total);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  }, [searchText, filters, page]);

  // Function to fetch product data

  const fetchProductData = useCallback(async () => {
    try {
      const response = await GET(`/products?limit=0`);
      const data: Product[] = response.products;
      // Set the fetched data into state
      setProductsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  }, []);

  // Function to fetch clients data

  const fetchClientsData = useCallback(async () => {
    try {
      const response = await GET(`/clients?limit=0`);

      const data: Client[] = response.clients;

      // Set the fetched data into state
      setClientsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  }, []);

  const toggleShowModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      setModify(false);
    }
  };

  const handleModify = (item: ProductOrder) => {
    setModify(true);
    setSelectedProductOrder(item);
    toggleShowModal();
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchProductData(),
      fetchClientsData(),
      fetchProductOrderData(),
    ]).finally(() => setLoading(false));
  }, [fetchProductOrderData, fetchProductData, fetchClientsData, setLoading]);

  const [productOrdersData, setProductOrdersData] = useState<ProductOrder[]>(
    [],
  );

  const [productsData, setProductsData] = useState<Product[]>([]);

  const [clientsData, setClientsData] = useState<Client[]>([]);

  const handleDeleteItem = async () => {
    try {
      console.log(`Deleting client with ID: ${itemId}`);

      const response = DELETE(`/productOrders/${itemId}`);

      router.reload();
    } catch (error) {
      console.error(`Error deleting:`, error);
      alert(`Failed to delete`); // Show error alert
    }
  };

  return (
    <div className="flex flex-col justify-center text-black">
      <div className="pl-4 pt-4">
        {/* <p className="mb-3 font-semibold text-2xl">{modify.toString()}</p> */}
        <p className="mb-3 font-semibold text-2xl">Commandes de produits</p>
        <div className="mr-10 px-4 py-3 pb-10 bg-white rounded-[12px]">
          <div className="rounded-[12px] border-blue-600">
            <div className="mb-3 flex justify-between top-[31px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-800 text-[18px] tracking-[0] leading-[normal]">
              Liste des commandes de produits
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
              <StatusFilter
                filters={filters}
                setFilters={setFilters}
                allStatus={["Enregistrée", "Livrée"]}
              />
              <ClientFilter
                filters={filters}
                setFilters={setFilters}
                clientsData={clientsData}
              />
              <ProductFilter
                filters={filters}
                setFilters={setFilters}
                productsData={productsData}
              />
              <DateRangeFilter filters={filters} setFilters={setFilters} />

              <ResetFilter filters={filters} setFilters={setFilters} />
            </div>

            {loading ? (
              <CustomLoader />
            ) : (
              <div className="inline-flex flex-col items-start gap-[16px] min-w-full max-w-6xl overflow-auto">
                <div className="container mx-auto mt-8 h-[60vh]">
                  <table className="min-w-full p-5">
                    <thead>
                      <tr className="text-gray-500 text-sm text-left">
                        <th className="py-2 px-4 border-b">Référence</th>
                        <th className="py-2 px-4 border-b">Client</th>
                        <th className="py-2 px-4 border-b">Nom du produit</th>
                        <th className="py-2 px-4 border-b">Tarif</th>
                        <th className="py-2 px-4 border-b">Quantité</th>
                        <th className="py-2 px-4 border-b">Prix Total</th>
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
                      {productOrdersData.map((item) => (
                        <tr key={item._id} className="text-sm">
                          <td className="py-2 px-4 border-b">
                            {item?.reference ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.client?.lastName ?? "N/A"}{" "}
                            {item?.client?.firstName ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item?.product?.name ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {`${item?.price} F CFA` ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {`${item?.quantity}` ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {`${item?.total} F CFA` ?? "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <div
                              className={`px-4 py-2 rounded-3xl w-fit ${
                                item.status === "Livrée"
                                  ? "bg-[#DCFCE7]"
                                  : "bg-[#FFEDD5]"
                              } ${
                                item.status === "Livrée"
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

      <AddProductOrderModal
        isVisible={showModal}
        onClose={toggleShowModal}
        isModify={modify}
        selectedProductOrder={selectedProductOrder!}
        productsData={productsData}
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
