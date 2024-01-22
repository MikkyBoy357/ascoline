import { USER_CONFIG_INPUTS } from '@/constants/templates';
import { renderInputField } from '@/pages/signup';
import React, { useEffect, useState } from 'react';
import { Client } from './ClientList';
import { Employee } from './EmployeeList';
import {Toast} from "@/constants/toastConfig";
import {useRouter} from "next/router";
import {POST, PUT} from "@/constants/fetchConfig";

export interface AddClientModalProps {
    isVisible: Boolean,
    type: string,
    onClose: () => void,
    isModify: Boolean,
    selectedUser: Client | Employee,
}

export const AddClientModal: React.FC<AddClientModalProps> = ({
    isVisible,
    type,
    onClose,
    isModify,
    selectedUser
}) => {
    if (!isVisible) return null;

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") { onClose(); }
    }

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    // auto fill text field when user is editing an order
    useEffect(() => {
        if (isModify) {
            console.log("====> Modify <====")

            setEmail(selectedUser.email)
            setPhone(selectedUser.phone)
            setLastName(selectedUser.lastName)
            setFirstName(selectedUser.firstName)
            setAddress(selectedUser.address ?? "")
            setPassword("")
        }
    }, [])

    const [isChanged, setIsChanged] = useState(false);

    const wasChanged = () => {
        if (
            email !== selectedUser.email ||
            phone !== selectedUser.phone ||
            lastName !== selectedUser.lastName ||
            firstName !== selectedUser.firstName ||
            address !== "" ||
            password !== ""
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
        email,
        phone,
        lastName,
        firstName,
        address,
        password
    ]);

    const getEndpoint = () => {
        if (type == 'client') {
            return "clients"
        } else if (type = 'employee') {
            return "employees"
        } else {
            return "N/A"
        }
    }

    // Function to add client
    const addClient = async () => {
        try {
            const newClient = {
                email: email,
                phone: phone,
                lastName: lastName,
                firstName: firstName,
                address: address,
                password: password,
                status: 'actif',
                type: type
            };

            console.log("NewUser JSON Body", newClient)
            console.log(type)

            // Perform validation to check if all variables are not empty
            if (
                email.trim() === '' ||
                phone.trim() === '' ||
                lastName.trim() === '' ||
                firstName.trim() === '' ||
                address.trim() === ''
                // || password.trim() === ''
            ) {
                alert('Please fill in all fields.');
                return;
            }

            var response;

            if (!isModify) {
 /*               response = await fetch(`/auth/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newClient),
                });*/

                response = await POST(`/auth/signup`, newClient);


            } else {
                if (!isChanged) {
                    return alert("Values were not changed");
                }
/*                response = await fetch(`/${getEndpoint()}/${selectedUser._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newClient),
                });*/

                response = await PUT(`/${getEndpoint()}/${selectedUser._id}`, newClient);

            }

 /*           if (!response.ok) {
                const errorData = await response.json();
                alert(`Error => ${errorData.message}`)
                throw new Error(`Failed to add ${type}`);
            }*/

            console.log(`${type} ${isModify ? "edited" : "added"} successfully!`);
            onClose();
            Toast.fire({
                icon: "success",
                title: `${type} ${isModify ? "edited" : "added"} successfully!`,
            });
            router.reload();

            // Clear form fields after successful addition
            // setEmail('');
            // setPhone('');
            // setLastName('');
            // setFirstName('');
            // setAddress('');
            // setPassword('');
        } catch (error) {
            console.error(`Error adding ${type}:`, error);
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
                                {isModify ? `Edit` : `Enregistrement`}
                            </div>
                            <div className="mt-4 flex flex-col items-start gap-[16px] top-[94px] left-[32px]">
                                <div className="flex w-[1040px] items-start gap-[12px] flex-[0_0_auto]">
                                    {renderInputField(USER_CONFIG_INPUTS[0], email, (e) => setEmail(e.target.value))}
                                    {renderInputField(USER_CONFIG_INPUTS[1], phone, (e) => setPhone(e.target.value))}
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    {renderInputField(USER_CONFIG_INPUTS[2], lastName, (e) => setLastName(e.target.value))}
                                    {renderInputField(USER_CONFIG_INPUTS[3], firstName, (e) => setFirstName(e.target.value))}
                                </div>
                                <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                    <div className="flex flex-row items-start gap-[8px] relative flex-1 grow">
                                        {renderInputField(USER_CONFIG_INPUTS[4], address, (e) => setAddress(e.target.value))}
                                        {renderInputField(USER_CONFIG_INPUTS[5], password, (e) => setPassword(e.target.value))}
                                    </div>
                                </div>
                                <div className="mt-5 flex flex-row">
                                    <div onClick={addClient} className="w-48 h-12 p-4 bg-indigo-600 rounded-lg justify-center items-center gap-2 inline-flex">
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