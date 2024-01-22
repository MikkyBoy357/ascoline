import { ADD_TRANSPORT_INPUTS } from '@/constants/templates';
import { renderInputField } from '@/pages/signup';
import React, { useState } from 'react';
import {useRouter} from "next/router";
import {Toast} from "@/constants/toastConfig";
import {POST} from "@/constants/fetchConfig";

export interface AddTransportModalProps {
    isVisible: Boolean,
    text: string,
    onClose: () => void,
}

export const AddTransportModal: React.FC<AddTransportModalProps> = ({ isVisible, text, onClose }) => {
    if (!isVisible) return null;

    const router = useRouter();

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") { onClose(); }
    }

    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");

    // Function to add transport
    const addTransport = async () => {
        try {
            const newTransport = {
                label: label,
                description: description
            };

            // Perform validation to check if all variables are not empty
            if (
                label.trim() === '' ||
                description.trim() === ''
            ) {
                alert('Please fill in all fields.');
                return;
            }

/*            const response = await fetch(`/transportTypes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTransport),
            });*/

            const response = await POST(`/transportTypes`, newTransport);


/*            if (!response.ok) {
                throw new Error('Failed to add Transport');
            }*/

            console.log('Transport added successfully!');
            onClose();
            Toast.fire({
                icon: "success",
                title: 'Transport added successfully!',
            });
            router.reload();
            //alert('Transport added successfully!'); // Show alert dialog

            // Clear form fields after successful addition
            // setLabel('')
            // setDescription('')
        } catch (error) {
            console.error('Error adding transport:', error);
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
                                Enregistrement d'un type de transport
                            </div>
                            <div className="mt-4 flex flex-col items-start gap-[16px] top-[94px] left-[32px]">
                                <div className="flex flex-col items-start gap-[12px] flex-[0_0_auto]">
                                    {renderInputField(ADD_TRANSPORT_INPUTS[0], label, (e) => setLabel(e.target.value))}
                                    {renderInputField(ADD_TRANSPORT_INPUTS[1], description, (e) => setDescription(e.target.value))}
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <div onClick={addTransport} className="w-48 h-12 p-4 bg-indigo-600 rounded-lg justify-center items-center gap-2 inline-flex">
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