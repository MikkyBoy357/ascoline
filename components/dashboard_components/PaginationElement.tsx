import { Listbox, Transition } from "@headlessui/react";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";

export function PaginationElement({
  page,
  setPage,
  pages,
  total,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pages: number;
  total: number;
}) {
  const pagesToArray = useMemo(() => {
    let arr = [];
    if (pages) {
      for (let i = 1; i !== pages + 1; i++) {
        arr.push({ id: i, name: i });
      }
    }

    return arr;
  }, [pages]);

  const [selectedPage, setSelectedPage] = useState(page ?? 1);

  if (total === 0) return null;

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white  py-3 "
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Affichage de{" "}
          <span className="font-medium"> {1 + 15 * (page - 1)}</span> à{" "}
          <span className="font-medium">
            {" "}
            {15 * page < total ? 15 * page : total}
          </span>{" "}
          of <span className="font-medium">{total}</span> éléments
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          disabled={page === 1}
          onClick={() => {
            setPage((prevState) => prevState - 1);
          }}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Précédant
        </button>

        <div className="mx-4 flex items-center">
          <Listbox
            value={page}
            onChange={(e) => {
              setPage(e);
            }}
            disabled={pages <= 1}
          >
            <div className="relative">
              <Listbox.Button className="relative">
                {pages > 1 ? (
                  <span>{`${page} / ${pages}`}</span>
                ) : (
                  <span>{`${page}`}</span>
                )}
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 -translate-x-4 bottom-12 mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-center shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {pagesToArray.map((pageElem, pageIdx) => (
                    <Listbox.Option
                      key={pageElem.id}
                      className={({ active, selected }) =>
                        clsx(
                          "relative cursor-default select-none py-2 px-5 ",
                          selectedPage === pageElem.name &&
                            "bg-amber-100 text-amber-900",
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900",
                        )
                      }
                      value={pageElem.name}
                    >
                      <>
                        <span
                          className={clsx(
                            selectedPage === pageElem.name
                              ? "font-medium"
                              : "font-normal",
                          )}
                        >
                          {pageElem.name}
                        </span>
                      </>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <button
          disabled={page === pages}
          onClick={() => {
            setPage((prevState) => prevState + 1);
          }}
          className="relative  inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Suivant
        </button>
      </div>
    </nav>
  );
}
