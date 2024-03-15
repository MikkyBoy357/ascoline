import {
  ADD_ORDER_INPUTS,
  ADD_PRICING_INPUTS,
  ADD_PRODUCT_INPUTS,
} from "@/constants/templates";
import { renderInputField } from "@/components/signup";
import React, { useCallback, useEffect, useState } from "react";
import { PackageType } from "../SettingComponents/PackageCard";
import { TransportType } from "../SettingComponents/TransportCard";
import { MeasureUnit } from "../SettingComponents/UnitCard";
import UnitSelectComponent from "../../MyUnitSelectComponent";
import { Pricing } from "../pricings/PricingList";
import { useRouter } from "next/router";
import { Toast } from "@/constants/toastConfig";
import { Product } from "@/components/dashboard_components/products/ProductsList";
import { POST, PUT } from "@/constants/fetchConfig";

export interface AddProductModalProps {
  isVisible: Boolean;
  text: string;
  onClose: () => void;
  isModify: Boolean;
  selectedItem: Product;
  packageTypesData: PackageType[];
  transportTypesData: TransportType[];
  measureUnitsData: MeasureUnit[];
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isVisible,
  text,
  onClose,
  isModify,
  selectedItem,
  packageTypesData,
  transportTypesData,
  measureUnitsData,
}) => {
  const router = useRouter();

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");

  // auto fill text field when user is editing an order
  useEffect(() => {
    if (isModify) {
      console.log("====> Modify <====");

      setPrice(selectedItem.price.toString());
      setName(selectedItem.name);
      setDescription(selectedItem.description);
      setQuantity(selectedItem.quantity.toString());
    }
  }, [isModify, selectedItem]);

  const [isChanged, setIsChanged] = useState(false);

  const wasChanged = useCallback(() => {
    if (
      price !== selectedItem.price.toString() ||
      name !== selectedItem.name ||
      description !== selectedItem.description ||
      quantity !== selectedItem.quantity.toString()
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [description, name, price, quantity, selectedItem]);

  // Call the `wasChanged` function whenever the state values change
  useEffect(() => {
    if (isModify) {
      wasChanged();
    }
  }, [price, name, description, quantity, isModify, wasChanged]);

  // Function to add pricing
  const addProduct = async () => {
    try {
      const newProduct = {
        price: Number(price),
        name: name,
        description: description,
        quantity: Number(quantity),
      };

      // Perform validation to check if all variables are not empty
      if (
        price.trim() === "" ||
        name.trim() === "" ||
        description.trim() === "" ||
        quantity.trim() === ""
      ) {
        alert("Please fill in all fields.");
        return;
      }

      var response;
      if (!isModify) {
        response = await POST(`/products`, newProduct);
      } else {
        if (!isChanged) {
          return alert("Values were not changed");
        }
        /*                response = await fetch(`/products/${selectedItem._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProduct),
                });*/

        response = await PUT(`/products/${selectedItem._id}`, newProduct);
      }

      /*            if (!response.ok) {
                throw new Error(`Failed to ${isModify ? 'edit' : 'add'} product`);
            }*/

      console.log(`Products ${isModify ? "edited" : "added"} successfully!`);
      onClose();
      Toast.fire({
        icon: "success",
        title: `Products ${isModify ? "edited" : "added"} successfully!`,
      });
      router.reload();

      // Clear form fields after successful addition
      // setPrice('');
      // setTypeColis('');
      // setTransportType('');
      // setUnit('');
      // setDescription('');
      // setQuantity('');
    } catch (error) {
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
            {/* <p className="mt-4 text-center">{text}</p> */}
            <div className="w-[1104px] bg-white rounded-[12px]">
              {/* <div className="w-[1104px] h-px top-[415px] left-0 bg-gray-50" /> */}
              <div className="mt-3[font-family:'Inter-Regular',Helvetica] font-medium text-gray-800 text-[18px] tracking-[0] leading-[normal]">
                {`${isModify ? "Edit" : "Enregistrement"} d'un produit`}
              </div>
              <div className="mt-4 flex flex-col items-start gap-[16px] top-[94px] left-[32px]">
                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                  <div className="flex flex-row items-start gap-[8px] relative flex-1 grow">
                    {renderInputField(ADD_PRODUCT_INPUTS[0], name, (e) =>
                      setName(e.target.value),
                    )}
                    {renderInputField(ADD_PRODUCT_INPUTS[1], description, (e) =>
                      setDescription(e.target.value),
                    )}
                  </div>
                </div>
                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                  <div className="flex flex-row items-start gap-[8px] relative flex-1 grow">
                    {renderInputField(ADD_PRODUCT_INPUTS[2], price, (e) =>
                      setPrice(e.target.value),
                    )}
                    {renderInputField(ADD_PRODUCT_INPUTS[3], quantity, (e) =>
                      setQuantity(e.target.value),
                    )}
                  </div>
                </div>
                <div className="mt-5 flex flex-row">
                  <button
                    onClick={addProduct}
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
    </div>
  );
};
