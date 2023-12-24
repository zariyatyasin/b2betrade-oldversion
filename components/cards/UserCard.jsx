import Link from "next/link";
import React, { useState } from "react";
import DynamicFormModel from "../modelUi/DynamicFormModel";
import DeleteConfirmationModal from "../../components/modelUi/DeleteConfirmationModal";
import ViewDetailsModal from "../../components/modelUi/ViewDetailsModal";
import axios from "axios";
export default function UserCard({ data }) {
  const [user, setuser] = useState(data);

  const fields = [
    {
      type: "text",
      label: "Phone Number",
      name: "phoneNumber",
    },
    { type: "text", label: "password", name: "password" },
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case "subadmin":
        return "red";
      case "supplier":
        return "orange";
      case "manufacturer":
        return "blue";
      case "seller":
        return "gray";
      case "user":
        return "green";
      default:
        return "black";
    }
  };

  const menuItem = [
    { value: "subadmin", label: "subadmin" },
    { value: "supplier", label: "supplier" },
    { value: "manufacturer", label: "manufacturer" },
    { value: "seller", label: "seller" },
    { value: "user", label: "user" },
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
    // try {
    //   setLoading(true);

    //   const response = await axios.put(
    //     `/api/user/update/${editedData._id}`,
    //     editedData
    //   );

    //   if (response.status === 200) {
    //     console.log(
    //       "Data updated successfully:",
    //       response.data.newUpdateduser
    //     );
    //     setuser((prevuser) => ({
    //       ...prevuser,
    //       ...response.data.newUpdateduser,
    //     }));
    //   } else {
    //     console.error("Failed to update data:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error updating data:", error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleDelete = () => {
    // Implement the logic to delete the data
    console.log("Deleting data:", user);
    closeDeleteConfirmation();
  };

  return (
    <>
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
          <div className="shipping-address">
            <p> {user.name}</p>
          </div>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p> {user.phoneNumber}</p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p>
            <span
              className=" font-bold text-white px-2 py-1 rounded-full text-xs m-1"
              style={{ background: getStatusColor(user.role) }}
            >
              {user.role}
            </span>
          </p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p className=" font-bold text-gray-950"> {user.email}</p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p className=" font-bold text-gray-950">
            {" "}
            {user.emailVerified === true ? "Verified" : "Not Verified"}
          </p>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <p>{new Date(user.createdAt).toLocaleDateString("en-GB")}</p>
        </td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <Link
            href={`/admin/dashboard/user/userDetails/${user._id}`}
            target="_blank"
            className="text-indigo-600 hover:text-indigo-900"
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
          data={user}
          fields={fields}
          menuItem={menuItem}
          onClose={closeEditModal}
          onSave={saveEditedData}
        />
      )}

      {isViewModalOpen && (
        <ViewDetailsModal data={user} onClose={closeViewModel} />
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
