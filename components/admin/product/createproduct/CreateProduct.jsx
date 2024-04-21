"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { div, Paper, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  Chip,
} from "@mui/material";
import CreateSubProduct from "./createSubProduct/CreateSubProduct";
import SingularSelect from "../../../selects/SingularSelect";
import MultipleSelect from "../../../selects/MultipleSelect";
import MaxminPrice from "./addToClick/MaxminPrice";
import Details from "./addToClick/Details";
import Questions from "./addToClick/Questions";
import AdminInput from "../../../selects/AdminPut";
import { Uploadimages } from "../../../../request/uploadimg";
import axios from "axios";
import FullScreenLoading from "../../../fullScreenOverlay/FullScreenLoading";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  shipping: 0,
  productvisibility: "visible",
  section: "regular",
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],

  details: [
    {
      name: "",
      value: "",
    },
  ],
  bulkPricing: [
    {
      minQty: 0,
      maxQty: 0,
      price: 0,
    },
  ],
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
};
export default function CreateProduct({ categories }) {
  const [product, setProduct] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState([]);
  const [images, setImages] = useState([]);
  const [samePriceForAll, setSamePriceForAll] = useState(true);
  const [editorHtml, setEditorHtml] = useState("");
  const [subProducts, setSubProducts] = useState([]);
  const [errors, setErrors] = useState({});

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],

      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const section = [
    {
      name: "big-deal",
    },
    {
      name: "featured",
    },
    {
      name: "new-arrival",
    },
    {
      name: "sale",
    },
    {
      name: "clearance",
    },
    {
      name: "bestseller",
    },
    {
      name: "limited-edition",
    },
    {
      name: "top-rated",
    },
    {
      name: "regular",
    },
  ];
  const visibility = [
    {
      name: "visible",
    },
    {
      name: "hidden",
    },
  ];

  const validateForm = () => {
    const errors = {};

    if (!product.name) {
      errors.name = "Name is required";
    }
    if (!product.description) {
      errors.description = "Description is required";
    }
    if (subProducts.length === 0) {
      errors.subProducts = " product is required";
    }
    if (product.subCategories.length === 0) {
      errors.subCategories = " subCategories is required";
    }
    if (!product.category) {
      errors.category = " category is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
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
          setLoading(false); // Stop loading
        }
      }
    }
    getSubs();
  }, [product.category]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSubmit = async () => {
    const errors = {};
    console.log(product, subProducts);
    if (!validateForm()) {
      toast.error(errors);
      return;
    }

    if (subProducts.length === 0) {
      errors.subProducts = "Subproduct is required";
    } else {
      let hasProductBulkPricing = false;
      let hasSubproductBulkPricing = false;

      if (
        product?.bulkPricing.length === 1 &&
        product?.bulkPricing[0]?.minQty === 0 &&
        product?.bulkPricing[0]?.maxQty === 0 &&
        product?.bulkPricing[0]?.price === 0
      ) {
        console.log("mewo is product bulk not here");
        hasProductBulkPricing = false;
      } else {
        hasProductBulkPricing = true;
      }

      subProducts.forEach((subProduct, index) => {
        if (subProduct.images.length === 0) {
          errors[`subProductImages-${index}`] = `Images for subproduct ${
            index + 1
          } are required`;
        } else {
          subProduct.sizes.forEach((size, sizeIndex) => {
            if (size.qty === 0) {
              errors[`Qty must be greater than 0`] = `Quantity for size ${
                sizeIndex + 1
              } of subproduct ${index + 1} must be greater than 0`;
            }
            if (
              size?.bulkPricing.length === 1 &&
              size?.bulkPricing[0]?.minQty === 0 &&
              size?.bulkPricing[0]?.maxQty === 0 &&
              size?.bulkPricing[0]?.price === 0
            ) {
              console.log("mewo is subprioduct bulk not here");
              hasSubproductBulkPricing = false;
            } else {
              hasSubproductBulkPricing = true;
            }
          });
        }
      });

      if (!hasProductBulkPricing && !hasSubproductBulkPricing) {
        errors.bulkPricingRequired =
          "Either product bulk pricing or subproduct bulk pricing should be filled.";
      } else if (hasProductBulkPricing && hasSubproductBulkPricing) {
        errors.bulkPricingConflict =
          "Either product bulk pricing or subproduct bulk pricing should be filled, but not both.";
      }
      // if (!hasProductBulkPricing || !hasSubproductBulkPricing) {
      //   console.log(hasProductBulkPricing, hasSubproductBulkPricing);
      //   errors.bulkPricingConflict =
      //     "Either product bulk pricing or subproduct bulk pricing should be filled ";
      // }
    }

    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      const errorMessage = Object.values(errors).join("\n");
      alert(errorMessage);
      console.error("Validation errors:", errors);
      return;
    }

    const updatedSubProducts = [];

    console.log(product, subProducts);

    // setLoading(true);
    // for (const subProduct of subProducts) {
    //   const formData = new FormData();
    //   const cloudinaryImages = [];
    //   for (const image of subProduct.images) {
    //     formData.append("file", image.blob);
    //     formData.append("upload_preset", "ml_default");
    //     formData.append("cloud_name", "dtasegoef");
    //     const cloudinaryResponse = await Uploadimages(formData);

    //     cloudinaryImages.push(cloudinaryResponse);
    //   }

    //   if (subProduct.color.image) {
    //     const colorFormData = new FormData();
    //     colorFormData.append(
    //       "file",
    //       new File([subProduct.color.image], "color_image.jpg", {
    //         type: "image/jpeg",
    //       })
    //     );
    //     colorFormData.append("upload_preset", "ml_default");
    //     colorFormData.append("cloud_name", "dtasegoef");
    //     const colorImageUpload = await Uploadimages(colorFormData);

    //     subProduct.color.image = colorImageUpload.secure_url;
    //   }

    //   updatedSubProducts.push({
    //     ...subProduct,
    //     images: cloudinaryImages,
    //   });
    // }

    // try {
    //   const { data } = await axios.post("/api/admin/product", {
    //     ...product,
    //     updatedSubProducts,
    //   });
    // } catch (error) {
    //   console.error("Error creating product:", error);
    //   toast.success(error);
    // } finally {
    //   toast.success("Product successfully created");

    //   setLoading(false);
    // }
  };

  return (
    <Box>
      {loading && <FullScreenLoading />}
      <Formik
        enableReinitialize
        initialValues={product}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className=" ">
            {/* <div className="mt-10   mx-auto  max-w-7xl  ">
              <div className="space-y-6 lg:col-start-1 lg:col-span-2 ">
                <div className="max-w-3xl mx-auto div div-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:div-flow-col-dense lg:div-cols-3   ">
                  <div
                    rowSpacing={8}
                    columnSpacing={8}
                    spacing={2}
                    className=" bg-white p-4 pb-8 rounded-md shadow"
                  >
                    <div item xs={12} lg={3}>
                      <AdminInput
                        type="text"
                        label="Name"
                        name="name"
                        placholder="Product name"
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <span className="text-red-500">{errors.name}</span>
                      )}
                    </div>
                    <div item xs={12} lg={3}>
                      <SingularSelect
                        name="section"
                        value={product.section}
                        placeholder="Product type"
                        data={section}
                        header="Product type"
                        handleChange={handleChange}
                      />
                    </div>
                    <div item xs={12} lg={3}>
                      <SingularSelect
                        name="productvisibility"
                        value={product.productvisibility}
                        placeholder="Visibility"
                        data={visibility}
                        header="Visibility"
                        handleChange={handleChange}
                      />
                    </div>
                    <div item xs={12} lg={3}>
                      <AdminInput
                        type="text"
                        label="Brand"
                        name="brand"
                        placholder="Product brand"
                        onChange={handleChange}
                      />
                    </div>
                    <div item xs={12} lg={3}>
                      <AdminInput
                        type="text"
                        label="Shipping Free"
                        name="shipping"
                        placholder="Shipping Free"
                        onChange={handleChange}
                      />
                    </div>
                    <div item xs={12} lg={3}>
                      <SingularSelect
                        name="category"
                        value={product.category}
                        placeholder="Category"
                        data={categories}
                        header="Select a Category"
                        handleChange={handleChange}
                        disabled={product.parent}
                      />
                      {errors.category && (
                        <span className="text-red-500">{errors.category}</span>
                      )}
                    </div>

                    <div item xs={12} lg={3}>
                      {
                        <MultipleSelect
                          value={product.subCategories}
                          data={subs}
                          header="Select SubCategories"
                          name="subCategories"
                          disabled={product.parent}
                          handleChange={handleChange}
                        />
                      }
                      {errors.subCategories && (
                        <span className="text-red-500">
                          {errors.subCategories}
                        </span>
                      )}
                    </div>

                    <div item xs={12} lg={12}>
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        style={{ height: "200px", paddingBottom: "30px" }}
                        formats={formats}
                        value={editorHtml}
                        onChange={(value) => {
                          setEditorHtml(value);
                          setProduct({ ...product, description: value });
                        }}
                        placeholder="Product description"
                        bounds=".app"
                        scrollingContainer=".app"
                      />
                      {errors.description && (
                        <span className="text-red-500">
                          {errors.description}
                        </span>
                      )}
                    </div>
                  

                    <div item xs={12} lg={12}>
                      <p className=" mt-10 mb-2">Same Price for All Products</p>
                      <Select
                        value={samePriceForAll}
                        onChange={(e) => setSamePriceForAll(e.target.value)}
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </div>

                    {samePriceForAll && (
                      <div
                        className=" bg-white rounded-md"
                        item
                        xs={12}
                        lg={12}
                      >
                        <MaxminPrice
                          bulkPricing={product.bulkPricing}
                          product={product}
                          setProduct={setProduct}
                        />
                      </div>
                    )}

                    <div item xs={12} lg={12}>
                      <CreateSubProduct
                        bulkPricing={product.bulkPricing}
                        product={product}
                        samePriceForAll={samePriceForAll}
                        setSubProducts={setSubProducts}
                        subProducts={subProducts}
                        setImages={setImages}
                        images={images}
                      />
                      {errors.subProducts && (
                        <span className="text-red-500">
                          {errors.subProducts}
                        </span>
                      )}
                    </div>

                    <div item xs={12} lg={12}>
                      <Details
                        details={product.details}
                        product={product}
                        setProduct={setProduct}
                      />
                    </div>

                    <div item xs={12} lg={12}>
                      <Questions
                        questions={product.questions}
                        product={product}
                        setProduct={setProduct}
                      />
                    </div>
                  </div>
                </div>
              </div>

              
            </div> */}

            <main className=" ">
              <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                  <div className="bg-white shadow sm:rounded-lg p-4 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-12 ">
                      <AdminInput
                        type="text"
                        label="Name"
                        name="name"
                        placholder="Product name"
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <span className="text-red-500">{errors.name}</span>
                      )}
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <SingularSelect
                        name="section"
                        value={product.section}
                        placeholder="Product type"
                        data={section}
                        header="Product type"
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <SingularSelect
                        name="productvisibility"
                        value={product.productvisibility}
                        placeholder="Visibility"
                        data={visibility}
                        header="Visibility"
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <AdminInput
                        type="text"
                        label="Brand"
                        name="brand"
                        placholder="Product brand"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <AdminInput
                        type="text"
                        label="Shipping Free"
                        name="shipping"
                        placholder="Shipping Free"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-12 ">
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        style={{ height: "200px", paddingBottom: "30px" }}
                        formats={formats}
                        value={editorHtml}
                        onChange={(value) => {
                          setEditorHtml(value);
                          setProduct({ ...product, description: value });
                        }}
                        placeholder="Product description"
                        bounds=".app"
                        scrollingContainer=".app"
                      />
                      {errors.description && (
                        <span className="text-red-500">
                          {errors.description}
                        </span>
                      )}
                    </div>
                    <div className="col-span-12 sm:col-span-12 ">
                      <p className=" mt-10 mb-2">Same Price for All Products</p>
                      <Select
                        value={samePriceForAll}
                        onChange={(e) => setSamePriceForAll(e.target.value)}
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </div>
                    {samePriceForAll && (
                      <div
                        className=" col-span-12 sm:col-span-12 "
                        item
                        xs={12}
                        lg={12}
                      >
                        <MaxminPrice
                          bulkPricing={product.bulkPricing}
                          product={product}
                          setProduct={setProduct}
                        />
                      </div>
                    )}
                  </div>

                  <div item xs={12} lg={12}>
                    <CreateSubProduct
                      bulkPricing={product.bulkPricing}
                      product={product}
                      samePriceForAll={samePriceForAll}
                      setSubProducts={setSubProducts}
                      subProducts={subProducts}
                      setImages={setImages}
                      images={images}
                    />
                    {errors.subProducts && (
                      <span className="text-red-500">{errors.subProducts}</span>
                    )}
                  </div>

                  <section aria-labelledby="notes-title">
                    <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden"></div>
                  </section>
                </div>

                <section
                  aria-labelledby="timeline-title"
                  className="lg:col-start-3 lg:col-span-1"
                >
                  <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <div item xs={12} lg={3}>
                      <SingularSelect
                        name="category"
                        value={product.category}
                        placeholder="Category"
                        data={categories}
                        header="Select a Category"
                        handleChange={handleChange}
                        disabled={product.parent}
                      />
                      {errors.category && (
                        <span className="text-red-500">{errors.category}</span>
                      )}
                    </div>

                    <div item xs={12} lg={3}>
                      {
                        <MultipleSelect
                          value={product.subCategories}
                          data={subs}
                          header="Select SubCategories"
                          name="subCategories"
                          disabled={product.parent}
                          handleChange={handleChange}
                        />
                      }
                      {errors.subCategories && (
                        <span className="text-red-500">
                          {errors.subCategories}
                        </span>
                      )}
                    </div>

                    <div className="mt-6 flex flex-col justify-stretch">
                      <button
                        onClick={handleSubmit}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Product Submit
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </Form>
        )}
      </Formik>
      {/* <button
        className="mt-2 inline-flex w-full text-center items-center px-8 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600  "
        onClick={handleSubmit}
      >
        Submit
      </button> */}
    </Box>
  );
}
