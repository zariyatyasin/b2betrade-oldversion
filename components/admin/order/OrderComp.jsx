"use client";
import React, { useEffect, useState } from "react";
import { MiniSearchBar } from "../../search/Searchbar";
import { useSearchParams } from "next/navigation";
import StoreTable from "../../../components/Table/StoreTable";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import SortingDropdown from "../../selects/SortingDropdown";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import OrderCard from "../../cards/OrderCard";
export default function OrderComp({ Orders, paginationCount }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const headers = {
    storeName: "Shipping Address",
    categorySubCategory: "Products",
    active: "User Details",

    status: "Order Details",

    edit: "Edit",
  };

  const filterUrl = ({ page, sort }) => {
    const currentQuery = new URLSearchParams(searchParams.toString());

    if (page !== undefined) {
      currentQuery.set("page", page);
    }
    if (sort !== undefined) {
      currentQuery.set("sort", sort);
    }
    const queryStr = currentQuery.toString();

    const newUrl = `${pathname}?${queryStr}`;

    router.push(newUrl, { scroll: false });
  };

  const pageHandler = (e, page) => {
    filterUrl({ page });
  };
  const sortHandler = (sort) => {
    if (sort) {
      filterUrl({ sort });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("sort");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };
  useEffect(() => {}, []);
  const sortingOptions = [
    {
      name: "Recommend",
      value: "",
    },
    {
      name: "Not Processed",
      value: "Not Processed",
    },
    {
      name: "Processing",
      value: "Processing",
    },
    {
      name: "Dispatched",
      value: "Dispatched",
    },
    {
      name: "Cancelled",
      value: "Cancelled",
    },
    {
      name: "Completed",
      value: "Completed",
    },
    // ... (other sorting options)
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-2 ">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#2B39D1] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Store
          </button>
        </div>
      </div>
      <MiniSearchBar linkUrl="/admin/dashboard/order" />
      <div className="   flex  items-center justify-end mt-2">
        <button
          className="border text-sm   p-2 bg-[#2B39D1] text-white rounded-3xl  "
          onClick={() => router.push("/admin/dashboard/order")}
        >
          Clear All ({Array.from(searchParams).length})
        </button>
        <SortingDropdown
          sortingOptions={sortingOptions}
          sortHandler={sortHandler}
        />
      </div>
      <StoreTable headers={headers} data={Orders} CardComponent={OrderCard} />

      <Stack spacing={2}>
        <Pagination
          count={paginationCount}
          defaultPage={Number(searchParams.page) || 1}
          onChange={pageHandler}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
}
