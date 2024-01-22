import Link from "next/link";
import React, { useState } from "react";
import DynamicFormModel from "../modelUi/DynamicFormModel";
import DeleteConfirmationModal from "../../components/modelUi/DeleteConfirmationModal";
import ViewDetailsModal from "../../components/modelUi/ViewDetailsModal";
import axios from "axios";
import ProductSwiper from "./ProductSwiper";
import FullScreenLoading from "../fullScreenOverlay/FullScreenLoading";
export default function ProductTableCard({ data }) {
  const [product, setproduct] = useState(data);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(data.subProducts[0].images);
  const hasNullPrice =
    product.bulkPricing &&
    product.bulkPricing.some((bulkPrice) => bulkPrice.price === null);
  const price = product.bulkPricing.map((bulkPrice) => bulkPrice.price);
  const highPrice = Math.max(...price);
  const lowPrice = Math.min(...price);
  const firstSizeBulkPricing = product.subProducts[0].sizes[0].bulkPricing;

  const minPrice = Math.min(
    ...firstSizeBulkPricing.map((pricing) => pricing.price)
  );
  const maxPrice = Math.max(
    ...firstSizeBulkPricing.map((pricing) => pricing.price)
  );
  const minQty2 = product.bulkPricing[0].minQty;
  const minQty = firstSizeBulkPricing[0].minQty;
  const menuItem = [
    { value: "subadmin", label: "subadmin" },
    { value: "supplier", label: "supplier" },
    { value: "manufacturer", label: "manufacturer" },
    { value: "seller", label: "seller" },
    { value: "product", label: "product" },
  ];
  const verified = [
    { value: "pending", label: "pending" },
    { value: "ban", label: "ban" },
    { value: "block", label: "block" },
    { value: "active", label: "active" },
  ];
  const fields = [
    {
      type: "text",
      label: "name",
      name: "name",
    },
    {
      type: "text",
      label: "Phone Number",
      name: "phoneNumber",
    },
    {
      type: "text",
      label: "email",
      name: "email",
    },
    { type: "select", label: "role", name: "role", options: menuItem },

    {
      type: "select",
      label: "emailVerified",
      name: "emailVerified",
      options: verified,
    },
    { type: "passwordHash", label: "password", name: "password" },
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "green";
      case "supplier":
        return "orange";
      case "ban":
        return "blue";
      case "block":
        return "gray";
      case "active":
        return "green";
      default:
        return "black";
    }
  };

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openViewModel = () => {
    setViewModalOpen(true);
  };

  const closeViewModel = () => {
    setViewModalOpen(false);
  };

  const openDeleteConfirmation = () => {
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };
  const saveEditedData = async (editedData) => {
    try {
      setLoading(true);

      const response = await axios.put(
        `/api/product/update/${editedData._id}`,
        editedData
      );

      if (response.status === 200) {
        setproduct((prevproduct) => ({
          ...prevproduct,
          ...response.data.newUpdatedproduct,
        }));
      } else {
        console.error("Failed to update data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      closeDeleteConfirmation();
      setLoading(true);

      const response = await axios.delete(
        `/api/admin/product/delete/${product._id}`
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <FullScreenLoading />}
      <tr>
        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-6">
          <div className=" flex items-center max-w-xs">
            <div className=" h-20 w-20  mr-2  cursor-pointer ">
              <ProductSwiper images={images} />
            </div>
            <p className=" truncate"> {product.name}</p>
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <div className="mt-2 ">
            {!hasNullPrice && (
              <div>
                {product.bulkPricing.length === 1 ? (
                  // Display the single price
                  <p className="text-[#2B39D1] font-bold">
                    {" "}
                    ৳ {product.bulkPricing[0].price}
                  </p>
                ) : (
                  <div>
                    <p className="text-[#2B39D1] font-bold">
                      ৳ {lowPrice}- ৳{highPrice}
                    </p>
                  </div>
                )}
              </div>
            )}
            {hasNullPrice && (
              <div>
                <p className="text-[#2B39D1] font-bold">
                  {" "}
                  ৳{minPrice} - ৳{maxPrice}
                </p>
              </div>
            )}

            <div className=" text-left mt-2">
              {!hasNullPrice ? (
                <p>Min order: {minQty2}</p>
              ) : (
                <p>Min order: {minQty}</p>
              )}
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p>
            <span
              className=" font-bold text-white px-2 py-1 rounded-full text-xs m-1"
              style={{ background: getStatusColor(product.productAtive) }}
            >
              {product.productAtive} / {product?.productvisibility}
            </span>
          </p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p>{new Date(product.createdAt).toLocaleDateString("en-GB")}</p>
        </td>
        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p> {product.phoneNumber}</p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p>
            <span
              className=" font-bold text-white px-2 py-1 rounded-full text-xs m-1"
              style={{ background: getStatusColor(product.role) }}
            >
              {product.role}
            </span>
          </p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p className=" font-bold text-gray-950"> {product.email}</p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p className=" font-bold text-gray-950">
            {" "}
            {product.emailVerified === true ? "Verified" : "Not Verified"}
          </p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p>{new Date(product.createdAt).toLocaleDateString("en-GB")}</p>
        </td> */}
        <td className="relative flex gap-2 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <Link
            href={`/product/${product._id}/0/0`}
            target="_blank"
            className="text-indigo-600 hover:text-indigo-900"
            prefetch={false}
          >
            View
          </Link>

          <a
            href="#"
            onClick={openDeleteConfirmation}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </a>
          <Link
            href={`/editproduct/${product._id}`}
            prefetch={false}
            target="_blank"
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </Link>
        </td>
      </tr>
      {isEditModalOpen && (
        <DynamicFormModel
          data={product}
          fields={fields}
          menuItem={menuItem}
          onClose={closeEditModal}
          onSave={saveEditedData}
        />
      )}

      {/* {isViewModalOpen && (
        <ViewDetailsModal data={product} onClose={closeViewModel} />
      )} */}

      {isDeleteConfirmationOpen && (
        <DeleteConfirmationModal
          onClose={closeDeleteConfirmation}
          onDelete={handleDelete}
        />
      )}

      {/* {isLoading && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      )} */}
    </>
  );
}
