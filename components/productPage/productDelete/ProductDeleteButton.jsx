"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import ConfirmationModal from "../../modelUi/ConfirmationModal";
const ProductDeleteButton = ({ id, visible }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  function generateRandomString(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }

  // Function to generate a unique SKU
  async function generateUniqueSKU(existingSKUs) {
    const skuLength = 8; // Length of the SKU
    let isUnique = false;
    let sku;

    // Generate SKU until it's unique
    while (!isUnique) {
      sku = generateRandomString(skuLength);
      // Check if the generated SKU already exists
      if (!existingSKUs.includes(sku)) {
        isUnique = true;
      }
    }

    return sku;
  }

  // Example usage
  const existingSKUs = ["ABC123", "DEF456", "GHI789"]; // Existing SKUs in your database
  generateUniqueSKU(existingSKUs).then((sku) => {
    console.log("Generated SKU:", sku);
  });
  const result =
    visible === "visible"
      ? "visible"
      : visible === "hidden"
      ? "hidden"
      : "unknown";

  const handleDelete = async () => {
    try {
      setLoading(true);
      // const response = await axios.delete(`/api/admin/product/delete/${id}`);
      // toast.success(response.data.message);
      console.log(id);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
      window.location.reload();
    }
  };

  return (
    <div className="flex   items-center">
      <button
        onClick={() => setShowConfirmation(true)}
        disabled={loading}
        className="border border-red-500 rounded-md p-2"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      <Link
        href={`/editproduct/${id}`}
        target="_blank"
        className="border border-blue-500 rounded-md p-2"
      >
        Edit
      </Link>
      <div
        style={{ background: result === "visible" ? "blue" : "red" }}
        className=" text-white p-1 rounded"
      >
        {result}
      </div>
      <ConfirmationModal
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        handleDelete={handleDelete}
        result={result}
      />
    </div>
  );
};

export default ProductDeleteButton;
