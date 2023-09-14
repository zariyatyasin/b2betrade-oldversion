"use client";

import Layout from "../../../components/admin/Layout/Layout";
import React from "react";
import { toast } from "react-toastify";

export default function page() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <button onClick={() => toast.success("working perfetlu")}>Click</button>
      </div>
    </Layout>
  );
}
