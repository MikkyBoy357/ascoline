import { useCallback, useEffect, useState } from "react";
import { AddOrderModal } from "../orders/AddOrderModal";
import { AddPricingModal } from "../pricings/AddPricingModal";
import { PackageType } from "../SettingComponents/PackageCard";
import { TransportType } from "../SettingComponents/TransportCard";
import { MeasureUnit } from "../SettingComponents/UnitCard";

import DeleteCountryModal from "../SettingComponents/SettingPopups/DeleteCountryModal";
import { useRouter } from "next/router";
import { AddProductModal } from "@/components/dashboard_components/products/AddProductModal";
import CustomLoader from "@/components/CustomLoader";
import { DELETE, GET } from "@/constants/fetchConfig";
import ProductDescriptionModal from "@/components/dashboard_components/products/ProductDescriptionModal";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import ProductImageModal from "@/components/dashboard_components/products/ProductImageModal";
import { PaginationElement } from "@/components/dashboard_components/PaginationElement";

export interface Product {
  _id: string;
  price: number;
  description: string;
  name: string;
  quantity: number;
  images: string[];
}

export const ProductListComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemId, setItemId] = useState("");

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const [modify, setModify] = useState(false);

  const [selectedItem, setSelectedItem] = useState<Product>();
  const [showModal, setShowModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);

  const toggleShowModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      setModify(false);
    }
  };

  const handleModify = (item: Product) => {
    setModify(true);
    setSelectedItem(item);
    toggleShowModal();
  };

  const handleShowDescription = (item: Product) => {
    setShowDescriptionModal(true);
    setSelectedItem(item);
  };

  const handleShowImageModal = (item: Product) => {
    setShowImageModal(true);
    setSelectedItem(item);
  };

  // Function to fetch pricings data

  const fetchProductData = useCallback(async () => {
    try {
      const response = await GET(
        `/products?page=${page}${
          searchText.length > 0 ? `&search=${searchText}` : ""
        }`,
      );

      const data: Product[] = response.products;
      // Set the fetched data into state
      setPricingsData(data);
      setPage(response.currentPage);
      setPages(response.totalPages);
      setTotal(response.total);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  }, [searchText, page]);

  useEffect(() => {
    setLoading(true);
    fetchProductData().finally(() => setLoading(false));
  }, [fetchProductData, setLoading]);

  const [pricingsData, setPricingsData] = useState<Product[]>([]);

  const [packageTypesData, setPackageTypesData] = useState<PackageType[]>([]);
  const [transportTypesData, setTransportTypesData] = useState<TransportType[]>(
    [],
  );
  const [measureUnitsData, setMeasureUnitsData] = useState<MeasureUnit[]>([]);

  const handleDeleteItem = async () => {
    try {
      console.log(`Deleting product with ID: ${itemId}`);
      /*            const response = await fetch(`/products/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });*/

      const response = await DELETE(`/products/${itemId}`);

      /*            if (!response.ok) {
                const errorData = await response.json()
                alert(`Error => ${errorData.message}`)
                throw new Error(`Failed to delete`);
            }*/

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
        <p className="mb-3 font-semibold text-2xl">Produits Disponibles</p>
        <div className="mr-10 px-4 py-3 pb-10 bg-white rounded-[12px]">
          <div className="rounded-[12px] border-blue-600">
            <div className="mb-3 flex justify-between top-[31px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-800 text-[18px] tracking-[0] leading-[normal]">
              Liste des produits
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
              <div className="inline-flex flex-col items-start gap-[16px] min-w-full max-w-6xl">
                <div className="container mx-auto mt-8 h-[60vh]">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-gray-500 text-sm">
                        <th className="py-2 px-4 border-b">Image</th>
                        <th className="py-2 px-4 border-b">Nom</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Prix</th>
                        <th className="py-2 px-4 border-b">Quantité</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingsData.map((item) => (
                        <tr key={item._id} className="text-sm text-center">
                          <td className="py-2 px-4 border-b">
                            <div className=" flex justify-center">
                              {item.images[0] ?? null ? (
                                <Image
                                  src={item.images[0]}
                                  alt={item.images[0]}
                                  width={50}
                                  height={100}
                                  className="h-16 w-16 flex-none rounded-md bg-gray-100 object-cover object-center cursor-pointer"
                                  onClick={() => {
                                    handleShowImageModal(item);
                                  }}
                                />
                              ) : (
                                <button
                                  onClick={() => {
                                    handleShowImageModal(item);
                                  }}
                                  className="h-16 w-16 flex rounded-md bg-gray-100 items-center justify-center "
                                >
                                  <ImageIcon className="h-10 w-10" />
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="py-2 px-4 border-b">{item.name}</td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => handleShowDescription(item)}
                              className=" h-8 p-2 rounded-lg border border-indigo-500 justify-center items-center inline-flex"
                            >
                              <div className="text-indigo-500 text-xs font-medium font-['Inter']">
                                Afficher
                              </div>
                            </button>
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item.price} F CFA
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item.quantity}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {/* Add your action buttons or links here */}
                            <button
                              onClick={() => handleModify(item)}
                              className=" h-8 p-2 rounded-lg border border-indigo-500 justify-center items-center inline-flex"
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
                              className="ml-4  h-8 p-2 bg-red-600 rounded-lg justify-center items-center inline-flex"
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
            <PaginationElement
              page={page}
              setPage={setPage}
              pages={pages}
              total={total}
            />
          </div>
        </div>
      </div>

      <AddProductModal
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

      <ProductDescriptionModal
        visible={showDescriptionModal}
        onClose={setShowDescriptionModal}
        description={selectedItem?.description ?? ""}
      />

      <ProductImageModal
        isOpen={showImageModal}
        closeModal={setShowImageModal}
        selectedProduct={selectedItem}
      />
    </div>
  );
};
