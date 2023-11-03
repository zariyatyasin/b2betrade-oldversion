// components/RequestProductForm.js
"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { categoriesAndSub } from "../../data/CategoriesAndSub";
import * as Yup from "yup";
import axios from "axios";
import SingularSelect from "../../components/selects/SingularSelect";
import MultipleSelect from "../../components/selects/MultipleSelect";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Grid } from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
const initialValues = {
  productName: "",
  quantity: "",
  description: "",
  budget: "",
  deliveryDate: "",
  location: "",
  isUrgent: false,
  preferredBrand: "",
  preferredColor: "",
  paymentMethod: "",
  contactNumber: "",
  additionalRequirements: "",
  category: "",
  subCategories: [],
  images: [],
  shippingAddress: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
  isApproved: false,
  isFulfilled: false,
  isRecurring: false,
  isCustomizable: false,
  preferredMaterial: "",
  requiredCertification: "",
  specialInstructions: "",
  isPaid: false,
  paymentReference: "",
  isBargainAllowed: false,
  isSampleRequested: false,
  supplierExperience: "",
  targetPrice: "",
  estimatedOrderFrequency: "",
  attachmentUrls: [],
};

const RequestProductForm = ({ session, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subs, setSubs] = useState([]);
  const [product, setProduct] = useState(initialValues);
  const validationSchema = Yup.object({
    productName: Yup.string().required("Product Name is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be at least 1"),
    // tags: Yup.array()
    //   .min(1, "Select at least one tag")
    //   .required("Tags are required"),
    // description: Yup.string(),
    // budget: Yup.number(),
    // deliveryDate: Yup.date(),
    // location: Yup.string(),
    // isUrgent: Yup.boolean(),
    // preferredBrand: Yup.string(),
    // preferredColor: Yup.string(),
    // paymentMethod: Yup.string(),
    // contactNumber: Yup.string(),
    // additionalRequirements: Yup.string(),
    // tags: Yup.array().of(Yup.string()),
    // images: Yup.array().of(Yup.string()),
    // shippingAddress: Yup.object({
    //   street: Yup.string(),
    //   city: Yup.string(),
    //   state: Yup.string(),
    //   postalCode: Yup.string(),
    //   country: Yup.string(),
    // }),
    // isApproved: Yup.boolean(),
    // isFulfilled: Yup.boolean(),
    // isRecurring: Yup.boolean(),
    // isCustomizable: Yup.boolean(),
    // preferredMaterial: Yup.string(),
    // requiredCertification: Yup.string(),
    // specialInstructions: Yup.string(),
    // isPaid: Yup.boolean(),
    // paymentReference: Yup.string(),
    // isBargainAllowed: Yup.boolean(),
    // isSampleRequested: Yup.boolean(),
    // supplierExperience: Yup.string(),
    // targetPrice: Yup.number(),
    // estimatedOrderFrequency: Yup.string(),
    // attachmentUrls: Yup.array().of(Yup.string()),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      values.userId = session.id;
      const response = await axios.post(
        "http://localhost:3000/api/productrequest",
        values
      );

      if (response.status === 200) {
        console.log("Request successful:", response.data);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error making API request:", error);
    }

    // Update the product state and setSubmitting as needed
    setProduct(values);
    setSubmitting(false);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  useEffect(() => {
    async function getSubs() {
      if (product.category) {
        try {
          const { data } = await axios.get(
            `/api/admin/subcategory/${product.category}`
          );
          setSubs(data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      }
    }
    getSubs();
  }, [product.category]);
  return (
    <div className="px-4  sm:px-6 lg:px-8">
      <div className=" max-w-7xl mx-auto mt-8 ">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Request a Post
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <Formik
        initialValues={product}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form className=" my-8 max-w-6xl mx-auto  ">
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
                    htmlFor="location"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Location
                  </label>
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="isUrgent"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Is Urgent
                  </label>
                  <Field
                    type="checkbox"
                    id="isUrgent"
                    name="isUrgent"
                    className="mr-2"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="preferredBrand"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Preferred Brand
                  </label>
                  <Field
                    type="text"
                    id="preferredBrand"
                    name="preferredBrand"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="preferredBrand"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="preferredColor"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Preferred Color
                  </label>
                  <Field
                    type="text"
                    id="preferredColor"
                    name="preferredColor"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="preferredColor"
                    component="div"
                    className="text-red-500"
                  />
                </div>{" "}
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Payment Method
                  </label>
                  <Field
                    type="text"
                    id="paymentMethod"
                    name="paymentMethod"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="paymentMethod"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Contact Number
                  </label>
                  <Field
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="contactNumber"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="additionalRequirements"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Additional Requirements
                  </label>
                  <Field
                    as="textarea"
                    id="additionalRequirements"
                    name="additionalRequirements"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="additionalRequirements"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <SingularSelect
                  name="category"
                  value={values.category}
                  placeholder="Category"
                  data={categories}
                  header="Select a Category"
                  handleChange={(e) => {
                    handleChange(e);
                    setFieldValue("category", e.target.value); // Make sure to set the field value in Formik
                  }}
                  disabled={values.parent}
                />
              </Grid>
              <Grid item xs={6}>
                {values.category && (
                  <MultipleSelect
                    value={values.subCategories}
                    data={subs}
                    header="Select SubCategories"
                    name="subCategories"
                    disabled={values.parent}
                    handleChange={(e) => {
                      handleChange(e);
                      setFieldValue("subCategories", e.target.value); // Make sure to set the field value in Formik
                    }}
                  />
                )}
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="images"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Images (comma-separated URLs)
                  </label>
                  <Field
                    type="text"
                    id="images"
                    name="images"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>

              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="isApproved"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Is Approved
                  </label>
                  <Field
                    type="checkbox"
                    id="isApproved"
                    name="isApproved"
                    className="mr-2"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="isFulfilled"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Is Fulfilled
                  </label>
                  <Field
                    type="checkbox"
                    id="isFulfilled"
                    name="isFulfilled"
                    className="mr-2"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="isRecurring"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Is Recurring
                  </label>
                  <Field
                    type="checkbox"
                    id="isRecurring"
                    name="isRecurring"
                    className="mr-2"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="isCustomizable"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Is Customizable
                  </label>
                  <Field
                    type="checkbox"
                    id="isCustomizable"
                    name="isCustomizable"
                    className="mr-2"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="preferredMaterial"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Preferred Material
                  </label>
                  <Field
                    type="text"
                    id="preferredMaterial"
                    name="preferredMaterial"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="preferredMaterial"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="requiredCertification"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Required Certification
                  </label>
                  <Field
                    type="text"
                    id="requiredCertification"
                    name="requiredCertification"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="requiredCertification"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="specialInstructions"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Special Instructions
                  </label>
                  <Field
                    as="textarea"
                    id="specialInstructions"
                    name="specialInstructions"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="specialInstructions"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="isPaid"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Is Paid
                  </label>
                  <Field
                    type="checkbox"
                    id="isPaid"
                    name="isPaid"
                    className="mr-2"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="paymentReference"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Payment Reference
                  </label>
                  <Field
                    type="text"
                    id="paymentReference"
                    name="paymentReference"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="paymentReference"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="isBargainAllowed"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Is Bargain Allowed
                  </label>
                  <Field
                    type="checkbox"
                    id="isBargainAllowed"
                    name="isBargainAllowed"
                    className="mr-2"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="isSampleRequested"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Is Sample Requested
                  </label>
                  <Field
                    type="checkbox"
                    id="isSampleRequested"
                    name="isSampleRequested"
                    className="mr-2"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="supplierExperience"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Supplier Experience
                  </label>
                  <Field
                    type="text"
                    id="supplierExperience"
                    name="supplierExperience"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="supplierExperience"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="targetPrice"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Target Price
                  </label>
                  <Field
                    type="number"
                    id="targetPrice"
                    name="targetPrice"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="targetPrice"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    htmlFor="estimatedOrderFrequency"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Estimated Order Frequency
                  </label>
                  <Field
                    type="text"
                    id="estimatedOrderFrequency"
                    name="estimatedOrderFrequency"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="estimatedOrderFrequency"
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
        )}
      </Formik>
    </div>
  );
};

export default RequestProductForm;
