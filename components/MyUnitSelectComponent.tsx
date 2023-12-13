import React from 'react';
import { MeasureUnit } from './dashboard_components/SettingComponents/UnitCard';
import { TransportType } from './dashboard_components/SettingComponents/TransportCard';
import { PackageType } from './dashboard_components/SettingComponents/PackageCard';

interface SelectProps {
    id: string;
    value: string;
    handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectList: MeasureUnit[] | TransportType[] | PackageType[];
}

const UnitSelectComponent: React.FC<SelectProps> = ({
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
                    {`${item.label}`}
                </option>
            ))}
        </select>
    );
};

export default UnitSelectComponent;
