import { useCallback, useEffect, useState } from "react";
import {
  checkPermissionActionToDisplay,
  checkPermissionNameToDisplay,
  validPermissionNames,
} from "@/constants/templates";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";
import { UpdateUserPermissionModal } from "@/components/dashboard_components/users-permissions/UpdateUserPermissionModal";
import { GET } from "@/constants/fetchConfig";
import CustomLoader from "@/components/CustomLoader";
import { Product } from "@/components/dashboard_components/ProductsList";
import { Commande } from "@/components/dashboard_components/OrderList";
import { Client } from "@/components/dashboard_components/ClientList";
import clsx from "clsx";

export interface Transaction {
  _id: string;
  reference: string;
  name: string;
  amount: number;
  status: "failed" | "pending" | "success";
  transactionType: "product" | "order";
  client: Client;
  transactionPhone: { network: "MTN" | "MOOV"; value: string };
  item: Product | Commande;
  step: "1" | "2";
  createdAt: Date;
  updatedAt: Date;
}

export const TransactionListComponent = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);

  // Function to fetch employees data

  const fetchTransactionsData = useCallback(async () => {
    try {
      const response = await GET(
        `/transactions${searchText.length > 0 ? `?search=${searchText}` : ""}`,
      );

      const data: Transaction[] = response;
      // Set the fetched data into state
      setTransactionsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors
    }
  }, [searchText]);

  useEffect(() => {
    setLoading(true);
    fetchTransactionsData().finally(() => setLoading(false));
  }, [fetchTransactionsData, setLoading]);

  return (
    <div className="bg-gray-50 flex flex-col justify-center text-black">
      <div className="px-4 pt-4">
        <p className="mb-3 font-semibold text-2xl">Voir les transactions</p>

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
          <div className="mr-5 px-4 pb-10 bg-white rounded-[12px] overflow-auto">
            <div className="flex flex-col rounded-[12px] border-blue-600 w-full">
              <div className="inline-flex flex-col items-start gap-[16px]">
                <div className="container mx-auto mt-8">
                  <table className="min-w-fit w-fit">
                    <thead>
                      <tr className="text-gray-500">
                        <th className="py-2 px-4 border-b text-start">
                          Référence
                        </th>
                        <th className="py-2 px-4 border-b text-start">
                          Nom de transaction
                        </th>
                        <th className="py-2 px-4 border-b text-start">
                          Montant
                        </th>
                        <th className="py-2 px-4 border-b text-start">
                          Quantité
                        </th>
                        <th className="py-2 px-4 border-b text-start">
                          Status
                        </th>
                        <th className="py-2 px-4 border-b text-start">
                          Client
                        </th>
                        <th className="py-2 px-4 border-b text-start">
                          Numéro de transaction
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Type de transaction
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Element de transaction
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Mobile Money
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Crée le
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Modifiée le
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionsData.map((item) => (
                        <tr key={item._id}>
                          <td className="py-2 px-4 border-b">
                            {item.reference}
                          </td>
                          <td className="py-2 px-4 border-b">{item.name}</td>
                          <td className="py-2 px-4 border-b">
                            {item.amount} F CFA
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {"pricing" in item.item
                              ? item.item.pricing?.price
                                ? item.amount / item.item.pricing?.price
                                : "-"
                              : "price" in item.item
                                ? item.amount / item.item.price
                                : "-"}
                          </td>

                          <td className="py-2 px-4 border-b">
                            <div
                              className={clsx(
                                item.status === "failed"
                                  ? "bg-red-700"
                                  : item.status === "pending"
                                    ? "bg-orange-700"
                                    : "bg-green-700",
                                "text-white  py-1 px-2 rounded-md",
                              )}
                            >
                              {item.status === "failed"
                                ? "Echouée"
                                : item.status === "pending"
                                  ? "En attente"
                                  : "Réussie"}
                            </div>
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item.client.lastName} {item.client.firstName}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item.transactionPhone.network} -{" "}
                            {item.transactionPhone.value}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {item.transactionType === "product"
                              ? "Produit"
                              : "Commande"}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {"trackingId" in item.item
                              ? `Commande ${item.item.trackingId}`
                              : `Produit ${item.item.name}`}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <div
                              className={clsx(
                                item.step === "1"
                                  ? "bg-red-700"
                                  : "bg-green-700",
                                "text-white  py-1 px-2 rounded-md text-center",
                              )}
                            >
                              {item.step === "1" ? "Echoué" : "Réussi"}
                            </div>
                          </td>
                          <td className="py-2 px-4 border-b">
                            {new Date(item.createdAt).toLocaleString("fr-Fr")}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {new Date(item.updatedAt).toLocaleString("fr-Fr")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
