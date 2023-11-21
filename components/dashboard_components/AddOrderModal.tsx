import { ADD_ORDER_INPUTS } from '@/constants/templates';
import { renderInputField } from '@/pages/auth/login';
import React, { useState } from 'react';

export interface AddOrderModalProps {
    isVisible: Boolean,
    text: string,
    onClose: () => void,
}

export const AddOrderModal: React.FC<AddOrderModalProps> = ({ isVisible, text, onClose }) => {
    if (!isVisible) return null;

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") { onClose(); }
    }

    const [trackingId, setTrackingId] = useState("");
    const [typeColis, setTypeColis] = useState("");
    const [transportType, setTransportType] = useState("");
    const [client, setClient] = useState("");
    const [description, setDescription] = useState("");
    const [poids, setPoids] = useState("");
    const [pays, setPays] = useState("");
    const [quantity, setQuantity] = useState("");
    const [ville, setVille] = useState("");
    const [status, setStatus] = useState("");
    const [specialNote, setSpecialNote] = useState("");

    // Function to add pricing
    const addOrder = async () => {
        try {
            const newPricing = {
                trackingId: trackingId,
                typeColis: typeColis,
                transportType: transportType,
                client: client,
                description: description,
                poids: Number(poids),
                pays: pays,
                quantity: Number(quantity),
                ville: ville,
                status: 'test',
                specialNote: specialNote,
            };

            // Perform validation to check if all variables are not empty
            if (
                trackingId.trim() === '' ||
                typeColis.trim() === '' ||
                transportType.trim() === '' ||
                client.trim() === '' ||
                description.trim() === '' ||
                poids.trim() === '' ||
                pays.trim() === '' ||
                quantity.trim() === '' ||
                ville.trim() === '' ||
                status.trim() === '' ||
                specialNote.trim() === ''
            ) {
                alert('Please fill in all fields.');
                return;
            }

            const response = await fetch('http://localhost:3000/commandes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPricing),
            });

            if (!response.ok) {
                console.log(response)
                throw new Error('Failed to add order');
            }

            console.log('Pricing added successfully!');
            alert('Pricing added successfully!'); // Show alert dialog

            // Clear form fields after successful addition
            // setTrackingId('');
            // setTypeColis('');
            // setTransportType('');
            // setDescription('');
            // setUnit('');
            // setPays('')
            // setQuantity('');
            // setVille('')
            // setStatus('')
            // setSpecialNote('')
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
                                Enregistrement d'une commande
                            </div>
                            <div className="mt-4 flex flex-col items-start gap-[16px] top-[94px] left-[32px]">
                                <div className="flex w-[1040px] items-start gap-[12px] flex-[0_0_auto]">
                                    <div className="flex flex-col items-start gap-[8px] flex-1 grow">
                                        <div className="w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Tracking Id
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[0], trackingId, (e) => setTrackingId(e.target.value))}
                                    </div>
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Type de colis
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[1], typeColis, (e) => setTypeColis(e.target.value))}
                                    </div>
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Type de transport
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[2], transportType, (e) => setTransportType(e.target.value))}
                                    </div>
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Client
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[3], client, (e) => setClient(e.target.value))}
                                    </div>
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Description
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[4], description, (e) => setDescription(e.target.value))}
                                    </div>
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            {"Poids (kg)"}
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[5], poids, (e) => setPoids(e.target.value))}
                                    </div>
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Pays de destination
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[6], pays, (e) => setPays(e.target.value))}
                                    </div>
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Quantité
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[7], quantity, (e) => setQuantity(e.target.value))}
                                    </div>
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Ville
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[8], ville, (e) => setVille(e.target.value))}
                                    </div>
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Statut
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[9], status, (e) => setStatus(e.target.value))}
                                    </div>
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Note Spéciale
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[10], specialNote, (e) => setSpecialNote(e.target.value))}
                                    </div>
                                    {/* <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                            Statut
                                        </div>
                                        {renderInputField(ADD_ORDER_INPUTS[11], status, (e) => setStatus(e.target.value))}
                                    </div> */}
                                </div>
                            </div>
                            <div className="mt-5 flex flex-row">
                                <div onClick={addOrder} className="w-48 h-12 p-4 bg-indigo-600 rounded-lg justify-center items-center gap-2 inline-flex">
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