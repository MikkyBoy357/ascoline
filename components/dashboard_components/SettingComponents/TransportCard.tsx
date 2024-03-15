import React, { useCallback, useEffect, useState } from "react";
import { Country } from "./CountryCard";
import { PackageType } from "./PackageCard";
import { MeasureUnit } from "./UnitCard";
import CustomLoader from "@/components/CustomLoader";
import { GET } from "@/constants/fetchConfig";
import { PaginationElement } from "@/components/dashboard_components/PaginationElement";

export interface TransportType {
  _id: string;
  label: string;
  description: string;
}

interface TransportCardProps {
  toggleShowModal: () => void;
  toggleShowDelModal: () => void;
  handleSetItemId: (id: string) => void;
  handleModify: (
    item: Country | MeasureUnit | TransportType | PackageType,
  ) => void;
}

export const TransportCard: React.FC<TransportCardProps> = ({
  toggleShowModal,
  toggleShowDelModal,
  handleSetItemId,
  handleModify,
}) => {
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [transportTypesData, setTransportTypesData] = useState<TransportType[]>(
    [],
  );

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);

  // Function to fetch transport types data
  const fetchTransportData = useCallback(async () => {
    try {
      const response = await GET(
        `/transportTypes?page=${page}${
          searchText.length > 0 ? `&search=${searchText}` : ""
        }`,
      );

      const data: TransportType[] = response.transportTypes;
      // Set the fetched data into state
      setTransportTypesData(data);
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
    fetchTransportData().finally(() => setLoading(false));
  }, [fetchTransportData, setLoading]);

  return (
    <div className="w-1/2 mr-10 px-4 py-3 pb-10 bg-white rounded-[12px]">
      <div className="rounded-[12px] border-blue-600">
        <div className="mb-3 flex flex-row justify-between top-[31px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-800 text-[18px] tracking-[0] leading-[normal]">
          Liste des types de transport
          <button
            onClick={toggleShowModal}
            className="px-4 py-3 [font-family:'Inter-Regular',Helvetica] font-normal text-[#ffffff] text-sm tracking-[0] leading-[normal] bg-[#4763E4] items-center rounded-xl"
          >
            Ajouter
            <i className="fa-solid fa-plus ml-1"></i>
          </button>
        </div>
        <div className="relative">
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
          <div className="inline-flex flex-col items-start gap-[16px] min-w-full overflow-auto">
            <div className="container mx-auto mt-8 h-[40vh]">
              <table className="min-w-full">
                <thead>
                  <tr className="text-gray-500 text-sm">
                    <th className="py-2 px-4 border-b">Libellé</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transportTypesData.map((item) => (
                    <tr key={item._id} className="text-sm text-center">
                      <td className="py-2 px-4 border-b">{item.label}</td>
                      <td className="py-2 px-4 border-b">{item.description}</td>
                      <td className="py-2 px-4 border-b">
                        {/* Add your action buttons or links here */}
                        <button
                          onClick={() => {
                            handleModify(item);
                            handleSetItemId(item._id);
                            toggleShowModal();
                          }}
                          className="h-8 px-4 rounded-lg border border-indigo-500 justify-center items-center inline-flex"
                        >
                          <div className="text-indigo-500 text-xs font-medium font-['Inter']">
                            Modifier
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            toggleShowDelModal();
                            handleSetItemId(item._id);
                          }}
                          className="ml-4 h-8 px-4 bg-red-600 rounded-lg justify-center items-center inline-flex"
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
  );
};

export default TransportCard;
