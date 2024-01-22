import React, { useState } from "react";
import Image from "next/image";
import {  FORGOT_PASSWORD_INPUTS, LOGIN_INPUTS } from "@/constants/templates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import { renderInputField } from "./signup";

export default function ForgotPassword() {
    return (
        <ForgotPasswordComponent />
    )
}

export const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState("");

    const handleCreateAccount = () => {
        router.push('/signup')
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const response = await fetch(`/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json();
                const { token } = data;

                // Save the token in local storage
                localStorage.setItem('token', token);

                // If login is successful, redirect to dashboard or perform necessary actions
                router.push('/dashboard');
            } else {
                const errorData = await response.json();
                console.log("Omo", errorData.message)

                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            // Display alert dialog to the user when login fails
            alert('Login failed. Please check your credentials and try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-[#ffffff] flex flex-row justify-center w-full">
                <div className="bg-[#ffffff] w-[1440px] h-[1024px] relative">
                    <div className="inline-flex flex-col items-center gap-[40px] absolute top-[270px] left-[460px]">
                        <div className="inline-flex flex-col items-center gap-[8px] relative flex-[0_0_auto]">
                            <p className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-black text-[20px] tracking-[0] leading-[normal] whitespace-nowrap">
                                Mot de passe oublié
                            </p>
                        </div>
                        <div className="inline-flex flex-col items-start gap-[16px] relative flex-[0_0_auto]">
                            <div className="inline-flex flex-col items-start gap-[12px] relative flex-[0_0_auto]">
                                {renderInputField(FORGOT_PASSWORD_INPUTS[0], email, (e) => setEmail(e.target.value))}
                            </div>
                            <div className="inline-flex flex-col items-center gap-[16px] relative flex-[0_0_auto]">
                                <div className="inline-flex flex-col items-center justify-center gap-[8px] flex-[0_0_auto]">
                                    <button type="submit" className="flex w-[520px] items-center justify-center gap-[8px] p-[20px] bg-[#4763e4] rounded-[12px]">
                                        <div className="w-fit mt-[-28.00px] mb-[-26.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[18px] tracking-[0] leading-[normal]">
                                            Se connecter
                                        </div>
                                        <i className="fa-solid fa-arrow-right-long"></i>
                                    </button>
                                    <p className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-transparent text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        <span onClick={() => { router.back() }} className="text-[#5c73db] underline">Retour à la page connexion</span>
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
