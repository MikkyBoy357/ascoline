import { Commande } from "@/components/dashboard_components/orders/OrderList";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Loader2, Trash } from "lucide-react";
import Image from "next/image";
import { POST } from "@/constants/fetchConfig";
import { useRouter } from "next/router";

export interface OrderImagesModalModalProps {
  isOpen: boolean;
  closeModal: any;
  selectedOrder: Commande | undefined;
}

export default function OrderImagesModal({
  isOpen,
  closeModal,
  selectedOrder,
}: OrderImagesModalModalProps) {
  const urlPath = "";

  const ordersImages = useMemo(() => {
    console.log(selectedOrder?.images);
    return (
      selectedOrder?.images.map((orderImg) => {
        return {
          url: orderImg,
          toDelete: false,
        };
      }) ?? []
    );
  }, [selectedOrder]);

  const router = useRouter();
  const [files, setFiles] = useState<File[]>();
  const [orderFiles, setOrderFiles] = useState(ordersImages);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOrderFiles(ordersImages);
  }, [ordersImages]);

  const checkDeletedOrderFiles = useMemo(() => {
    return orderFiles.filter((orderFile) => orderFile.toDelete);
  }, [orderFiles]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const maxSize = 10 * 1024 * 1024; // 10 MB in bytes

    // Check if files are selected
    if (!files?.length) {
      setError("Veuillez sélectionner au moins une image");
      return;
    }

    const checkSize = Array.from(files).every((file) => file.size < maxSize);

    if (!checkSize) {
      setError("La taille maximale d'une image est de 10 MB");
      return;
    }

    setFiles((prevState) => [...(prevState ?? []), ...Array.from(files)]);
  };

  const modifyOrderImagesButton = useCallback(async () => {
    setLoading(true);
    if (files !== undefined) {
      // create a new FormData object and append the file to it
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const response = await POST(
        `/commandes/${selectedOrder?._id}/add-files`,
        formData,
        { "Content-Type": "multipart/form-data" },
      );
    }

    if (checkDeletedOrderFiles.length > 0) {
      const response = await POST(
        `/commandes/${selectedOrder?._id}/remove-files`,
        {
          images: checkDeletedOrderFiles.map((deletedImg) => deletedImg.url),
        },
      );
    }

    closeModal(false);
    setLoading(false);
    router.reload();
  }, [files, checkDeletedOrderFiles, closeModal, router, selectedOrder]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={(value) => closeModal(value)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {"Changer images d'une commande"}
                </Dialog.Title>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <i className=" m-4 fa-solid fa-cloud-arrow-down text-white"></i>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX 10 MB)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        multiple={true}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e)}
                      />
                    </label>
                  </div>
                  {error && (
                    <p className="my-2 text-red-500 text-center">{error}</p>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
                    Images ajoutées
                  </h3>
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500 max-h-64 overflow-auto"
                  >
                    {files !== undefined &&
                      files.map((file, index) => (
                        <li
                          key={`uploaded-${index}`}
                          className="flex space-x-6 py-4 text-black"
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            width={50}
                            height={100}
                            className="h-20 w-20 flex-none rounded-md bg-gray-100 object-cover object-center"
                          />

                          <div className="flex-auto space-y-1">
                            <h3 className="text-gray-900">{file.name}</h3>
                          </div>
                          <Trash
                            onClick={() => {
                              const newFiles = files?.filter(
                                (newFile) => newFile.name !== file.name,
                              );
                              setFiles(newFiles);
                            }}
                            className="h-5 w-5 text-red-500 cursor-pointer"
                          />
                        </li>
                      ))}

                    {orderFiles !== undefined &&
                      orderFiles.map((orderFile, index) => (
                        <Fragment key={`orderFile-${index}`}>
                          {!orderFile.toDelete && (
                            <li
                              key={`orderFile-${index}`}
                              className="flex space-x-6 py-4 text-black"
                            >
                              <Image
                                src={orderFile.url}
                                alt={orderFile.url}
                                width={50}
                                height={100}
                                className="h-20 w-20 flex-none rounded-md bg-gray-100 object-cover object-center"
                              />

                              <div className="flex-auto space-y-1">
                                <h3 className="text-gray-900">{`Commande image ${
                                  index + 1
                                }`}</h3>
                              </div>
                              <Trash
                                onClick={() => {
                                  const newOrderFiles = orderFiles.map(
                                    (newOrderFile) => {
                                      if (newOrderFile.url === orderFile.url)
                                        return {
                                          ...newOrderFile,
                                          toDelete: true,
                                        };
                                      else return newOrderFile;
                                    },
                                  );
                                  setOrderFiles(newOrderFiles);
                                }}
                                className="h-5 w-5 text-red-500 cursor-pointer"
                              />
                            </li>
                          )}
                        </Fragment>
                      ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
                    onClick={(value) => {
                      setFiles(undefined);
                      setOrderFiles(ordersImages);
                      closeModal(false);
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    disabled={
                      (files === undefined &&
                        checkDeletedOrderFiles.length === 0) ||
                      loading
                    }
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={async (value) => {
                      await modifyOrderImagesButton();
                    }}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Enregistrer"
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
