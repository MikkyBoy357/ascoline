import { USER_CONFIG_INPUTS } from "@/constants/templates";

const AddClientComponent = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [address, setAddress] = useState("");
    const [pass, setPass] = useState("");

    function renderInputField(arg0: any, email: any, arg2: (e: any) => any): React.ReactNode {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="bg-gray-50 flex flex-col justify-center text-black">
            <div className="pl-4 pt-4">
                <p className="mb-3 font-semibold text-2xl">Client</p>
                <div className="absolute h-[498px] top-[151px] left-[296px] bg-[#ffffff] rounded-[12px]">
                    <div className="h-px top-[415px] left-0 bg-gray-50" />
                    <p className="mb-3 font-semibold text-2xl">Client</p>

                    <div className="relative w-[1104px] h-[498px] bg-white rounded-[12px] border-blue-600">
                        <div className="absolute w-[1104px] h-px top-[415px] left-0 bg-gray-50" />
                        <div className="absolute top-[31px] left-[32px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-800 text-[18px] tracking-[0] leading-[normal]">
                            Editer un compte
                        </div>
                        <div className="inline-flex flex-col items-start gap-[16px] absolute top-[94px] left-[32px]">
                            <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Adresse e-mail
                                    </div>
                                    {renderInputField(USER_CONFIG_INPUTS[0], email, (e) => setEmail(e.target.value))}
                                </div>
                                <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Numéro de téléphone
                                    </div>
                                    {renderInputField(USER_CONFIG_INPUTS[1], phone, (e) => setPhone(e.target.value))}
                                </div>
                            </div>
                            <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Nom
                                    </div>
                                    {renderInputField(USER_CONFIG_INPUTS[2], nom, (e) => setNom(e.target.value))}
                                </div>
                                <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Prénom
                                    </div>
                                    {renderInputField(USER_CONFIG_INPUTS[3], prenom, (e) => setPrenom(e.target.value))}
                                </div>
                            </div>
                            <div className="flex w-[1040px] items-start gap-[12px] relative flex-[0_0_auto]">
                                <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Adresse
                                    </div>
                                    {renderInputField(USER_CONFIG_INPUTS[4], address, (e) => setAddress(e.target.value))}
                                </div>
                                <div className="flex flex-col items-start gap-[8px] relative flex-1 grow">
                                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
                                        Mot de passe
                                    </div>
                                    {renderInputField(USER_CONFIG_INPUTS[5], pass, (e) => setPass(e.target.value))}
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex h-[48px] items-center justify-center gap-[8px] p-[16px] absolute top-[428px] left-[32px] bg-[#4763e4] rounded-[10px]">
                            <div className="relative w-fit mt-[-4.00px] mb-[-2.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#ffffff] text-[18px] tracking-[0] leading-[normal]">
                                Modifier
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

function useState(arg0: string): [any, any] {
    throw new Error("Function not implemented.");
}
