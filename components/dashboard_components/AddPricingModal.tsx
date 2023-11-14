import { ADD_ORDER_INPUTS, ADD_PRICING_INPUTS } from '@/constants/templates';
import { renderInputField } from '@/pages/auth/login';
import React, { useState } from 'react';

export interface AddPricingModalProps {
    isVisible: Boolean,
    text: string,
    onClose: () => void,
}

export const AddPricingModal: React.FC<AddPricingModalProps> = ({ isVisible, text, onClose }) => {
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
                                    <div className="flex flex-col items-start gap-[8px] flex-1 grow">
                                        <div className="w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Prix
                                        </div>
                                        {renderInputField(ADD_PRICING_INPUTS[0], price, (e) => setPrice(e.target.value))}
                                    </div>
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Type de colis
                                        </div>
                                        {renderInputField(ADD_PRICING_INPUTS[1], typeColis, (e) => setTypeColis(e.target.value))}
                                    </div>
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Type de transport
                                        </div>
                                        {renderInputField(ADD_PRICING_INPUTS[2], transportType, (e) => setTransportType(e.target.value))}
                                    </div>
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Unité
                                        </div>
                                        {renderInputField(ADD_PRICING_INPUTS[3], unit, (e) => setUnit(e.target.value))}
                                    </div>
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Description
                                        </div>
                                        {renderInputField(ADD_PRICING_INPUTS[4], description, (e) => setDescription(e.target.value))}
                                    </div>
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Quantité
                                        </div>
                                        {renderInputField(ADD_PRICING_INPUTS[5], quantity, (e) => setQuantity(e.target.value))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <div className="w-48 h-12 p-4 bg-indigo-600 rounded-lg justify-center items-center gap-2 inline-flex">
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
    )
}