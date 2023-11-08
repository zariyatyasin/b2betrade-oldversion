import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import SingularSelect from "../selects/SingularSelect";
import MultipleSelect from "../selects/MultipleSelect";
import * as Yup from "yup";
import axios from "axios";
function B2bRegistration({ categories, userType }) {
  const role = [
    { _id: 1, name: "supplier" },
    { _id: 2, name: "manufacturer" },
    { _id: 3, name: "seller" },
    // ...
  ];

  const initialValues = {
    name: "",
    storeName: "",
    email: "",
    phoneNumber: "",
    password: "",
    category: "",
    subCategories: [],
    description: "",
    role: "",
    address: {
      street: "",
      city: "",

      country: "",
    },
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" You full Name is required"),
    storeName: Yup.string().required(" You full storeName is required"),
    phoneNumber: Yup.string().required(" You full phoneNumber is required"),
    password: Yup.string().required(" You full password is required"),
    category: Yup.string().required(" You full category is required"),

    // Add other validation rules for your fields here
    // ...
  });

  const [values, setValues] = useState(initialValues);
  const [subs, setSubs] = useState([]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/formrequest/b2bregistration",

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
    setValues(values);
  };
  useEffect(() => {
    async function getSubs() {
      if (values.category) {
        try {
          const { data } = await axios.get(
            `/api/admin/subcategory/${values.category}`
          );
          setSubs(data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      }
    }
    getSubs();
  }, [values.category]);
  return (
    <Formik
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <Form className="  mb-24">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 z-10 py-8">
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="storeName"
                className="block text-sm font-medium text-gray-700"
              >
                Your company/ Store Name
              </label>
              <Field
                type="text"
                name="storeName"
                id="storeName"
                autoComplete="storeName"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="storeName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <Field
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                autoComplete="phoneNumber"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Field
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="sm:col-span-2">
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
            </div>
            <div className="sm:col-span-2">
              {
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
              }
            </div>
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                What do you want to become?
              </label>
              <Field
                as="select"
                name="role"
                id="role"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 sm:text-sm border-gray-300"
              >
                <option value="supplier">Supplier</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="seller">Seller</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                type="text"
                name="password"
                id="password"
                autoComplete="password"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <Field
                type="text"
                name="address.country"
                id="address.country"
                autoComplete="address.country"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                city
              </label>
              <Field
                type="text"
                name="address.city"
                id="ddress.city"
                autoComplete="ddress.city"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          <div className=" ">
            <button
              type="submit"
              className=" px-2 py-4 bg-blue-600 text-white "
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default B2bRegistration;
