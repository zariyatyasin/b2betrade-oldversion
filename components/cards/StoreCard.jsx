import Link from "next/link";
import React, { useState } from "react";
import StoreModel from "../../components/modelUi/StoreModel";
import DeleteConfirmationModal from "../../components/modelUi/DeleteConfirmationModal";
import ViewDetailsModal from "../../components/modelUi/ViewDetailsModal";
import axios from "axios";
export default function StoreCard({ data }) {
  const [store, setStore] = useState(data);

  console.log(store);
  console.log("thso data", data);

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
          <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={store?.owner?.image}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="font-medium text-gray-900">
                {store?.storeName}
              </div>
              <div className="text-gray-500">
                {store?.owner?.email || store?.owner?.phoneNumber}
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
          <div className="text-gray-900"> {store?.category?.name}</div>

          <div className="flex ">
            {store?.subCategories?.map((subcategory, index) => (
              <div
                key={index}
                className=" flex flex-row bg-blue-500  p-1  px-2 py-1 rounded-full text-xs m-1 "
              >
                <div className="text-white">{subcategory.name}</div>
              </div>
            ))}
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${roleColorClass}`}
          >
            {store?.owner?.role.toUpperCase()}
          </span>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {store?.storeAtive === "pending" && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs m-1">
              Pending
            </span>
          )}

          {store?.storeAtive === "active" && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs m-1">
              Active
            </span>
          )}

          {store?.storeAtive === "ban" && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs m-1">
              Ban
            </span>
          )}

          {store?.storeAtive === "block" && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs m-1">
              Block
            </span>
          )}
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-red-500`}
          >
            400k+
          </span>
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
        <StoreModel
          data={store}
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
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      )}
    </>
  );
}
