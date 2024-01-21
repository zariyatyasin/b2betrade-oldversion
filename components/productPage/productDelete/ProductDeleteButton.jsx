"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const ProductDeleteButton = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await axios.delete(`/api/admin/product/delete/${id}`);
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error deleting product:", error.message);
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="border border-red-500 rounded-md p-2"
      >
        {loading ? "Deleting..." : "Delete Product"}
      </button>
      <Link
        href={`/editproduct/${id}`}
        target="_blank"
        className="border border-blue-500 rounded-md p-2"
      >
        Edit
      </Link>
    </div>
  );
};

export default ProductDeleteButton;
