import React, { useState } from "react";
import Image from "next/image";
import { BaseUrl, LOGIN_INPUTS } from "@/constants/templates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import { renderInputField } from "../signup";
import {signIn} from "next-auth/react";
import logoPic from "@/public/logo.jpeg";
import {POST} from "@/constants/fetchConfig";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleClick = () => {
        router.push('/dashboard');
    };

    const handleCreateAccount = () => {
        router.push('/signup')
    }

    const handleForgotPassword = () => {
        router.push('/forgotPassword')
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
/*            const response = await fetch(`${BaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password: pass }),
            });*/

            const response = await POST(`${BaseUrl}/auth/login`, {email, password: pass});

            const data = response;

            if (data.user.type !== "admin" && data.user.type !== "employee") {
                // Display alert dialog to the user when login fails
                alert("Login failed. The user doesn't have correct access");
            } else {
                const { token } = data;
                const { user } = data;

                console.log("user", data.user.permissions)

                await signIn("credentials", {
                    redirect: true,
                    ...user,
                    permissions: JSON.stringify(user.permissions),
                    jwt: token,
                    callbackUrl: "/dashboard",
                });
                // Save the user in local storage
                localStorage.setItem('user', JSON.stringify(user));

                // Save the token in local storage
                localStorage.setItem('token', token);

                // If login is successful, redirect to dashboard or perform necessary actions
                router.push('/dashboard');
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
                <div className="bg-[#ffffff] w-screen h-screen relative">
                    <div className="inline-flex flex-col items-center gap-10 absolute top-40 left-1/3">
                        <div className="inline-flex flex-col items-center gap-[8px] relative flex-[0_0_auto]">
                            <div className="relative w-[150px] h-[100px]">
                                <Image
                                    className="absolute w-[104px] h-[104px] top-[5px] left-0"
                                    height={312}
                                    width={312}
                                    alt="Save care box"
                                    src={logoPic}
                                />
                                {/* <div className="absolute w-[144px] h-[40px] top-[24px] left-[60px] [font-family:'MADE_TOMMY-Medium',Helvetica] font-medium text-[#04009a] text-[32px] tracking-[-0.96px] leading-[normal]">
                                    Ascoline
                                </div> */}
                            </div>
                            {/* <FullDark className="!h-[44.76px]" /> */}
                            <p className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-black text-[20px] tracking-[0] leading-[normal] whitespace-nowrap">
                                Merci d&#39;entrer vos informations de connexion
                            </p>
                        </div>
                        <div className="inline-flex flex-col items-start gap-[16px] relative flex-[0_0_auto]">
                            <div className="inline-flex flex-col items-start gap-[12px] relative flex-[0_0_auto]">
                                {renderInputField(LOGIN_INPUTS[0], email, (e) => setEmail(e.target.value))}
                                {renderInputField(LOGIN_INPUTS[1], pass, (e) => setPass(e.target.value))}
                            </div>
                            <div className="inline-flex flex-col items-center gap-[16px] relative flex-[0_0_auto]">
                                <div onClick={handleForgotPassword} className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] underline tracking-[0] leading-[normal] whitespace-nowrap">
                                    Mot de passe oublié ?
                                </div>
                                <div className="inline-flex flex-col items-center justify-center gap-[8px] flex-[0_0_auto]">
                                    <button type="submit" className="flex w-[520px] items-center justify-center gap-[8px] p-[20px] bg-[#4763e4] rounded-[12px]">
                                        <div className="w-fit mt-[-28.00px] mb-[-26.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[18px] tracking-[0] leading-[normal]">
                                            Se connecter
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

export default Login;
