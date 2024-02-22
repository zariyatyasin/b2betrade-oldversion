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
    console.log(subProducts);
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
  console.log(errors, product.description, product.name);
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
    console.log(errors);
    if (!validateForm()) {
      toast.error(errors);
      return;
    }

    const updatedSubProducts = [];

    setLoading(true);
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
            <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 lg:max-w-[1400px] lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-6 lg:col-start-1 lg:col-span-2 ">
                <div className="p-4">
                  {" "}
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={12}>
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
                    <Grid item xs={12} lg={6}>
                      <SingularSelect
                        name="section"
                        value={product.section}
                        placeholder="Feature Product type if any"
                        data={section}
                        header="Feature Product type if any"
                        handleChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <SingularSelect
                        name="productvisibility"
                        value={product.productvisibility}
                        placeholder="Visibility"
                        data={visibility}
                        header="Visibility"
                        handleChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      {" "}
                      <AdminInput
                        type="text"
                        label="Brand"
                        name="brand"
                        placholder="Product brand"
                        onChange={handleChange}
                      />
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

                    <Grid item xs={12} lg={6}>
                      <AdminInput
                        type="text"
                        label="Shipping Free"
                        name="shipping"
                        placholder="Shipping Free"
                        onChange={handleChange}
                      />
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

                    <Grid item xs={12} lg={12}>
                      <InputLabel>Same Price for All Products</InputLabel>
                      <Select
                        value={samePriceForAll}
                        onChange={(e) => setSamePriceForAll(e.target.value)}
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </Grid>

                    {samePriceForAll && (
                      <Grid item xs={12} lg={12}>
                        <MaxminPrice
                          bulkPricing={product.bulkPricing}
                          product={product}
                          setProduct={setProduct}
                        />
                      </Grid>
                    )}

                    <Grid item xs={12} lg={12}>
                      {" "}
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
                      {" "}
                      <Details
                        details={product.details}
                        product={product}
                        setProduct={setProduct}
                      />
                    </Grid>

                    <Grid item xs={12} lg={12}>
                      {" "}
                      <Questions
                        questions={product.questions}
                        product={product}
                        setProduct={setProduct}
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>

              <section
                aria-labelledby="timeline-title"
                className="lg:col-start-3 lg:col-span-1"
              >
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                  <Grid item xs={12} lg={6}>
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

                  <Grid item xs={12} lg={6}>
                    {
                      <MultipleSelect
                        value={product.subCategories}
                        data={subs}
                        header="Select SubCategories"
                        name="subCategories"
                        disabled={product.parent}
                        handleChange={handleChange}
                      />
                    }{" "}
                    {errors.subCategories && (
                      <span className="text-red-500">
                        {errors.subCategories}
                      </span>
                    )}
                  </Grid>
                </div>
              </section>
            </div>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
