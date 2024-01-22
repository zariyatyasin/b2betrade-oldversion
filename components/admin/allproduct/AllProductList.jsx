"use client";

import React, { useEffect, useState } from "react";
import { MiniSearchBar } from "../../search/Searchbar";
import { useSearchParams } from "next/navigation";
import Table from "../../Table/Table";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import SortingDropdown from "../../selects/SortingDropdown";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ProductTableCard from "../../cards/ProductTableCard";

export default function AllProductList({ products, paginationCount }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pathname = usePathname();
  const headers = {
    name: "Product Name",
    price: "Price",
    productAtive: "Product Status",

    createdAt: "Created",
    edit: "Edit",
  };

  const filterUrl = ({ page, sort, sortvisible }) => {
    const currentQuery = new URLSearchParams(searchParams.toString());

    if (page !== undefined) {
      currentQuery.set("page", page);
    }
    if (sortvisible !== undefined) {
      currentQuery.set("sortvisible", sortvisible);
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
  const sortvisibleHandler = (sortvisible) => {
    if (sortvisible) {
      filterUrl({ sortvisible });
    } else {
      const currentQuery = new URLSearchParams(searchParams.toString());
      currentQuery.delete("sortvisible");
      router.push(`${pathname}?${currentQuery.toString()}`, { scroll: false });
    }
  };

  const sortingOptions = [
    {
      name: "Recommend",
      value: "",
    },

    {
      name: "newest",
      value: "newest",
    },
    {
      name: "oldest",
      value: "oldest",
    },
  ];
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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-2 ">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">All Product</h1>
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
      <MiniSearchBar linkUrl="/admin/dashboard/product/allproduct" />
      <div className="   flex  items-center justify-end mt-2">
        <button
          className="border text-sm   p-2 bg-[#2B39D1] text-white rounded-3xl  "
          onClick={() => router.push("/admin/dashboard/product/allproduct")}
        >
          Clear All ({Array.from(searchParams).length})
        </button>
        {/* <SortingDropdown
      sortingOptions={sortingRole}
      sortHandler={sortHandler}
    /> */}
        <SortingDropdown
          sortingOptions={sortvisibleOptions}
          sortHandler={sortvisibleHandler}
        />
        <SortingDropdown
          sortingOptions={sortingOptions}
          sortHandler={sortHandler}
        />
      </div>
      <Table
        headers={headers}
        data={products}
        CardComponent={ProductTableCard}
      />

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
  );
}
