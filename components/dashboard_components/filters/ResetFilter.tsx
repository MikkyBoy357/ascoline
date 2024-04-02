import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Dispatch, Fragment, SetStateAction, useMemo, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { TransportType } from "@/components/dashboard_components/SettingComponents/TransportCard";
import { FiltersType } from "@/components/dashboard_components/productOrders/ProductOrderList";

export default function ResetFilter({
  filters,
  setFilters,
  setPage,
}: {
  filters: FiltersType;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const checkIfDisabled = useMemo(() => {
    return (
      filters.date == undefined &&
      filters.status.length === 0 &&
      filters.clients.length === 0 &&
      filters.packageTypes.length === 0 &&
      filters.transportTypes.length === 0 &&
      filters.products.length === 0
    );
  }, [filters]);

  return (
    <div className=" min-w-0 ">
      <button
        disabled={checkIfDisabled}
        onClick={() => {
          setFilters({
            status: [],
            clients: [],
            packageTypes: [],
            transportTypes: [],
            products: [],
            date: undefined,
          });
          setPage(1);
        }}
        className="group inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      >
        Réinitialiser
      </button>
    </div>
  );
}
