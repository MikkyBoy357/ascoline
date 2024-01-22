

import React, {useMemo, useState} from "react";
import Image from "next/image";
import {LOGIN_INPUTS, SIGN_UP_INPUTS} from "@/constants/templates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import {signIn} from "next-auth/react";
import logoPic from "@/public/logo.jpeg";
import {POST} from "@/constants/fetchConfig";
import {useSearchParams} from "next/navigation";
import {renderInputField} from "@/components/signup";

export const SignupComponent = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");

    const handleLogin = () => {
        /*router.replace('/dashboard');*/
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
            /*            const response = await fetch(`/auth/signup`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        });*/

            const response = await POST(`/auth/signup`, data);



            console.log('User signed up successfully!');
            // Handle success (redirect or show success message)
            const { token } = response;
            const { user } = response;

            await signIn("credentials", {
                redirect: true,
                callbackUrl: "/dashboard",
                ...user,
                permissions: JSON.stringify(user.permissions),
                jwt: token,
            });
            /*            if (response.status === 201) {

                        } else {
                            const errorData = await response.json();
                            console.log('Error:', errorData);
                            // Display error alert dialog
                            alert(errorData.message);
                        }*/
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
                                <div className="inline-flex flex-col items-center justify-center gap-[8px] flex-[0_0_auto]">
                                    <button type='submit' className="flex w-[520px] items-center justify-center gap-[8px] p-[20px] bg-[#4763e4] rounded-[12px]">
                                        <div className="w-fit mt-[-28.00px] mb-[-26.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[18px] tracking-[0] leading-[normal]">
                                            S'inscrire
                                        </div>
                                        <i className="fa-solid fa-arrow-right-long"></i>
                                    </button>
                                    <p className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-transparent text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        <span className="text-[#000000]">Vous avez un compte ? </span>
                                        <span onClick={handleLogin} className="text-[#5c73db] underline">Se connecter</span>
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
const LoginUser = () => {
    const searchParams = useSearchParams();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");





    const handleClick = () => {
        router.push('/dashboard');
    };

    const handleCreateAccount = () => {
        router.push('/auth/login?user=new')
    }

    const handleForgotPassword = () => {
        router.push('/forgotPassword')
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
/*            const response = await fetch(`/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password: pass }),
            });*/

            const response = await POST(`/auth/login`, {email, password: pass});

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
                    callbackUrl: "/dashboard",
                    ...user,
                    permissions: JSON.stringify(user.permissions),
                    jwt: token,
                });

                // If login is successful, redirect to dashboard or perform necessary actions
                //router.replace('/dashboard');
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
                                <div className="inline-flex flex-col items-center justify-center gap-[8px] flex-[0_0_auto]">
                                    <button type="submit" className="flex w-[520px] items-center justify-center gap-[8px] p-[20px] bg-[#4763e4] rounded-[12px]">
                                        <div className="w-fit mt-[-28.00px] mb-[-26.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[18px] tracking-[0] leading-[normal]">
                                            Se connecter
                                        </div>
                                        <i className="fa-solid fa-arrow-right-long"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};


const Login = () => {

    const searchParams = useSearchParams();

    const userParam = useMemo(() => {
        return searchParams.get("user");
    }, [searchParams]);


    return <LoginUser/>

};

export default Login;
