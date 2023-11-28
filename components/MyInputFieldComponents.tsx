import React from 'react';
import { Client } from './dashboard_components/ClientList';

interface SelectProps {
    id: string;
    value: string;
    handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectList: Client[];
}

// export const renderClientSelectField = (
//     input: { id: any; label: any; placeholder?: string; type?: "text" | "textarea" | "select"; options?: string[] | undefined },
//     value: string,
//     handleChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
//     handleSelect?: (event: React.FormEvent<HTMLSelectElement>) => void,
//     selectList: Client[],
// ) => {
//     <ClientSelectComponent handleSelect={} selectList={selectList} />
// }

const ClientSelectComponent: React.FC<SelectProps> = ({
    id,
    value,
    handleSelect,
    selectList,
}) => {
    return (
        <select
            id={id}
            onChange={handleSelect}
            value={value}
            className="w-[520px] p-2 pb-[10px] text-gray-900 bg-white border border-gray-200 rounded-lg"
        >
            <option value="">Select</option>
            {selectList.map((item) => (
                <option key={item._id} value={item._id}>
                    {`${item.lastName} ${item.firstName}`}
                </option>
            ))}
        </select>
    );
};

export default ClientSelectComponent;
