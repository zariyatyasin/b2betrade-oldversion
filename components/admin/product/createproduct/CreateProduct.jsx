"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Grid, Paper, Typography } from "@mui/material";
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
      minQty: "",
      maxQty: "",
      price: "",
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

    if (!validateForm()) {
      toast.error(errors);
      return;
    }

    if (subProducts.length === 0) {
      errors.subProducts = "Subproduct is required";
    } else {
      let hasProductBulkPricing = false;
      subProducts.forEach((subProduct, index) => {
        if (subProduct.images.length === 0) {
          errors[`subProductImages-${index}`] = `Images for subproduct ${
            index + 1
          } are required`;
        } else {
          subProducts.forEach((subProduct, index) => {
            if (subProduct.images.length === 0) {
              errors[`subProductImages-${index}`] = `Images for subproduct ${
                index + 1
              } are required`;
            } else {
              let hasProductBulkPricing = false;

              subProduct.sizes.forEach((size, sizeIndex) => {
                if (size.qty === 0) {
                  errors[`Qty must be greater than 0`] = `Quantity for size ${
                    sizeIndex + 1
                  } of subproduct ${index + 1} must be greater than 0`;
                }
                if (
                  size.bulkPricing.length === 0 ||
                  (size.bulkPricing.length === 1 &&
                    size.bulkPricing[0].minQty === 0 &&
                    size.bulkPricing[0].maxQty === 0 &&
                    size.bulkPricing[0].price === 0 &&
                    !hasProductBulkPricing)
                ) {
                  errors[
                    `subProductSizeBulkPricing-${index}-${sizeIndex}`
                  ] = `Bulk pricing for size ${sizeIndex + 1} of subproduct ${
                    index + 1
                  } is required`;
                } else {
                  hasProductBulkPricing = true;
                }
              });
            }
          });
          if (
            (product.bulkPricing.minQty !== "" ||
              product.bulkPricing.maxQty !== "" ||
              product.bulkPricing.price !== "") &&
            hasProductBulkPricing
          ) {
            errors.bulkPricingConflict =
              "Either product bulk pricing or subproduct bulk pricing can be filled, but not both";
          }
        }
      });
    }

    // Set errors and display alert messages
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
            <h1 className="font-semibold tracking-tight text-2xl">
              Create Product
            </h1>
            <div className="mt-8   mx-auto  max-w-7xl  ">
              <div className="space-y-6 lg:col-start-1 lg:col-span-2 ">
                <div className="   ">
                  <Grid
                    container
                    spacing={2}
                    className=" bg-white p-4 pb-8 rounded-md shadow"
                  >
                    <Grid item xs={12} lg={6}>
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
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <SingularSelect
                        name="section"
                        value={product.section}
                        placeholder="Product type"
                        data={section}
                        header="Product type"
                        handleChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <SingularSelect
                        name="productvisibility"
                        value={product.productvisibility}
                        placeholder="Visibility"
                        data={visibility}
                        header="Visibility"
                        handleChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <AdminInput
                        type="text"
                        label="Brand"
                        name="brand"
                        placholder="Product brand"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <AdminInput
                        type="text"
                        label="Shipping Free"
                        name="shipping"
                        placholder="Shipping Free"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} lg={3}>
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
                    </Grid>

                    <Grid item xs={12} lg={3}>
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
                    </Grid>

                    <Grid item xs={12} lg={12}>
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
                        placeholder="Type something..."
                        bounds=".app"
                        scrollingContainer=".app"
                      />
                      {errors.description && (
                        <span className="text-red-500">
                          {errors.description}
                        </span>
                      )}
                    </Grid>
                    {/* <Grid item xs={12} lg={6}>
                      <AdminInput
                        type="text"
                        label="Sku"
                        name="sku"
                        placholder="Product sku/ number"
                        onChange={handleChange}
                      />
                    </Grid> */}

                    <Grid item xs={12} lg={12}>
                      <p className=" mt-10 mb-2">Same Price for All Products</p>
                      <Select
                        value={samePriceForAll}
                        onChange={(e) => setSamePriceForAll(e.target.value)}
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </Grid>

                    {samePriceForAll && (
                      <Grid
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
                      </Grid>
                    )}

                    <Grid item xs={12} lg={12}>
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
                    </Grid>

                    <Grid item xs={12} lg={12}>
                      <Details
                        details={product.details}
                        product={product}
                        setProduct={setProduct}
                      />
                    </Grid>

                    <Grid item xs={12} lg={12}>
                      <Questions
                        questions={product.questions}
                        product={product}
                        setProduct={setProduct}
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>

              {/* <section
                aria-labelledby="timeline-title"
                className="lg:col-start-3 lg:col-span-1"
              >
              
              </section> */}
            </div>
          </Form>
        )}
      </Formik>
      <button
        className="mt-2 inline-flex w-full text-center items-center px-8 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600  "
        onClick={handleSubmit}
      >
        Submit
      </button>
    </Box>
  );
}
