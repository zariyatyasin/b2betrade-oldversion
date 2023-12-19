import Link from "next/link";
import React, { useState } from "react";
import DynamicFormModel from "../modelUi/DynamicFormModel";
import DeleteConfirmationModal from "../../components/modelUi/DeleteConfirmationModal";
import ViewDetailsModal from "../../components/modelUi/ViewDetailsModal";
import axios from "axios";
export default function OrderCard({ data }) {
  const [store, setStore] = useState(data);

  const renderProduct = (product) => (
    <div key={product._id} className="product">
      <img src={product.image} alt={product.name} className=" h-8 w-8" />
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>Size: {product.size}</p>
        <p>Quantity: {product.qty}</p>
      </div>
    </div>
  );
  const fields = [
    { type: "text", label: "Store Name", name: "storeName" },
    { type: "select", label: "Store Active", name: "storeAtive" },
    // Add more field configurations as needed
  ];

  const menuItem = [
    { value: "pending", label: "Pending" },
    { value: "ban", label: "Ban" },
    { value: "block", label: "Block" },
    { value: "active", label: "Active" },
  ];
  let roleColorClass = "";

  switch (store?.owner?.role) {
    case "admin":
      roleColorClass = "bg-blue-100 text-blue-800";
      break;
    case "supplier":
      roleColorClass = "bg-green-100 text-green-800";
      break;
    case "manufacturer":
      roleColorClass = "bg-yellow-100 text-yellow-800";
      break;
    case "seller":
      roleColorClass = "bg-purple-100 text-purple-800";
      break;
    case "user":
      roleColorClass = "bg-gray-100 text-gray-800";
      break;
    default:
      roleColorClass = "bg-gray-100 text-gray-800";
  }
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
    try {
      setLoading(true);

      const response = await axios.put(`/api/store`, editedData);

      if (response.status === 200) {
        console.log("Data updated successfully:", response.data);
        setStore((prevStore) => ({
          ...prevStore,
          ...response.data.newUpdatedStore,
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
    console.log("Deleting data:", store);
    closeDeleteConfirmation();
  };

  return (
    <>
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div className="shipping-address">
            <p>Full Name: {data.shippingAddress.fullName}</p>
            <p>Phone Number: {data.shippingAddress.phoneNumber}</p>
            <p>Address: {data.shippingAddress.address1}</p>
            <p>City: {data.shippingAddress.city}</p>
            <p>State: {data.shippingAddress.state}</p>
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {data.products.map(renderProduct)}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p>User Name: {data.user.name}</p>
          <p>Email: {data.user.email || "N/A"}</p>
          <p>Phone Number: {data.user.phoneNumber}</p>
          <p>User Role: {data.user.role}</p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p>Payment Method: {data.paymentMethod}</p>
          <p>Total: ${data.total}</p>
          <p>Status: {data.status}</p>
          <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
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
          data={store}
          fields={fields}
          menuItem={menuItem}
          onClose={closeEditModal}
          onSave={saveEditedData}
        />
      )}

      {isViewModalOpen && (
        <ViewDetailsModal data={store} onClose={closeViewModel} />
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
