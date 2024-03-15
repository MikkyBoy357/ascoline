import {
  ADD_ORDER_INPUTS,
  ADD_PRODUCT_ORDER_INPUTS,
} from "@/constants/templates";
import { renderInputField } from "@/components/signup";
import React, { useCallback, useEffect, useState } from "react";
import { Client } from "../clients/ClientList";
// import ClientSelectComponent, { Unit } from '../MyInputFieldComponents';
import UnitSelectComponent from "../../MyUnitSelectComponent";
import ClientSelectComponent from "../../MyInputFieldComponents";
import { Toast } from "@/constants/toastConfig";
import { useRouter } from "next/router";
import { POST, PUT } from "@/constants/fetchConfig";
import { ProductOrder } from "@/components/dashboard_components/productOrders/ProductOrderList";
import { Product } from "@/components/dashboard_components/products/ProductsList";
import ProductSelectComponent from "@/components/ProductSelectComponents";

export interface AddProductOrderModalProps {
  isVisible: Boolean;
  onClose: () => void;
  isModify: Boolean;
  selectedProductOrder: ProductOrder;
  clientsData: Client[];
  productsData: Product[];
}

export const AddProductOrderModal: React.FC<AddProductOrderModalProps> = ({
  isVisible,
  onClose,
  isModify,
  selectedProductOrder,
  clientsData,
  productsData,
}) => {
  const router = useRouter();

  // text fields

  const [client, setClient] = useState<Client>();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [specialNote, setSpecialNote] = useState("");

  const [isChanged, setIsChanged] = useState(false);

  const wasChanged = useCallback(() => {
    if (
      client !== selectedProductOrder.client ||
      product !== selectedProductOrder.product ||
      quantity !== selectedProductOrder.quantity.toString() ||
      price !== selectedProductOrder.price.toString() ||
      total !== selectedProductOrder.total.toString() ||
      status !== selectedProductOrder.status ||
      paymentStatus !== selectedProductOrder.paymentStatus ||
      specialNote !== selectedProductOrder.specialNote
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [
    client,
    paymentStatus,
    price,
    product,
    quantity,
    selectedProductOrder,
    specialNote,
    status,
    total,
  ]);

  // auto fill text field when user is editing an order
  useEffect(() => {
    if (isModify) {
      console.log("====> Modify <====");

      setClient(selectedProductOrder.client);
      setProduct(selectedProductOrder.product);
      setQuantity(selectedProductOrder.quantity.toString());
      setPrice(selectedProductOrder.price.toString());
      setTotal(selectedProductOrder.total.toString());
      setStatus(selectedProductOrder.status);
      setPaymentStatus(selectedProductOrder.paymentStatus);
      setSpecialNote(selectedProductOrder.specialNote);
    } else {
      setClient(undefined);
      setProduct(undefined);
      setQuantity("1");
      setPrice("");
      setTotal("");
      setStatus("");
      setPaymentStatus("");
      setSpecialNote("");
    }
  }, [isModify, selectedProductOrder]);

  // Call the `wasChanged` function whenever the state values change
  useEffect(() => {
    if (isModify) {
      wasChanged();
    }
  }, [isModify, wasChanged]);

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  const handleSelectClient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClientId = event.target.value;
    const selectedClient = clientsData.find(
      (client) => client._id === selectedClientId,
    );

    if (selectedClient) {
      setClient(selectedClient); // Assign the selected Client object to state
    }
  };

  const handleSelectProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = event.target.value;
    const selectedProduct = productsData.find(
      (product) => product._id === selectedProductId,
    );

    if (selectedProduct) {
      setProduct(selectedProduct); // Assign the selected Client object to state
      setPrice(selectedProduct.price.toString());
      setTotal((selectedProduct.price * Number(quantity ?? 0)).toString());
    }
  };

  // Product Order Status enums
  const statusEnum = ["Enregistrée", "Livrée"];

  // Product Order Payment Status enums
  const paymentStatusEnum = ["unpaid", "paid"];

  // Function to add product order
  const addProductOrder = async () => {
    try {
      const newProductOrder = {
        client: client?._id,
        product: product?._id,
        quantity: Number(quantity),
        price: Number(price),
        total: Number(total),
        status: status,
        paymentStatus,
        specialNote: specialNote,
      };

      console.log("NewProductOrder JSON Body", newProductOrder);

      // Perform validation to check if all variables are not empty
      if (
        client?._id.trim() === "" ||
        product?._id.trim() === "" ||
        quantity.trim() === "" ||
        price.trim() === "" ||
        total.trim() === "" ||
        status.trim() === "" ||
        specialNote.trim() === ""
      ) {
        await Toast.fire({
          icon: "error",
          title: "Veuillez remplir tous les champs",
        });
        return;
      }

      var response;

      if (!isModify) {
        response = await POST(`/productOrders`, newProductOrder);
      } else {
        if (!isChanged) {
          await Toast.fire({
            icon: "error",
            title: "Les valeures n'ont pas changé",
          });
          return;
        }

        response = await PUT(
          `/productOrders/${selectedProductOrder._id}`,
          newProductOrder,
        );
      }

      console.log(
        `Commande de produit ${isModify ? "modifiée" : "ajoutée"} avec succès!`,
      );
      onClose();
      Toast.fire({
        icon: "success",
        title: `Commande de produit ${
          isModify ? "edited" : "added"
        } successfully!`,
      });
      router.reload();
    } catch (error) {
      await Toast.fire({
        icon: "error",
        title: "Une erreur est survenue",
      });
      console.error("Error adding pricing:", error);
      // Handle errors
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="flex flex-col">
        <button onClick={onClose} className="text-white text-xl place-self-end">
          X
        </button>
        <div className="flex bg-white p-4 rounded-lg items-center justify-center">
          {/* Top */}
          <div className="flex flex-col items-center">
            <div className="w-[1104px] bg-white rounded-[12px]">
              <div className="mt-3[font-family:'Inter-Regular',Helvetica] font-medium text-gray-800 text-[18px] tracking-[0] leading-[normal]">
                {isModify ? "Modification" : "Enregistrement"}{" "}
                {"d'une commande de"}
                produit
              </div>
              <div className="mt-4 flex flex-col items-start gap-[16px] top-[94px] left-[32px]">
                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                  {/* // Transport Select */}
                  <div className="flex flex-col">
                    <p>Client</p>
                    <ClientSelectComponent
                      id={ADD_PRODUCT_ORDER_INPUTS[0].id}
                      value={client?._id ?? ""}
                      handleSelect={handleSelectClient}
                      selectList={clientsData}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p>Produit</p>
                    <ProductSelectComponent
                      id={ADD_PRODUCT_ORDER_INPUTS[1].id}
                      value={product?._id ?? ""}
                      handleSelect={handleSelectProduct}
                      selectList={productsData}
                    />
                  </div>
                </div>
                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                  {renderInputField(
                    ADD_PRODUCT_ORDER_INPUTS[2],
                    quantity,
                    (e) => {
                      let numberQuantity = Number(e.target.value);

                      setQuantity(e.target.value);
                      if (product) {
                        setPrice(product.price.toString());
                        setTotal(
                          (
                            product.price * Number(e.target.value ?? "0")
                          ).toString(),
                        );
                      }
                    },
                  )}
                  {renderInputField(
                    ADD_PRODUCT_ORDER_INPUTS[3],
                    price,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    true,
                  )}
                </div>
                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                  {renderInputField(
                    ADD_PRODUCT_ORDER_INPUTS[4],
                    total,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    true,
                  )}
                </div>
                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                  {renderInputField(
                    ADD_PRODUCT_ORDER_INPUTS[5],
                    status,
                    (e) => setStatus(e.target.value),
                    (e: any) => setStatus(e.target.value),
                    statusEnum,
                  )}
                  <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
                    <div className="w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                      {"Statut du paiement"}
                    </div>
                    <select
                      id={"payment-status"}
                      onChange={(e) => {
                        setPaymentStatus(e.target.value);
                      }}
                      value={paymentStatus}
                      className="w-[520px] p-2 pb-[10px] text-gray-900 bg-white border border-gray-200 rounded-lg"
                    >
                      <option disabled selected value="">
                        {" "}
                        -- Sélectionnez une valeur --
                      </option>
                      {paymentStatusEnum?.map((item, index) => (
                        <option key={`${item}-${index}`} value={item}>
                          {item === "unpaid" ? "Non payée" : "Payée"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                  {renderInputField(
                    ADD_PRODUCT_ORDER_INPUTS[6],
                    specialNote,
                    (e) => setSpecialNote(e.target.value),
                  )}
                </div>
              </div>
              <div className="mt-5 flex flex-row">
                <button
                  onClick={addProductOrder}
                  className="w-48 h-12 p-4 bg-indigo-600 rounded-lg justify-center items-center gap-2 inline-flex"
                >
                  <div className="text-white text-lg font-normal font-['Inter']">
                    Enregistrer
                  </div>
                </button>
                <button
                  onClick={onClose}
                  className="ml-4 w-48 h-12 p-4 rounded-lg border border-zinc-300 justify-center items-center gap-2 inline-flex"
                >
                  <div className="text-zinc-800 text-lg font-normal font-['Inter']">
                    Annuler
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
