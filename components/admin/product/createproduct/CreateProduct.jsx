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
  // const handleImageUpload = (file) => {
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   // Replace 'YOUR_UPLOAD_URL' with your actual image upload endpoint
  //   return axios.post("YOUR_UPLOAD_URL", formData).then((response) => {
  //     // Replace 'YOUR_CLOUDINARY_URL' with your actual Cloudinary URL
  //     return response.data.url || "YOUR_CLOUDINARY_URL";
  //   });
  // };
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

  const [subProducts, setSubProducts] = useState([]);
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
    const updatedSubProducts = [];

    setLoading(true);
    for (const subProduct of subProducts) {
      const formData = new FormData();

      for (const image of subProduct.images) {
        formData.append("file", image.blob);
      }

      const cloudinaryResponse = await Uploadimages(formData);

      const cloudinaryImages = cloudinaryResponse.map((response) => ({
        url: response.secure_url,
        secure_url: response.secure_url,
        public_id: response.public_id,
      }));

      if (subProduct.color.image) {
        const colorFormData = new FormData();
        colorFormData.append(
          "file",
          new File([subProduct.color.image], "color_image.jpg", {
            type: "image/jpeg",
          })
        );

        const colorImageUpload = await Uploadimages(colorFormData);

        subProduct.color.image = colorImageUpload[0].secure_url;
      }

      updatedSubProducts.push({
        ...subProduct,
        images: cloudinaryImages,
      });
    }

    try {
      const { data } = await axios.post("/api/admin/product", {
        ...product,
        updatedSubProducts,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      toast.success(error);
    } finally {
      toast.success("Product successfully created");

      setLoading(false);
    }
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must be between 10 and 300 characters.")
      .max(300, "Product name must be between 10 and 300 characters.")
      .matches(
        /^[^\(\)\[\]@{}$#]+$/,
        "Name cannot contain @, {}, $, #, (), [] symbols"
      ),
    brand: Yup.string().required("Please add a brand"),
    category: Yup.string().required("Please select a category."),
    // sku: Yup.string().required("Please add an SKU/number"),

    description: Yup.string().required("Please add a description"),
  });
  return (
    <Box>
      {loading && <FullScreenLoading />}
      <Formik
        enableReinitialize
        initialValues={product}
        validationSchema={validate}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className=" ">
            <h1 className="font-semibold tracking-tight text-2xl">
              Create Product
            </h1>
            <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 lg:max-w-[1400px] lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-6 lg:col-start-1 lg:col-span-2 ">
                <Paper className="p-4">
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
                    <Grid item xs={12} lg={6}>
                      <AdminInput
                        type="text"
                        label="Sku"
                        name="sku"
                        placholder="Product sku/ number"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <AdminInput
                        type="text"
                        label="Shipping Free"
                        name="shipping"
                        placholder="Shipping Free"
                        onChange={handleChange}
                      />
                    </Grid>
                    {/* <Grid item xs={12} lg={12}>  <AdminInput
              type="text"
              label="Description"
              name="description"
              placholder="Product description"
              onChange={handleChange}
            /></Grid> */}
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
                </Paper>
              </div>

              <section
                aria-labelledby="timeline-title"
                className="lg:col-start-3 lg:col-span-1"
              >
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                  <Grid item xs={12} lg={6}>
                    {" "}
                    <SingularSelect
                      name="category"
                      value={product.category}
                      placeholder="Category"
                      data={categories}
                      header="Select a Category"
                      handleChange={handleChange}
                      disabled={product.parent}
                    />
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    {" "}
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
