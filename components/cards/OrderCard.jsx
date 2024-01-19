"use client";
import Link from "next/link";
import React, { useState } from "react";
import DynamicFormModel from "../modelUi/DynamicFormModel";
import DeleteConfirmationModal from "../../components/modelUi/DeleteConfirmationModal";
import ViewDetailsModal from "../../components/modelUi/ViewDetailsModal";
import axios from "axios";
import { useSession } from "next-auth/react";
export default function OrderCard({ data }) {
  const [order, setorder] = useState(data);
  const { data: session, status } = useSession();
  const [editedProduct, setEditedProduct] = useState(null); // New state for edited product

  const menuItem = [
    { value: "Not Processed", label: "Not Processed" },
    { value: "Processing", label: "Processing" },
    { value: "Dispatched", label: "Dispatched" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Completed", label: "Completed" },
  ];
  const renderProduct = (product) => (
    <div key={product._id} className="product">
      <img src={product.image} alt={product.name} className=" h-8 w-8" />
      <div className="product-details">
        <Link
          href={`/product/${product.product}/0/0`}
          target="_blank"
          prefetch={false}
        >
          <h3 className="  text-blue-700">{product.name}</h3>
        </Link>

        <p>Size: {product.size}</p>
        <p>Price: {product.price}</p>
        <p>Quantity: {product.qty}</p>
        <p>Total Price: {product.qty * product.price}</p>
        <p>Status: {product?.status}</p>
        {session?.user.role === "admin" && (
          <button
            className=" text-blue-600"
            onClick={() => openEditProductModal(product)}
          >
            Edit Product
          </button>
        )}

        {product.color.color ? (
          <div
            className="color-box"
            style={{
              backgroundColor: product.color.color,
              width: "20px",
              height: "20px",
            }}
          ></div>
        ) : product.color.image ? (
          <img
            src={product.color.image}
            alt="Color Image"
            className="color-image"
          />
        ) : (
          <div className="no-color-info">No color information available</div>
        )}
      </div>
    </div>
  );
  const fields = [
    {
      type: "text",
      label: "Phone Number",
      name: "shippingAddress.phoneNumber",
    },
    { type: "select", label: "status", name: "status", options: menuItem },
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Processed":
        return "red";
      case "Processing":
        return "orange";
      case "Dispatched":
        return "blue";
      case "Cancelled":
        return "gray";
      case "Completed":
        return "green";
      default:
        return "black";
    }
  };

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const openEditModal = () => {
    setEditModalOpen(true);
  };
  const openEditProductModal = (product) => {
    setEditedProduct({
      ...product,
      orderId: order._id,
    });
    openEditModal();
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

      const url = editedData.orderId
        ? `/api/order/updatesingleorder/${editedData.orderId}`
        : `/api/order/update/${editedData._id}`;

      console.log(url);

      const response = await axios.put(url, editedData);

      if (response.status === 200) {
        setorder((prevorder) => ({
          ...prevorder,
          ...response.data.newUpdatedOrder,
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

  const handleDelete = () => {
    closeDeleteConfirmation();
  };

  return (
    <>
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div className="shipping-address">
            <p>Full Name: {order.shippingAddress.fullName}</p>
            <p>Phone Number: {order.shippingAddress.phoneNumber}</p>
            <p>Address: {order.shippingAddress.address1}</p>
            <p>City: {order.shippingAddress.city}</p>
            <p>State: {order.shippingAddress.state}</p>
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {order.products.map(renderProduct)}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p>User Name: {order.user.name}</p>
          <p>Email: {order.user.email || "N/A"}</p>
          <p>Phone Number: {order.user.phoneNumber}</p>
          <p>User Role: {order.user.role}</p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p className=" font-bold text-gray-950">
            Order Number: {order.orderNumber}
          </p>
          <p>Payment Method: {order.paymentMethod}</p>
          {session?.user.role === "admin" && (
            <p>Total: ${order.totalBeforeDiscount}</p>
          )}

          <p>
            Status:
            <span
              className=" font-bold text-white px-2 py-1 rounded-full text-xs m-1"
              style={{ background: getStatusColor(order.status) }}
            >
              {order.status}
            </span>
          </p>

          <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <div
            onClick={openViewModel}
            className="text-indigo-600 cursor-pointer hover:text-indigo-900"
          >
            View
          </div>

          {session?.user.role === "admin" && (
            <div>
              <div
                onClick={openDeleteConfirmation}
                className="text-red-600 hover:text-red-900 cursor-pointer"
              >
                Delete
              </div>
              <div
                onClick={openEditModal}
                className="text-indigo-600 cursor-pointer hover:text-indigo-900"
              >
                Edit
              </div>
            </div>
          )}
        </td>
      </tr>
      {isEditModalOpen && (
        <DynamicFormModel
          data={editedProduct || order} // Use editedProduct if available, else use order
          orderId={order._id} // Pass the order ID as a prop
          fields={fields}
          menuItem={menuItem}
          onClose={closeEditModal}
          onSave={saveEditedData}
        />
      )}

      {isViewModalOpen && (
        <ViewDetailsModal data={order} onClose={closeViewModel} />
      )}

      {isDeleteConfirmationOpen && (
        <DeleteConfirmationModal
          onClose={closeDeleteConfirmation}
          onDelete={handleDelete}
        />
      )}

      {isLoading && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      )}
    </>
  );
}
