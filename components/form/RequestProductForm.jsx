// components/RequestProductForm.js
"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import SearchSelect from "../selects/SearchSelect";
import Images from "../../components/productPage/reviews/Images";
import * as Yup from "yup";
import axios from "axios";
import SingularSelect from "../../components/selects/SingularSelect";
import MultipleSelect from "../../components/selects/MultipleSelect";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import UploadImagesClould from "../../utils/UploadImagesClould";
import FullScreenLoading from "../fullScreenOverlay/FullScreenLoading";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
  paymentMethod: "Cash On Delivery",
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
  // isApproved: false,
  // isFulfilled: false,
  // isRecurring: false,
  // isCustomizable: false,
  // preferredMaterial: "",
  // requiredCertification: "",
  // specialInstructions: "",
  // isPaid: false,
  // paymentReference: "",
  // isBargainAllowed: false,
  // isSampleRequested: false,
  // supplierExperience: "",
  // targetPrice: "",
  // estimatedOrderFrequency: "",
  // attachmentUrls: [],
};
const bangladeshCities = [
  { id: 1, name: "Dhaka" },
  { id: 2, name: "Chittagong" },
  { id: 3, name: "Sylhet" },
  { id: 4, name: "Rajshahi" },
  { id: 5, name: "Khulna" },
  { id: 6, name: "Barisal" },
  { id: 7, name: "Rangpur" },
  { id: 8, name: "Mymensingh" },
  { id: 9, name: "Comilla" },
  { id: 10, name: "Narayanganj" },
  { id: 11, name: "Gazipur" },
  { id: 12, name: "Tangail" },
  { id: 13, name: "Jamalpur" },
  { id: 14, name: "Bogra" },
  { id: 15, name: "Dinajpur" },
  { id: 16, name: "Saidpur" },
  { id: 17, name: "Kushtia" },
  { id: 18, name: "Jessore" },
  { id: 19, name: "Naogaon" },
  { id: 20, name: "Sirajganj" },
  { id: 21, name: "Pabna" },
  { id: 22, name: "Bhola" },
  { id: 23, name: "Narail" },
  { id: 24, name: "Satkhira" },
  { id: 25, name: "Madaripur" },
  { id: 26, name: "Faridpur" },
  { id: 27, name: "Gopalganj" },
  { id: 28, name: "Shariatpur" },
  { id: 29, name: "Manikganj" },
  { id: 30, name: "Munshiganj" },
  { id: 31, name: "Netrakona" },
  { id: 32, name: "Sherpur" },
  { id: 33, name: "Moulvibazar" },
  { id: 34, name: "Sunamganj" },
  { id: 35, name: "Habiganj" },
  { id: 36, name: "Brahmanbaria" },
  { id: 37, name: "Chandpur" },
  { id: 38, name: "Lakshmipur" },
  { id: 39, name: "Feni" },
  { id: 40, name: "Noakhali" },
  { id: 41, name: "Pirojpur" },
  { id: 42, name: "Patuakhali" },
  { id: 43, name: "Cox's Bazar" },
  { id: 44, name: "Bandarban" },
  { id: 45, name: "Khagrachari" },
  { id: 46, name: "Rangamati" },
];

const RequestProductForm = ({ session, categories }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subs, setSubs] = useState([]);
  const router = useRouter();
  const [images, setImages] = useState([]);

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
      setLoading(true);
      const uploadedImages = await UploadImagesClould(images);
      console.log(uploadedImages);
      values.userId = session.id;
      values.images = uploadedImages;
      const response = await axios.post("/api/productrequest", values);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push(`/buyerrequest/details/${response.data.saveRequest._id}`);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
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
          setLoading(true);
          const { data } = await axios.get(
            `/api/admin/subcategory/${product.category}`
          );
          setSubs(data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    getSubs();
  }, [product.category]);
  return (
    <div className="p-4 px-4 md:px-6 lg:px-8 2xl:px-10 max-w-7xl mt-36 flex flex-col lg:flex-row gap-x-6  ">
      {loading && <FullScreenLoading />}

      <div className=" lg:mt-8">
        <h3 className="text-3xl font-bold leading-6 text-gray-800">
          Post Your Request
        </h3>
        <p className="mt-3 max-w-2xl text-sm text-gray-500">
          Looking for a specific product? Post your request below and let
          sellers bid on providing you with the best offer.
        </p>
      </div>

      <Formik
        initialValues={product}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form className=" max-w-2xl  my-8  bg-white p-4   shadow rounded-md   ">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-gray-700  mb-2"
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
              <Grid item xs={12} md={12}>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-700  mb-2"
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
              <Grid item xs={6} md={4}>
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-gray-700  mb-2"
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
              <Grid item xs={6} md={4}>
                <div>
                  <label htmlFor="budget" className="block text-gray-700  mb-2">
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

              <Grid item xs={6} md={4}>
                <div>
                  <label
                    htmlFor="deliveryDate"
                    className="block text-gray-700  mb-2"
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

              {/* <Grid item xs={12} md={12}>
                <div>
                  <label
                    htmlFor="shippingAddress.city"
                    className="block text-gray-700 mb-2"
                  >
                    Delivery Location
                  </label>
                  <SearchSelect
                    value={
                      values.shippingAddress.city
                        ? { name: values.shippingAddress.city }
                        : null
                    }
                    data={bangladeshCities}
                    onChange={(selectedOption) =>
                      setFieldValue(
                        "shippingAddress.city",
                        selectedOption?.name || ""
                      )
                    }
                  />
                  <ErrorMessage
                    name="shippingAddress.city"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid> */}
              {/* 
              <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="preferredBrand"
                    className="block text-gray-700  mb-2"
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
              <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="preferredColor"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              <Grid item xs={12} md={4}>
                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="block text-gray-700  mb-2"
                  >
                    Payment Method
                  </label>
                  <Field
                    type="text"
                    id="paymentMethod"
                    name="paymentMethod"
                    placeholder="Cash On Delivery"
                    disabled
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="paymentMethod"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={8}>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-gray-700  mb-2"
                  >
                    Delivery Address
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

              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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

              <Grid item xs={12} md={6}>
                <Images images={images} setImages={setImages} imageAllow={5} />
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="isApproved"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="isFulfilled"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="isRecurring"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="isCustomizable"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="preferredMaterial"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="requiredCertification"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="specialInstructions"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label htmlFor="isPaid" className="block text-gray-700  mb-2">
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
              <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="paymentReference"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="isBargainAllowed"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="additionalRequirements"
                    className="block text-gray-700  mb-2"
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
              <Grid item xs={6} md={3}>
                <div>
                  <label
                    htmlFor="isSampleRequested"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              <Grid item xs={12} md={12}>
                <div className=" flex items-center">
                  <label htmlFor="isUrgent" className="block text-gray-700 ">
                    Is Urgent
                  </label>
                  <Field
                    type="checkbox"
                    id="isUrgent"
                    name="isUrgent"
                    className="ml-2"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
                  />
                </div>
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="supplierExperience"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="targetPrice"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="estimatedOrderFrequency"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <div>
                  <label
                    htmlFor="attachmentUrls"
                    className="block text-gray-700  mb-2"
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
              </Grid> */}
            </Grid>
            <div className="flex mt-4   items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#2B39D1] hover:bg-[#2B39D1]   "
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
