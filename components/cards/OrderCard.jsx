import Link from "next/link";
import React, { useState } from "react";
import DynamicFormModel from "../modelUi/DynamicFormModel";
import DeleteConfirmationModal from "../../components/modelUi/DeleteConfirmationModal";
import ViewDetailsModal from "../../components/modelUi/ViewDetailsModal";
import axios from "axios";
export default function OrderCard({ data }) {
  const [order, setorder] = useState(data);

  const renderProduct = (product) => (
    <div key={product._id} className="product">
      <img src={product.image} alt={product.name} className=" h-8 w-8" />
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>Size: {product.size}</p>
        <p>Quantity: {product.qty}</p>
        {product.color.color ? ( // Check if color code is available
          <div
            className="color-box"
            style={{
              backgroundColor: product.color.color,
              width: "20px",
              height: "20px",
            }}
          ></div>
        ) : product.color.image ? ( // Check if image is available
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
    { type: "select", label: "status", name: "status" },
    // Add more field configurations as needed
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Processed":
        return "red"; // You can use your desired color here
      case "Processing":
        return "orange"; // You can use your desired color here
      case "Dispatched":
        return "blue"; // You can use your desired color here
      case "Cancelled":
        return "gray"; // You can use your desired color here
      case "Completed":
        return "green"; // You can use your desired color here
      default:
        return "black"; // Default color if status is not recognized
    }
  };

  const menuItem = [
    { value: "Not Processed", label: "Not Processed" },
    { value: "Processing", label: "Processing" },
    { value: "Dispatched", label: "Dispatched" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Completed", label: "Completed" },
  ];

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
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
    console.log(editedData);
    try {
      setLoading(true);

      const response = await axios.put(
        `/api/order/update/${editedData._id}`,
        editedData
      );

      if (response.status === 200) {
        console.log(
          "Data updated successfully:",
          response.data.newUpdatedOrder
        );
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
    // Implement the logic to delete the data
    console.log("Deleting data:", order);
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
          <p>Total: ${order.total}</p>
          <p>
            {" "}
            Status:{" "}
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
          <a
            href="#"
            onClick={openViewModel}
            className="text-indigo-600 hover:text-indigo-900"
          >
            View
          </a>
          {" | "}
          <a
            href="#"
            onClick={openDeleteConfirmation}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </a>
          <a
            href="#"
            onClick={openEditModal}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </a>
        </td>
      </tr>
      {isEditModalOpen && (
        <DynamicFormModel
          data={order}
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