import React, { useState } from "react";
import Image from "next/image";
import {  LOGIN_INPUTS, SIGN_UP_INPUTS } from "@/constants/templates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";

export const renderInputField = (
    input: { id: any; label: any; placeholder?: string; type?: "text" | "textarea" | "select" | "password"; options?: string[] | undefined },
    value: string,
    handleChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleSelect?: (event: React.FormEvent<HTMLSelectElement>) => void,
    selectList?: any[],
) => {

    const [showPass, setShowPass] = useState(false);

    return (
        <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
            <div className="w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                {input.label}
            </div>
            <div className="relative">
                {input.type === "text" && <input
                    maxLength={300}
                    type="text"
                    id={input.id}
                    value={value}
                    onChange={handleChange}
                    className="w-[520px] p-2 text-gray-900 bg-white border border-gray-200 rounded-lg"
                    placeholder={input.placeholder}
                />}
                {input.type === "password" && <input
                    type={showPass ? "text" : "password"}
                    id={input.id}
                    value={value}
                    onChange={handleChange}
                    className="w-[520px] p-2 text-gray-900 bg-white border border-gray-200 rounded-lg"
                    placeholder={input.placeholder}
                />}
                {
                    input.type == "select" && <select id={input.id} onChange={handleSelect} value={value}
                        className="w-[520px] p-2 pb-[10px] text-gray-900 bg-white border border-gray-200 rounded-lg">

                        {selectList?.map(item => <option value={item}>{item}</option>)}

                    </select>
                }
                {input.id == "password" && <button onClick={(e)  => {
                    e.preventDefault()
                    setShowPass((prevState) => !prevState);
                }} className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i className={`fa-solid ${!showPass ? "fa-eye-slash" : "fa-eye"} text-gray-700`}></i>
                </button>}
            </div>
        </div>

    );
}

export default function SignUp() {
    return (
        <SignupComponent />
    )
}

export const SignupComponent = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");

    const handleCreateAccount = () => {
        router.push('/dashboard');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if any field is empty
        if (!email || !phone || !pass || !cpass) {
            alert('Please fill in all fields');
            return;
        }

        // Check if passwords match
        if (pass !== cpass) {
            alert("Passwords do not match");
            return;
        }

        // Prepare data object to send to the server
        const data = {
            email: email,
            phone: phone,
            password: pass,
            type: "admin"
        };

        try {
            const response = await fetch(`/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.status === 201) {
                console.log('User signed up successfully!');
                // Handle success (redirect or show success message)
                router.back();
                alert("User signed up successfully now Login");
            } else {
                const errorData = await response.json();
                console.log('Error:', errorData);
                // Display error alert dialog
                alert(errorData.message);
            }
        } catch (error) {
            console.error('There was a problem with the request:', error);
            // Display error alert dialog for network or other errors
            alert('Failed to sign up. Please check your network connection.');

        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="bg-[#ffffff] flex flex-row justify-center w-full">
                <div className="bg-[#ffffff] w-[1440px] h-[1024px] relative">
                    <div className="inline-flex flex-col items-center gap-[40px] absolute top-[150px] left-[460px]">
                        <div className="inline-flex flex-col items-center gap-[8px] relative flex-[0_0_auto]">
                            <div className="relative w-[150px] h-[100px]">
                                <img
                                    className="absolute w-[104px] h-[104px] top-[5px] left-0"
                                    height={312}
                                    width={312}
                                    alt="Save care box"
                                    src="/logo.jpeg"
                                />
                                {/* <div className="absolute w-[144px] h-[40px] top-[24px] left-[60px] [font-family:'MADE_TOMMY-Medium',Helvetica] font-medium text-[#04009a] text-[32px] tracking-[-0.96px] leading-[normal]">
                                    Ascoline
                                </div> */}
                            </div>
                            {/* <FullDark className="!h-[44.76px]" /> */}
                            <p className="w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-black text-[20px] tracking-[0] leading-[normal] whitespace-nowrap">
                                Merci d&#39;entrer vos informations de connexion
                            </p>
                        </div>
                        <div className="inline-flex flex-col items-start gap-[16px] relative flex-[0_0_auto]">
                            <div className="inline-flex flex-col items-start gap-[12px] relative flex-[0_0_auto]">
                                {renderInputField(SIGN_UP_INPUTS[0], email, (e) => setEmail(e.target.value))}
                                {renderInputField(SIGN_UP_INPUTS[1], phone, (e) => setPhone(e.target.value))}
                                {renderInputField(SIGN_UP_INPUTS[2], pass, (e) => setPass(e.target.value))}
                                {renderInputField(SIGN_UP_INPUTS[3], cpass, (e) => setCpass(e.target.value))}
                            </div>
                            <div className="inline-flex flex-col items-center gap-[16px] relative flex-[0_0_auto]">
                                <p className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Mot de passe oublié ?
                                </p>
                                <div className="inline-flex flex-col items-center justify-center gap-[8px] flex-[0_0_auto]">
                                    <button type='submit' className="flex w-[520px] items-center justify-center gap-[8px] p-[20px] bg-[#4763e4] rounded-[12px]">
                                        <div className="w-fit mt-[-28.00px] mb-[-26.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[18px] tracking-[0] leading-[normal]">
                                            S'inscrire
                                        </div>
                                        <i className="fa-solid fa-arrow-right-long"></i>
                                    </button>
                                    <p className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-transparent text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        <span className="text-[#000000]">Vous n'avez pas de compte ? </span>
                                        <span onClick={handleCreateAccount} className="text-[#5c73db] underline">Créer un compte</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>

    );
};
