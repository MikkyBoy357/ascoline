import { useCallback, useEffect, useState } from "react";
import { AddClientModal } from "./AddClientModal";

import DeleteCountryModal from "../SettingComponents/SettingPopups/DeleteCountryModal";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import CustomLoader from "@/components/CustomLoader";
import { DELETE, GET } from "@/constants/fetchConfig";
import { PaginationElement } from "@/components/dashboard_components/PaginationElement";

export interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  address: string;
}

export const ClientListComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modify, setModify] = useState(false);

  const [selectedClient, setSelectedClient] = useState<Client>();
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);

  const toggleShowModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      setModify(false);
    }
  };

  const handleModify = (item: Client) => {
    setModify(true);
    setSelectedClient(item);
    toggleShowModal();
  };

  const [clientsData, setClientsData] = useState<Client[]>([]);

  // Function to fetch clients data
  const fetchClientsData = useCallback(async () => {
    try {
      const response = await GET(
        `/clients?page=${page}${
          searchText.length > 0 ? `&search=${searchText}` : ""
        }`,
      );

      const data: Client[] = response.clients;
      // Set the fetched data into state
      setClientsData(data);
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
    fetchClientsData().finally(() => setLoading(false));
  }, [fetchClientsData, setLoading]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const [itemId, setItemId] = useState("");

  const handleSetItemId = (id: string) => {
    setItemId(id);
  };

  const handleDeleteItem = async () => {
    try {
      console.log(`Deleting client with ID: ${itemId}`);

      const response = await DELETE(`/clients/${itemId}`);

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
    <div className="bg-gray-50 flex flex-col justify-center text-black">
      <div className="pl-4 pt-4">
        <p className="mb-3 font-semibold text-2xl">Clients</p>

        <div className="mr-10 px-4 py-3 pb-10 bg-white rounded-[12px]">
          <div className="relative mb-4 mr-4">
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
          <button
            onClick={toggleShowModal}
            className="mb-4 inline-flex h-[48px] items-center justify-center gap-[8px] p-[16px] relative bg-[#4763e4] rounded-[10px]"
          >
            <div className="relative w-fit mt-[-4.00px] mb-[-2.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[18px] tracking-[0] leading-[normal]">
              Ajouter un client
            </div>
            <i className="fa-solid fa-plus ml-1 text-white"></i>
          </button>
          {loading ? (
            <CustomLoader />
          ) : (
            <div className="inline-flex flex-col items-start gap-[16px] min-w-full max-w-6xl overflow-auto">
              <div className="container mx-auto mt-8 h-[60vh]">
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
                      <tr key={item._id} className="text-center">
                        <td className="py-2 px-4 border-b">{item.lastName}</td>
                        <td className="py-2 px-4 border-b">{item.firstName}</td>
                        <td className="py-2 px-4 border-b">{item.email}</td>
                        <td className="py-2 px-4 border-b">{item.phone}</td>
                        <td className="py-2 px-4 border-b">
                          <div
                            className={`px-4 py-2 rounded-3xl ${
                              item.status.toLocaleLowerCase() === "actif"
                                ? "bg-[#DCFCE7]"
                                : "bg-[#FFEDD5]"
                            } ${
                              item.status.toLocaleLowerCase() === "actif"
                                ? "text-[#166534]"
                                : "text-[#9A3412]"
                            }`}
                          >
                            {item.status}
                          </div>
                        </td>
                        <td className="py-2 px-4 border-b text-center">
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

      <AddClientModal
        isVisible={showModal}
        onClose={toggleShowModal}
        type="client"
        isModify={modify}
        selectedUser={selectedClient!}
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
