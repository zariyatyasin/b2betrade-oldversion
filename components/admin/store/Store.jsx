"use client";
import React from "react";

import { useSearchParams } from "next/navigation";

import StoreTable from "../../../components/Table/StoreTable";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Store({ Stores, paginationCount }) {
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

  const filterUrl = ({ page }) => {
    const currentQuery = new URLSearchParams(searchParams.toString());

    if (page) {
      currentQuery.set("page", page);
    }

    const queryStr = currentQuery.toString();

    const newUrl = `${pathname}?${queryStr}`;

    router.push(newUrl, { scroll: false });
  };

  const pageHandler = (e, page) => {
    filterUrl({ page });
  };

  return (
    <div>
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
