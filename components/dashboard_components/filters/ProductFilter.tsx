import { Dispatch, Fragment, SetStateAction, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { Search } from "lucide-react";

import { FiltersType } from "@/components/dashboard_components/productOrders/ProductOrderList";
import { Product } from "@/components/dashboard_components/products/ProductsList";

export default function ProductFilter({
  filters,
  setFilters,
  productsData,
}: {
  filters: FiltersType;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
  productsData: Product[];
}) {
  const [query, setQuery] = useState("");

  const selectedProduct = useMemo(() => {
    return filters.products;
  }, [filters]);

  const allProducts = useMemo(() => {
    return productsData.map((pro) => {
      return {
        id: pro._id,
        name: pro.name,
      };
    });
  }, [productsData]);

  const allFilteredProducts = useMemo(() => {
    return query === ""
      ? allProducts
      : allProducts.filter((product) =>
          product.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );
  }, [allProducts, query]);

  return (
    <div className=" min-w-0">
      <Listbox
        multiple
        value={filters.products}
        onChange={(value) => {
          //console.log(value);
          setFilters((prevState) => {
            return { ...prevState, products: value };
          });
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <div className=" truncate flex items-center">
              <span className="font-semibold">Produits</span>
              {selectedProduct.length > 0 && (
                <>
                  <div className="inline-block h-5 w-0.5 mx-2 self-center bg-neutral-500 "></div>
                  <span>
                    {selectedProduct.length > 1
                      ? `${selectedProduct.length} produits`
                      : `${allProducts.find(
                          (pro) => pro.id === selectedProduct[0],
                        )?.name} `}
                  </span>
                </>
              )}
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <div className="relative mt-2 rounded-md ">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="search"
                  name="search-status"
                  id="search-status"
                  className="block w-full border-b py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
                  placeholder="Recherche"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              {allFilteredProducts.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Aucune donnée trouvée
                </div>
              ) : (
                allFilteredProducts.map((productElem, productIdx) => (
                  <Listbox.Option
                    key={productIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={productElem.id}
                  >
                    <>
                      <span
                        className={`block truncate ${
                          selectedProduct.includes(productElem.id)
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        {`${productElem.name} `}
                      </span>
                      {selectedProduct.includes(productElem.id) && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  </Listbox.Option>
                ))
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
