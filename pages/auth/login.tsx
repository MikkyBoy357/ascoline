import React, { useState } from "react";
import Image from "next/image";
import { AUTH_INPUTS } from "@/constants/templates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";


// import { FullDark } from "./FullDark";

// const renderInputField = (
//     input: { id: any; label: any; placeholder?: string; type?: "text" | "textarea" | "select"; options?: string[] | undefined },
//     value: string,
//     handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
// ) => {
//     return (
//         <input
//             maxLength={300}
//             type="text"
//             id={input.id}
//             value={value}
//             onChange={handleChange}
//             className="w-[520px] p-2 mt-2 text-gray-900 bg-white border border-gray-200 rounded-lg"
//             placeholder={input.placeholder}
//         />
//     );
// }

export const renderInputField = (
    input: { id: any; label: any; placeholder?: string; type?: "text" | "textarea" | "select"; options?: string[] | undefined },
    value: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
) => {
    return (
        <div className="relative">
            <input
                maxLength={300}
                type="text"
                id={input.id}
                value={value}
                onChange={handleChange}
                className="w-[520px] p-2 text-gray-900 bg-white border border-gray-200 rounded-lg"
                placeholder={input.placeholder}
            />
            {input.id == "password" && <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <i className="fa-solid fa-eye-slash text-gray-700"></i>
            </div>}
        </div>

    );
}

export const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleClick = () => {
        router.push('/dashboard');
    };

    return (
        <div className="bg-[#ffffff] flex flex-row justify-center w-full">
            <div className="bg-[#ffffff] w-[1440px] h-[1024px] relative">
                <div className="inline-flex flex-col items-center gap-[40px] absolute top-[270px] left-[460px]">
                    <div className="inline-flex flex-col items-center gap-[8px] relative flex-[0_0_auto]">
                        <div className="relative w-[230px] h-[70px]">
                            <img
                                className="absolute w-[54px] h-[54px] top-[5px] left-0"
                                height={54}
                                width={54}
                                alt="Save care box"
                                src="logo.svg"
                            />
                            <div className="absolute w-[144px] h-[40px] top-[24px] left-[60px] [font-family:'MADE_TOMMY-Medium',Helvetica] font-medium text-[#04009a] text-[32px] tracking-[-0.96px] leading-[normal]">
                                Ascoline
                            </div>
                        </div>
                        {/* <FullDark className="!h-[44.76px]" /> */}
                        <p className="relative w-fit [font-family:'Inter-Medium',Helvetica] font-medium text-black text-[20px] tracking-[0] leading-[normal] whitespace-nowrap">
                            Merci d&#39;entrer vos informations de connexion
                        </p>
                    </div>
                    <div className="inline-flex flex-col items-start gap-[16px] relative flex-[0_0_auto]">
                        <div className="inline-flex flex-col items-start gap-[12px] relative flex-[0_0_auto]">
                            <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
                                <div className="w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Email
                                </div>
                                {renderInputField(AUTH_INPUTS[0], email, (e) => setEmail(e.target.value))}
                            </div>
                            <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
                                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    Mot de passe
                                </div>
                                {renderInputField(AUTH_INPUTS[1], pass, (e) => setPass(e.target.value))}
                            </div>
                        </div>
                        <div className="inline-flex flex-col items-center gap-[16px] relative flex-[0_0_auto]">
                            <p className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                Mot de passe oublié ?
                            </p>
                            <div className="inline-flex flex-col items-center justify-center gap-[8px] relative flex-[0_0_auto]">
                                <div className="flex w-[520px] h-[48px] items-center justify-center gap-[8px] p-[40px] relative bg-[#4763e4] rounded-[12px]">
                                    <div onClick={handleClick} className="relative w-fit mt-[-28.00px] mb-[-26.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-white text-[18px] tracking-[0] leading-[normal]">
                                        Se connecter
                                    </div>
                                    <i className="fa-solid fa-arrow-right-long"></i>
                                </div>
                                <p className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-transparent text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                    <span className="text-[#000000]">Vous n’avez pas de compte ? </span>
                                    <span className="text-[#5c73db] underline">Créer un compte</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
