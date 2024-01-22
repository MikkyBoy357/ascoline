import { ADD_ORDER_INPUTS, ADD_PRICING_INPUTS } from '@/constants/templates';
import { renderInputField } from '@/pages/signup';
import React, { useEffect, useState } from 'react';
import { PackageType } from './SettingComponents/PackageCard';
import { TransportType } from './SettingComponents/TransportCard';
import { MeasureUnit } from './SettingComponents/UnitCard';
import UnitSelectComponent from '../MyUnitSelectComponent';
import { Pricing } from './PricingList';
import {useRouter} from "next/router";
import {Toast} from "@/constants/toastConfig";
import {POST, PUT} from "@/constants/fetchConfig";

export interface AddPricingModalProps {
    isVisible: Boolean,
    text: string,
    onClose: () => void,
    isModify: Boolean,
    selectedItem: Pricing,
    packageTypesData: PackageType[],
    transportTypesData: TransportType[],
    measureUnitsData: MeasureUnit[],
}

export const AddPricingModal: React.FC<AddPricingModalProps> = ({
    isVisible,
    text,
    onClose,
    isModify,
    selectedItem,
    packageTypesData,
    transportTypesData,
    measureUnitsData
}) => {
    if (!isVisible) return null;

    const router = useRouter();

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") { onClose(); }
    }

    const handleSelectUnit = (event: React.ChangeEvent<HTMLSelectElement>, dataList: MeasureUnit[] | TransportType[] | PackageType[]) => {
        const selectedId = event.target.value;
        const selected = dataList.find(item => item._id === selectedId);

        if (selected) {
            // Check if the selected object exists in the measureUnitsData array
            const existsInMeasureUnitsData = measureUnitsData.some(unit => unit._id === selected._id);
            const existsInTransportData = transportTypesData.some(unit => unit._id === selected._id);
            const existsInPackageData = packageTypesData.some(unit => unit._id === selected._id);

            if (existsInMeasureUnitsData) {
                setUnit(selected);
                // Assign the selected object to state since it exists in measureUnitsData array
            } else if (existsInTransportData) {
                setTransportType(selected)
            } else if (existsInPackageData) {
                setTypeColis(selected)
            } else {
                // Handle the case when selected object doesn't exist in measureUnitsData array
                console.log('Selected object does not exist in measureUnitsData array.');
                // Perform necessary actions here
            }
            // setUnit(selected); // Assign the selected Client object to state
        }
    };

    const [price, setPrice] = useState("");
    const [typeColis, setTypeColis] = useState<PackageType>();
    const [transportType, setTransportType] = useState<TransportType>();
    const [unit, setUnit] = useState<MeasureUnit>();
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");

    // auto fill text field when user is editing an order
    useEffect(() => {
        if (isModify) {
            console.log("====> Modify <====")

            setPrice(selectedItem.price.toString())
            setTypeColis(packageTypesData.find(item => item._id === selectedItem.typeColis._id))
            setTransportType(transportTypesData.find(item => item._id === selectedItem.transportType._id))
            setUnit(measureUnitsData.find(item => item._id === selectedItem.unit._id))
            setDescription(selectedItem.description)
            setQuantity(selectedItem.quantity.toString())
        }
    }, [])

    const [isChanged, setIsChanged] = useState(false);

    const wasChanged = () => {
        if (
            price !== selectedItem.price.toString() ||
            typeColis?._id !== selectedItem.typeColis._id ||
            transportType?._id !== selectedItem.transportType._id ||
            unit?._id !== selectedItem.unit._id ||
            description !== selectedItem.description ||
            quantity !== selectedItem.quantity.toString()

        ) {
            setIsChanged(true);
        } else {
            setIsChanged(false);
        }
    };

    // Call the `wasChanged` function whenever the state values change
    useEffect(() => {
        if (isModify) {
            wasChanged();
        }
    }, [
        price,
        typeColis,
        transportType,
        unit,
        description,
        quantity
    ]);


    // Function to add pricing
    const addPricing = async () => {
        try {
            const newPricing = {
                price: Number(price),
                typeColis: typeColis,
                transportType: transportType,
                unit: unit,
                description: description,
                quantity: Number(quantity),
                status: 'test',
            };

            // Perform validation to check if all variables are not empty
            if (
                price.trim() === '' ||
                typeColis?._id.trim() === '' ||
                transportType?._id.trim() === '' ||
                unit?._id.trim() === '' ||
                description.trim() === '' ||
                quantity.trim() === ''
            ) {
                alert('Please fill in all fields.');
                return;
            }

            var response;
            if (!isModify) {
/*                response = await fetch(`/pricings`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPricing),
                });*/

                response = await POST(`/pricings`, newPricing);


            } else {
                if (!isChanged) {
                    return alert("Values were not changed");
                }
/*                response = await fetch(`/pricings/${selectedItem._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPricing),
                });*/

                response = await PUT(`/pricings/${selectedItem._id}`, newPricing);


            }

/*            if (!response.ok) {
                throw new Error(`Failed to ${isModify ? 'edit' : 'add'} pricing`);
            }*/

            console.log(`Pricing ${isModify ? 'edited' : 'added'} successfully!`);
            onClose();
            Toast.fire({
                icon: "success",
                title: `Pricing ${isModify ? 'edited' : 'added'} successfully!`,
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
            console.error('Error adding pricing:', error);
            // Handle errors
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'
            id='wrapper' onClick={handleClose}>
            <div className='flex flex-col'>
                <button onClick={onClose} className='text-white text-xl place-self-end'>X</button>
                <div className='flex bg-white p-4 rounded-lg items-center justify-center'>
                    {/* Top */}
                    <div className='flex flex-col items-center'>
                        {/* <p className="mt-4 text-center">{text}</p> */}
                        <div className="w-[1104px] bg-white rounded-[12px]">
                            {/* <div className="w-[1104px] h-px top-[415px] left-0 bg-gray-50" /> */}
                            <div className="mt-3[font-family:'Inter-Regular',Helvetica] font-medium text-gray-800 text-[18px] tracking-[0] leading-[normal]">
                                {`${isModify ? 'Edit' : 'Enregistrement'} d'une tarification`}
                            </div>
                            <div className="mt-4 flex flex-col items-start gap-[16px] top-[94px] left-[32px]">
                                <div className="flex w-[1040px] items-start gap-[12px] flex-[0_0_auto]">
                                    {renderInputField(ADD_PRICING_INPUTS[0], price, (e) => setPrice(e.target.value))}
                                    <div>
                                        <p>Type de colis</p>
                                        <UnitSelectComponent id={ADD_ORDER_INPUTS[1].id} value={typeColis?._id ?? ""} handleSelect={(e) => handleSelectUnit(e, packageTypesData)} selectList={packageTypesData} />
                                    </div>
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    <div>
                                        <p>Type de Transport</p>
                                        <UnitSelectComponent id={ADD_ORDER_INPUTS[2].id} value={transportType?._id ?? ""} handleSelect={(e) => handleSelectUnit(e, transportTypesData)} selectList={transportTypesData} />
                                    </div>
                                    <div>
                                        <p>Unite</p>
                                        <UnitSelectComponent id={ADD_ORDER_INPUTS[3].id} value={unit?._id ?? ""} handleSelect={(e) => handleSelectUnit(e, measureUnitsData)} selectList={measureUnitsData} />
                                    </div>
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    <div className="flex flex-row items-start gap-[8px] relative flex-1 grow">
                                        {renderInputField(ADD_PRICING_INPUTS[4], description, (e) => setDescription(e.target.value))}
                                        {renderInputField(ADD_PRICING_INPUTS[5], quantity, (e) => setQuantity(e.target.value))}
                                    </div>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <div onClick={addPricing} className="w-48 h-12 p-4 bg-indigo-600 rounded-lg justify-center items-center gap-2 inline-flex">
                                        <div className="text-white text-lg font-normal font-['Inter']">Enregistrer</div>
                                    </div>
                                    <div onClick={onClose} className="ml-4 w-48 h-12 p-4 rounded-lg border border-zinc-300 justify-center items-center gap-2 inline-flex">
                                        <div className="text-zinc-800 text-lg font-normal font-['Inter']">Annuler</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}