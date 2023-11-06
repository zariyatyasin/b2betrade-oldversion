import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { categoriesAndSub } from "../../data/CategoriesAndSub";
import SingularSelect from "../selects/SingularSelect";
import MultipleSelect from "../selects/MultipleSelect";
import * as Yup from "yup";
import axios from "axios";
function B2bRegistration({ categories }) {
  const initialValues = {
    productName: "",
    quantity: "",
    description: "",
    category: "",
    subCategories: [],
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    about: Yup.string().required("About is required"),
    // Add other validation rules for your fields here
    // ...
  });

  const [values, setValues] = useState(initialValues);
  const [subs, setSubs] = useState([]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (values, { setSubmitting }) => {};
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
      onSubmit={handleChange}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <Form className="space-y-8 divide-y divide-gray-200">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <Field
                type="text"
                name="companyName"
                id="companyName"
                autoComplete="companyName"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="companyName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="username"
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
            </div>

            {/* <div className="sm:col-span-2">
              <label
                htmlFor="selectedSubcategory"
                className="block text-sm font-medium text-gray-700"
              >
                Select Subcategory
              </label>
              <Field
                as="select"
                name="selectedSubcategory"
                id="selectedSubcategory"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 sm:text-sm border-gray-300"
              >
                <option value="">Select Subcategory</option>
                {values.selectedCategory &&
                  categoriesAndSub
                    .find(
                      (category) => category.name === values.selectedCategory
                    )
                    .subcategories.map((subcategory, index) => (
                      <option key={index} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
              </Field>
            </div> */}
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <div className="mt-1 flex items-center">
                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Years you start the Buniness
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <Field
                as="textarea"
                id="about"
                name="about"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="about"
                component="div"
                className="text-red-500 text-sm"
              />
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p>
            </div>

            {/* Add the rest of your form fields */}
            {/* ... */}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default B2bRegistration;
