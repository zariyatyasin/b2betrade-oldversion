"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SureConfirmationModal from "../../modelUi/SureConfirmationModal";
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("  Required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required(" required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required(" required"),
});

const ChangePassword = ({ user }) => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const onSubmit = (values) => {
    // Handle form submission, e.g., update user data
    console.log("Form submitted with values:", values);

    if (dirty) {
      setIsConfirmationModalOpen(true);
    } else {
      // Handle case where there are no changes
      // For example, show a message to the user that there are no changes
    }
  };
  const handleConfirm = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <section aria-labelledby="payment-details-heading mt-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ dirty }) => (
          <Form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 sm:p-6">
                <div>
                  <h2
                    id="payment-details-heading"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Change Password
                  </h2>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-6">
                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="oldPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Old Password
                    </label>
                    <Field
                      type="password"
                      id="oldPassword"
                      name="oldPassword"
                      autoComplete="current-password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                    <ErrorMessage
                      name="oldPassword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <Field
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      autoComplete="new-password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  onClick={() => setIsConfirmationModalOpen(true)}
                  disabled={!dirty}
                  className={` ${
                    !dirty ? " bg-gray-300" : "bg-[#2B39D1]"
                  } border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white  `}
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <SureConfirmationModal
        open={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </section>
  );
};

export default ChangePassword;
