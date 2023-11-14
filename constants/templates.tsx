export type TemplateInput = {
    id: string;
    label: string;
    placeholder: string;
    type: "text" | "textarea" | "select";
    options?: string[];
};

export const AUTH_INPUTS: TemplateInput[] = [
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
        type: "text",
    },
    {
        id: "transportType",
        label: "Type de transport",
        placeholder: "BATEAU",
        type: "text",
    },
    {
        id: "client",
        label: "Client",
        placeholder: "Didier",
        type: "text",
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
        placeholder: "KG",
        type: "text",
    },
    {
        id: "pays",
        label: "Pays de destination",
        placeholder: "Rwanda",
        type: "text",
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
        type: "text",
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
        placeholder: "200",
        type: "text",
    },
    {
        id: "transportType",
        label: "Type de colis",
        placeholder: "200",
        type: "text",
    },
    {
        id: "unit",
        label: "Unité",
        placeholder: "kg",
        type: "text",
    },
    {
        id: "description",
        label: "Description",
        placeholder: "Alex",
        type: "text",
    },
    {
        id: "quantity",
        label: "Quantité(Kg)",
        placeholder: "2",
        type: "text",
    },
];