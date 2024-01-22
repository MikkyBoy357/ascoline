import { ADD_TRANSPORT_INPUTS } from '@/constants/templates';
import { renderInputField } from '@/components/signup';
import React, { useEffect, useState } from 'react';
import { MeasureUnit } from '../UnitCard';
import { TransportType } from '../TransportCard';
import { Country } from '../CountryCard';
import { PackageType } from '../PackageCard';
import {useRouter} from "next/router";
import {Toast} from "@/constants/toastConfig";
import {POST, PUT} from "@/constants/fetchConfig";

export interface AddUnitModalProps {
    isVisible: Boolean,
    popup: "transportTypes" | "packageTypes" | "measureUnits" | "countries",
    onClose: () => void,
    isModify: Boolean,
    selectedItem: MeasureUnit | TransportType | PackageType | Country,
}

export const AddUnitModal: React.FC<AddUnitModalProps> = ({ isVisible, popup, onClose, isModify, selectedItem }) => {
    if (!isVisible) return null;

    const router = useRouter();

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") { onClose(); }
    }

    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");

    // auto fill text field when user is editing an order
    useEffect(() => {
        if (isModify) {
            console.log("====> Modify <====")

            setLabel(selectedItem.label)
            setDescription(selectedItem.description)
        }
    }, [])

    const [isChanged, setIsChanged] = useState(false);

    const wasChanged = () => {
        if (
            label !== selectedItem.label ||
            description !== selectedItem.description
        ) {
            setIsChanged(true)
        } else {
            setIsChanged(false);
        }
    }

    useEffect(() => {
        if (isModify) {
            wasChanged();
        }
    }, [
        label,
        description
    ]);

    // Function to add unit
    const addUnit = async () => {
        try {
            const newUnit = {
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

            var response;

            if (!isModify) {
/*                response = await fetch(`/${popup}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUnit),
                });*/

                response = await POST(`/${popup}`, newUnit);


            } else {
                if (!isChanged) {
                    return alert("Values were not changed");
                }
   /*             response = await fetch(`/${popup}/${selectedItem._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUnit),
                });*/

                response = await PUT(`/${popup}/${selectedItem._id}`, newUnit);
            }

/*            if (!response.ok) {
                throw new Error('Failed to add item');
            }*/

            console.log(`item ${isModify ? 'edited' : 'added'} successfully!`);
            onClose();
            Toast.fire({
                icon: "success",
                title: `item ${isModify ? 'edited' : 'added'} successfully!`,
            });
            router.reload();
            //alert(`item ${isModify ? 'edited' : 'added'} successfully!`); // Show alert dialog

            // Clear form fields after successful addition
            // setLabel('')
            // setDescription('')
        } catch (error) {
            console.error('Error adding measure unit:', error);
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
                                {`${isModify ? 'Edit' : 'Enregistrement'} d'un type de unité`}
                            </div>
                            <div className="mt-4 flex flex-col items-start gap-[16px] top-[94px] left-[32px]">
                                <div className="flex flex-col items-start gap-[12px] flex-[0_0_auto]">
                                    {renderInputField(ADD_TRANSPORT_INPUTS[0], label, (e) => setLabel(e.target.value))}
                                    {renderInputField(ADD_TRANSPORT_INPUTS[1], description, (e) => setDescription(e.target.value))}
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <div onClick={addUnit} className="w-48 h-12 p-4 bg-indigo-600 rounded-lg justify-center items-center gap-2 inline-flex">
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