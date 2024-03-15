import { useCallback, useEffect, useState } from "react";
import { AddClientModal } from "../clients/AddClientModal";
import {
  checkPermissionActionToDisplay,
  checkPermissionNameToDisplay,
  validPermissionNames,
} from "@/constants/templates";
import DeleteCountryModal from "../SettingComponents/SettingPopups/DeleteCountryModal";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";
import { UpdateUserPermissionModal } from "@/components/dashboard_components/usersPermissions/UpdateUserPermissionModal";
import { GET } from "@/constants/fetchConfig";
import CustomLoader from "@/components/CustomLoader";
import { PaginationElement } from "@/components/dashboard_components/PaginationElement";

export type PermissionName = (typeof validPermissionNames)[number];
export interface Permission {
  _id: string;
  name: PermissionName;
  description: string;
  action: "update" | "read" | "create" | "delete";
}
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  address: string;
  type: "admin" | "employee" | "client";
  permissions: Permission[];
}

function PermissionsModal({
  visible,
  onClose,
  permissions,
}: {
  visible: boolean;
  onClose: any;
  permissions?: Permission[];
}) {
  return (
    <Modal open={visible} setOpen={onClose} maxWidth="sm:max-w-xl">
      <div id="container-add" className="flex justify-center items-center">
        <div className="p-5 rounded-2xl bg-white">
          <div className="bg-white mb-4 text-[20px] font-bold rounded text-center text-black">
            Permissions
          </div>
          <div>
            {permissions ? (
              permissions.length > 0 ? (
                <>
                  {permissions.map((permission) => (
                    <span
                      key={permission._id}
                      className="inline-flex items-center m-2 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-semibold text-gray-600"
                    >
                      <span className="ml-1">
                        {checkPermissionNameToDisplay(permission)} -
                      </span>{" "}
                      <span className="ml-1">
                        {checkPermissionActionToDisplay(permission)}
                      </span>
                    </span>
                  ))}
                </>
              ) : (
                <span className="text-black">{`Pas de permissions`}</span>
              )
            ) : (
              <span className="text-black">{`Pas de permissions`}</span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
export const UsersPermissionsListComponent = () => {
  const router = useRouter();
  const [displayPermissions, setDisplayPermissions] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<
    Permission[] | undefined
  >();

  const [loading, setLoading] = useState(false);
  const [modify, setModify] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState<User>();
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal(!showModal);
    if (showModal) {
      setModify(false);
    }
  };

  const handleModify = (item: User) => {
    setModify(true);
    setSelectedEmployee(item);
    toggleShowModal();
  };

  const [employeesData, setEmployeesData] = useState<User[]>([]);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);

  // Function to fetch employees data

  const fetchEmployeesData = useCallback(async () => {
    try {
      const response = await GET(
        `/users?type=employee&page=${page}${
          searchText.length > 0 ? `&search=${searchText}` : ""
        }`,
      );

      const data: User[] = response.users;
      // Set the fetched data into state
      setEmployeesData(data);
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
    fetchEmployeesData().finally(() => setLoading(false));
  }, [fetchEmployeesData, setLoading]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const [itemId, setItemId] = useState("");

  const handleSetItemId = (id: string) => {
    setItemId(id);
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center text-black">
      <div className="px-4 pt-4">
        <p className="mb-3 font-semibold text-2xl">
          Changer permissions des collaborateurs
        </p>

        <div className="mr-10 px-4 py-3 pb-10 bg-white rounded-[12px]">
          <div className="rounded-[12px] border-blue-600">
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
              <div className="inline-flex flex-col items-start gap-[16px] min-w-full max-w-6xl overflow-auto">
                <div className="container mx-auto mt-8 h-[60vh]">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-gray-500">
                        <th className="py-2 px-4 border-b text-start">Noms</th>
                        <th className="py-2 px-4 border-b text-start">
                          Prénoms
                        </th>
                        <th className="py-2 px-4 border-b text-start">
                          E-mail
                        </th>
                        <th className="py-2 px-4 border-b text-start">
                          Téléphone
                        </th>
                        <th className="py-2 px-4 border-b text-center">
                          Permissions
                        </th>
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeesData.map((item) => (
                        <tr key={item._id}>
                          <td className="py-2 px-4 border-b">
                            {item.lastName}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {item.firstName}
                          </td>
                          <td className="py-2 px-4 border-b">{item.email}</td>
                          <td className="py-2 px-4 border-b">{item.phone}</td>
                          <td className="py-2 px-4 border-b text-center">
                            <button
                              type="button"
                              onClick={() => {
                                setDisplayPermissions(true);
                                setSelectedPermissions(item.permissions);
                              }}
                              className="rounded-md bg-[#4763e4]  p-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 "
                            >
                              Voir permissions
                            </button>
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {/* Add your action buttons or links here */}
                            {/*<i onClick={() => { setItemId(item._id); toggleShowDeleteModal() }} className="fa-regular fa-trash-can text-red-600"></i>*/}
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

      <UpdateUserPermissionModal
        visible={showModal}
        onClose={toggleShowModal}
        selectedUser={selectedEmployee}
      />

      <PermissionsModal
        visible={displayPermissions}
        onClose={setDisplayPermissions}
        permissions={selectedPermissions}
      />
    </div>
  );
};
