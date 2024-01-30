"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SureConfirmationModal from "../../modelUi/SureConfirmationModal";
import ChangePassword from "./ChangePassword";
import FullScreenLoading from "../../fullScreenOverlay/FullScreenLoading";
import axios from "axios";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string(),
});

const ProfileEdit = ({ data }) => {
  const [user, setuser] = useState(data);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: user.name || "",
    phoneNumber: user.phoneNumber || "",
    email: user.email || "",
  };

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState();
  const onSubmit = (values) => {
    setFormSubmitted(values);
  };
  const handleConfirm = async () => {
    setIsConfirmationModalOpen(false);

    try {
      setLoading(true);

      const response = await axios.put(
        `/api/user/update/${data._id}`,
        formSubmitted
      );

      if (response.status === 200) {
        setuser((prevuser) => ({
          ...prevuser,
          ...response.data.newUpdateduser,
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

  return (
    <section
      aria-labelledby="payment-details-heading"
      className=" pb-14 lg:pb-0"
    >
      {loading && <FullScreenLoading />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ dirty }) => (
          <Form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden mb-5">
              <div className="bg-white py-6 px-4 sm:p-6">
                <div>
                  <h2
                    id="payment-details-heading"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Edit Profile
                  </h2>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-6">
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      autoComplete="tel"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      autoComplete="div"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* ... Other form fields ... */}
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  onClick={() => setIsConfirmationModalOpen(true)}
                  disabled={!dirty}
                  className={`${
                    !dirty ? " bg-gray-300" : "bg-[#2B39D1]"
                  } border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white`}
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ChangePassword data={data} />
      <SureConfirmationModal
        open={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </section>
  );
};

export default ProfileEdit;
