// components/RequestProductForm.js
"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Grid } from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const SubmitForm = () => {
  const initialValues = {
    productName: "",
    quantity: "",
    description: "",
    budget: "",
    deliveryDate: "",
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required("Product Name is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be at least 1"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  return (
    <div>
      <div className=" max-w-7xl mx-auto mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Request a Post
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className=" my-8 max-w-6xl mx-auto ">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div>
                <label
                  htmlFor="productName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Product Name
                </label>
                <Field
                  type="text"
                  id="productName"
                  name="productName"
                  className="w-full border border-gray-300 rounded p-2"
                />
                <ErrorMessage
                  name="productName"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Quantity
                </label>
                <Field
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="w-full border border-gray-300 rounded p-2"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="w-full border border-gray-300 rounded p-2"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <label
                  htmlFor="budget"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Budget
                </label>
                <Field
                  type="number"
                  id="budget"
                  name="budget"
                  className="w-full border border-gray-300 rounded p-2"
                />
                <ErrorMessage
                  name="budget"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <label
                  htmlFor="deliveryDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Delivery Date
                </label>
                <Field
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  className="w-full border border-gray-300 rounded p-2"
                />
                <ErrorMessage
                  name="deliveryDate"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div>
                <label
                  htmlFor="attachmentUrls"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Attachment URLs (comma-separated)
                </label>
                <Field
                  type="text"
                  id="attachmentUrls"
                  name="attachmentUrls"
                  className="w-full border border-gray-300 rounded p-2"
                />
                <ErrorMessage
                  name="attachmentUrls"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </Grid>
          </Grid>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SubmitForm;
