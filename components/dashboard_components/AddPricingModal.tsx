import { ADD_ORDER_INPUTS, ADD_PRICING_INPUTS } from '@/constants/templates';
import { renderInputField } from '@/pages/signup';
import React, { useState } from 'react';
import { PackageType } from './SettingComponents/PackageCard';

export interface AddPricingModalProps {
    isVisible: Boolean,
    text: string,
    onClose: () => void,
    packageTypesData: string[],
    transportTypesData: string[],
    measureUnitsData: string[],
}

export const AddPricingModal: React.FC<AddPricingModalProps> = ({
    isVisible,
    text,
    onClose,
    packageTypesData,
    transportTypesData,
    measureUnitsData
}) => {
    if (!isVisible) return null;

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") { onClose(); }
    }

    const [price, setPrice] = useState("");
    const [typeColis, setTypeColis] = useState("");
    const [transportType, setTransportType] = useState("");
    const [unit, setUnit] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");

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
                typeColis.trim() === '' ||
                transportType.trim() === '' ||
                unit.trim() === '' ||
                description.trim() === '' ||
                quantity.trim() === ''
            ) {
                alert('Please fill in all fields.');
                return;
            }

            const response = await fetch('http://localhost:3000/pricings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPricing),
            });

            if (!response.ok) {
                throw new Error('Failed to add pricing');
            }

            console.log('Pricing added successfully!');
            alert('Pricing added successfully!'); // Show alert dialog

            // Clear form fields after successful addition
            setPrice('');
            setTypeColis('');
            setTransportType('');
            setUnit('');
            setDescription('');
            setQuantity('');
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
                                Enregistrement d'une tarification
                            </div>
                            <div className="mt-4 flex flex-col items-start gap-[16px] top-[94px] left-[32px]">
                                <div className="flex w-[1040px] items-start gap-[12px] flex-[0_0_auto]">
                                    {renderInputField(ADD_PRICING_INPUTS[0], price, (e) => setPrice(e.target.value))}
                                    {renderInputField(
                                        ADD_PRICING_INPUTS[1],
                                        typeColis,
                                        (e) => setTypeColis(e.target.value),
                                        (e: any) => setTypeColis(e.target.value),
                                        packageTypesData
                                    )}
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    {renderInputField(
                                        ADD_PRICING_INPUTS[2],
                                        transportType,
                                        (e) => setTransportType(e.target.value),
                                        (e: any) => setTransportType(e.target.value),
                                        transportTypesData
                                    )}
                                    {renderInputField(
                                        ADD_PRICING_INPUTS[3],
                                        unit,
                                        (e) => setUnit(e.target.value),
                                        (e: any) => setUnit(e.target.value),
                                        measureUnitsData
                                    )}
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