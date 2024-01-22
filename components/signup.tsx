

import React, { useState } from "react";
import Image from "next/image";
import {  LOGIN_INPUTS, SIGN_UP_INPUTS } from "@/constants/templates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";
import {POST} from "@/constants/fetchConfig";
import {signIn} from "next-auth/react";

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



