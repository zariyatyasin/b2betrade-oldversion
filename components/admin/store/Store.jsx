"use client";
import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import StoreTable from "../../../components/Table/StoreTable";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import SortingDropdown from "../../selects/SortingDropdown";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Store({ Stores, paginationCount }) {
  console.log(Stores);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const headers = {
    storeName: "Store Name",
    categorySubCategory: "Category/SubCategory",
    active: "Active",

    status: "Status",
    revenue: "Revenue",
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

  const sortingOptions = [
    {
      name: "Recommend",
      value: "",
    },
    {
      name: "pending",
      value: "pending",
    },
    {
      name: "active",
      value: "active",
    },
    {
      name: "ban",
      value: "ban",
    },
    {
      name: "block",
      value: "block",
    },

    // ... (other sorting options)
  ];

  return (
    <div>
      <SortingDropdown
        sortingOptions={sortingOptions}
        sortHandler={sortHandler}
      />
      <StoreTable headers={headers} Stores={Stores} />

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
