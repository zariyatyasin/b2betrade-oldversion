/* This example requires Tailwind CSS v2.0+ */
"use client";

import SortingDropdown from "../../selects/SortingDropdown";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function SuplierNavbar({ paginationCount }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filterUrl = ({ page, sortvisible }) => {
    const currentQuery = new URLSearchParams(searchParams.toString());

    if (page !== undefined) {
      currentQuery.set("page", page);
    }
    if (sortvisible !== undefined) {
      currentQuery.set("sortvisible", sortvisible);
    }

    const queryStr = currentQuery.toString();

    const newUrl = `${pathname}?${queryStr}`;

    router.push(newUrl, { scroll: false });
  };
  const pageHandler = (e, page) => {
    filterUrl({ page });
  };
  const sortvisibleHandler = (sortvisible) => {
    if (sortvisible) {
      filterUrl({ sortvisible });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("sortvisible");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  const sortvisibleOptions = [
    {
      name: "Recommend",
      value: "",
    },

    {
      name: "visible",
      value: "visible",
    },
    {
      name: "hidden",
      value: "hidden",
    },
  ];
  return (
    <header className=" ">
      <nav className="  px-4 sm:px-6 lg:px-0" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between  ">
          <div className="flex items-center">
            <Stack spacing={2}>
              <Pagination
                count={paginationCount}
                defaultPage={Number(searchParams.get("page")) || 1}
                onChange={pageHandler}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
          <div className="  space-x-4">
            <SortingDropdown
              sortingOptions={sortvisibleOptions}
              sortHandler={sortvisibleHandler}
            />
          </div>
        </div>
        {/* <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {subCategory.map((link) => (
            <a className="text-base font-medium text-black uppercase ">
              {link.name}
            </a>
          ))}
        </div> */}
      </nav>
    </header>
  );
}
