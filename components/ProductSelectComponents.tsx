import React from "react";
import { Client } from "./dashboard_components/clients/ClientList";
import { Product } from "@/components/dashboard_components/products/ProductsList";

// export interface Unit {
//     _id: string;
//     label: string;
// }

interface SelectProps {
  id: string;
  value: string;
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectList: Product[];
}

const ProductSelectComponent: React.FC<SelectProps> = ({
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
      <option disabled value="">
        {" "}
        -- Sélectionnez une valeur --
      </option>
      {selectList.map((item) => (
        <option key={item._id} value={item._id}>
          {`${item.name} - ${item.price}`}
        </option>
      ))}
    </select>
  );
};

export default ProductSelectComponent;
