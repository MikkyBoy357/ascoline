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

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clsx("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: clsx(
          "border border-input bg-white hover:bg-state-100 hover:text-black",
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: " rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",

        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: clsx(
          "hover:bg-slate-100 ",
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_end: "aria-selected:bg-black  aria-selected:text-white",
        day_range_start: "aria-selected:bg-black  aria-selected:text-white",
        day_selected:
          "bg-slate-100 start:bg-red-500 focus:bg-black focus:text-white",
        day_today: "text-red-500 font-semibold",
        day_outside:
          "day-outside opacity-50 aria-selected:bg-slate-200/50 aria-selected:text-black aria-selected:opacity-30",
        day_disabled: " opacity-50",
        day_range_middle: "aria-selected:bg-state-100 aria-selected:text-black",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

export default function DateRangeFilter({
  filters,
  setFilters,
}: {
  filters: FiltersType;
  setFilters: Dispatch<SetStateAction<FiltersType>>;
}) {
  const selectedDate = useMemo(() => {
    return filters.date;
  }, [filters]);

  return (
    <div className=" max-w-full  ">
      <Popover className="relative w-full ">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "text-black" : "text-black"}
                 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
            >
              {selectedDate?.from ? (
                selectedDate.to ? (
                  <>
                    {format(selectedDate.from, "LLL dd, y", { locale: fr })} -{" "}
                    {format(selectedDate.to, "LLL dd, y", { locale: fr })}
                  </>
                ) : (
                  format(selectedDate.from, "LLL dd, y")
                )
              ) : (
                <span>Choisissez une date</span>
              )}
              <ChevronDownIcon
                className={`
                  ml-2 h-5 w-5 transition duration-150 ease-in-out text-black`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200 "
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3  -translate-x-1/2 transform px-4 sm:px-0 ">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative bg-white">
                    <Calendar
                      locale={fr}
                      initialFocus
                      mode="range"
                      defaultMonth={selectedDate?.from}
                      selected={selectedDate}
                      onSelect={(select) => {
                        setFilters((prevState) => {
                          return { ...prevState, date: select };
                        });
                      }}
                      numberOfMonths={2}
                    />
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
