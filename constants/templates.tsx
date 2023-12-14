export const BaseUrl: string = 'http://18.130.232.167:3000';
// export const BaseUrl: string = 'http://localhost:3000';

export type TemplateInput = {
    id: string;
    label: string;
    placeholder: string;
    type: "text" | "textarea" | "select";
    options?: string[];
};

export const LOGIN_INPUTS: TemplateInput[] = [
    {
        id: "email",
        label: "Email",
        placeholder: "johndoe@gmail.com",
        type: "text",
    },
    {
        id: "password",
        label: "Mot de passe",
        placeholder: "*******",
        type: "text",
    },
]

export const SIGN_UP_INPUTS: TemplateInput[] = [
    {
        id: "email",
        label: "Email",
        placeholder: "johndoe@gmail.com",
        type: "text",
    },
    {
        id: "phone",
        label: "Numero de Télephone",
        placeholder: "12345678",
        type: "text",
    },
    {
        id: "password",
        label: "Mot de passe",
        placeholder: "*******",
        type: "text",
    },
    {
        id: "cpassword",
        label: "Confirmer votre mot de passe",
        placeholder: "*******",
        type: "text",
    },
]

export const FORGOT_PASSWORD_INPUTS: TemplateInput[] = [
    {
        id: "email",
        label: "Address e-mail",
        placeholder: "johndoe@gmail.com",
        type: "text",
    },
]

export const USER_CONFIG_INPUTS: TemplateInput[] = [
    {
        id: "email",
        label: "Email",
        placeholder: "johndoe@gmail.com",
        type: "text",
    },
    {
        id: "phone",
        label: "Numéro de téléphone",
        placeholder: "(+237) 696 88 77 55",
        type: "text",
    },
    {
        id: "nom",
        label: "Nom",
        placeholder: "John",
        type: "text",
    },
    {
        id: "prenom",
        label: "Prénom",
        placeholder: "Doe",
        type: "text",
    },
    {
        id: "address",
        label: "Addresse",
        placeholder: "Benin, Cotonou",
        type: "text",
    },
    {
        id: "password",
        label: "Mot de passe",
        placeholder: "*******",
        type: "text",
    },
];

export const ADD_ORDER_INPUTS: TemplateInput[] = [
    {
        id: "trackingId",
        label: "Tracking ID",
        placeholder: "242562728",
        type: "text",
    },
    {
        id: "typeColis",
        label: "Type de colis",
        placeholder: "Batterie",
        type: "select",
    },
    {
        id: "transportType",
        label: "Type de transport",
        placeholder: "BATEAU",
        type: "select",
    },
    {
        id: "client",
        label: "Client",
        placeholder: "Didier",
        type: "select",
    },
    {
        id: "description",
        label: "Description",
        placeholder: "Alexander",
        type: "text",
    },
    {
        id: "unit",
        label: "Unité",
        placeholder: "",
        type: "select",
    },
    {
        id: "pays",
        label: "Pays de destination",
        placeholder: "Rwanda",
        type: "select",
    },
    {
        id: "quantity",
        label: "Quantité",
        placeholder: "10",
        type: "text",
    },
    {
        id: "ville",
        label: "Ville",
        placeholder: "Cotonou",
        type: "text",
    },
    {
        id: "status",
        label: "Statut",
        placeholder: "Actif",
        type: "select",
    },
    {
        id: "specialNote",
        label: "Note Spéciale",
        placeholder: "Don't get in the mix",
        type: "text",
    },
];

export const ADD_PRICING_INPUTS: TemplateInput[] = [
    {
        id: "price",
        label: "Prix",
        placeholder: "200",
        type: "text",
    },
    {
        id: "typeColis",
        label: "Type de colis",
        placeholder: "Batterie",
        type: "select",
    },
    {
        id: "transportType",
        label: "Type de transport",
        placeholder: "avion",
        type: "select",
    },
    {
        id: "unit",
        label: "Unité",
        placeholder: "kg",
        type: "select",
    },
    {
        id: "description",
        label: "Description",
        placeholder: "Alex",
        type: "text",
    },
    {
        id: "quantity",
        label: "Quantité",
        placeholder: "2",
        type: "text",
    },
];

export const ADD_TRANSPORT_INPUTS: TemplateInput[] = [
    {
        id: "label",
        label: "Label",
        placeholder: "",
        type: "text",
    },
    {
        id: "description",
        label: "Description",
        placeholder: "",
        type: "text",
    },
];