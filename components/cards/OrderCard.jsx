"use client";
import Link from "next/link";
import React, { useState } from "react";
import DynamicFormModel from "../modelUi/DynamicFormModel";
import DeleteConfirmationModal from "../../components/modelUi/DeleteConfirmationModal";
import ViewDetailsModal from "../../components/modelUi/ViewDetailsModal";
import axios from "axios";
import { useSession } from "next-auth/react";
import FullScreenLoading from "../fullScreenOverlay/FullScreenLoading";
export default function OrderCard({ data }) {
  const [order, setorder] = useState(data);
  const { data: session, status } = useSession();
  const [editedProduct, setEditedProduct] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  let totalProductNumber = 0;
  const menuItem = [
    { value: "Not Processed", label: "Not Processed" },
    { value: "Processing", label: "Processing" },
    { value: "Dispatched", label: "Dispatched" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Completed", label: "Completed" },
  ];
  const renderProduct = (product, index) => {
    totalProductNumber += 1;
    return (
      <div
        key={product._id}
        className="product mt-4 bg-gray-100 p-2  mb-4 max-w-xs"
      >
        <div className=" h-14 w-14">
          <img
            src={product.image}
            alt={product.name}
            className=" h-full w-full object-fit border"
          />
        </div>
        <div className="product-details">
          <Link
            href={`/product/${product.product}/0/0`}
            target="_blank"
            prefetch={false}
          >
            <h3 className="  text-blue-700 truncate">
              <span className="  text-blue-700  text-sm font-semibold truncate">{`${
                index + 1
              }`}</span>{" "}
              {product.name}
            </h3>
          </Link>

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
              <p className="mb-2">
                <span className="text-blue-700 font-bold">Size:</span>{" "}
                <span className="text-gray-950 font-bold">{product.size}</span>
              </p>
              <p className="mb-2">
                <span className="text-green-700 font-bold">Price:</span>{" "}
                <span className="text-gray-950 font-bold">{product.price}</span>
              </p>
              <p className="mb-2">
                <span className="text-yellow-700 font-bold">Quantity:</span>{" "}
                <span className="text-gray-950 font-bold">{product.qty}</span>
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
              <p className="mb-2">
                <span className="text-indigo-700 font-bold">Total Price:</span>{" "}
                <span className="text-gray-950 font-bold">
                  {product.qty * product.price}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-red-700 font-bold">Status:</span>{" "}
                <span className="text-gray-950 font-bold">
                  {product?.status}
                </span>
              </p>
              {session?.user.role === "admin" && (
                <button
                  className=" text-blue-600"
                  onClick={() => openEditProductModal(product)}
                >
                  Edit Product
                </button>
              )}
            </div>
          </div>

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
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img
                src={product.color.image}
                alt="Color Image"
                className=" h-full w-full rounded-full"
              />
            </div>
          ) : (
            <div className="no-color-info">No color information available</div>
          )}
        </div>
      </div>
    );
  };
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

  const handleDelete = async (orderId) => {
    try {
      setLoading(true);
      setDeleteConfirmationOpen(false);
      const response = await axios.delete(`/api/order/update/${orderId}`);
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Failed to delete order:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting order:", error.message);
    } finally {
      window.location.reload();
      setDeleteConfirmationOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading && <FullScreenLoading />}
      <tr>
        <td className="whitespace-nowrap pl-4 pr-3 text-sm sm:pl-6 hover:bg-gray-100">
          <div className="shipping-address">
            <p>Full Name: {order.shippingAddress.fullName}</p>
            <p>Phone Number: {order.shippingAddress.phoneNumber}</p>
            <p>Address: {order.shippingAddress.address1}</p>
            <p>City: {order.shippingAddress.city}</p>
            <p>State: {order.shippingAddress.state}</p>
          </div>
        </td>

        <td className="whitespace-nowrap px-3 text-sm text-gray-500">
          {order.products.map((product, index) =>
            renderProduct(product, index)
          )}
        </td>
        <td className="whitespace-nowrap px-3 text-sm text-gray-500">
          <p>User Name: {order.user.name}</p>
          <p>Email: {order.user.email || "N/A"}</p>
          <p>Phone Number: {order.user.phoneNumber}</p>
          <p>User Role: {order.user.role}</p>
        </td>
        <td className="whitespace-nowrap px-3 text-sm text-gray-500">
          <p className=" font-bold text-gray-950">
            Order Number: {order.orderNumber}
          </p>
          <p className=" font-bold text-gray-950">
            Order Total Number: {totalProductNumber}
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
        <td className="relative whitespace-nowrap pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <Link
            href={`/orderdetails/${order._id}`}
            target="_blank"
            onClick={openViewModel}
            className="text-indigo-600 cursor-pointer hover:text-indigo-900"
          >
            View
          </Link>

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

      {/* {isViewModalOpen && (
        <ViewDetailsModal data={order} onClose={closeViewModel} />
      )} */}

      {isDeleteConfirmationOpen && (
        <DeleteConfirmationModal
          onClose={closeDeleteConfirmation}
          onDelete={() => handleDelete(order._id)}
        />
      )}
    </>
  );
}
