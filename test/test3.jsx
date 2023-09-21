"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
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
import Details from "./addToClick/Details";
import Questions from "./addToClick/Questions";
import AdminInput from "../../../selects/AdminPut";
import { Uploadimages } from "../../../../request/uploadimg";
import axios from "axios";
const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,

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
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
  shippingFee: "",
};
export default function CreateProduct({ parents, categories }) {
  const [product, setProduct] = useState(initialState);

  const [subs, setSubs] = useState([]);
  const [images, setImages] = useState([]);

  const [subProducts, setSubProducts] = useState([]);
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
  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSubmit = async () => {
    const updatedSubProducts = [];

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

      const updatedImages = subProduct.images.concat(cloudinaryImages);

      updatedSubProducts.push({ ...subProduct, images: updatedImages });
    }

    console.log({ ...product, updatedSubProducts });

    try {
      const { data } = await axios.post("/api/admin/product", {
        ...product,
        updatedSubProducts,
      });
      console.log("Product created successfully:", data);
    } catch (error) {
      console.error("Error creating product:", error);
    }

    // Reset subProducts state
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(10, "Product name must be between 10 and 300 characters.")
      .max(300, "Product name must be between 10 and 300 characters."),
    brand: Yup.string().required("Please add a brand"),
    category: Yup.string().required("Please select a category."),
    sku: Yup.string().required("Please add an SKU/number"),

    description: Yup.string().required("Please add a description"),
  });
  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={product}
        validationSchema={validate}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className=" ">
            <h1>Create Product</h1>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placholder="Product name"
              onChange={handleChange}
            />
            <SingularSelect
              name="category"
              value={product.category}
              placeholder="Category"
              data={categories}
              header="Select a Category"
              handleChange={handleChange}
              disabled={product.parent}
            />
            {product.category && (
              <MultipleSelect
                value={product.subCategories}
                data={subs}
                header="Select SubCategories"
                name="subCategories"
                disabled={product.parent}
                handleChange={handleChange}
              />
            )}
            <AdminInput
              type="text"
              label="Description"
              name="description"
              placholder="Product description"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Brand"
              name="brand"
              placholder="Product brand"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Sku"
              name="sku"
              placholder="Product sku/ number"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Discount"
              name="discount"
              placholder="Product discount"
              onChange={handleChange}
            />
            <CreateSubProduct
              setSubProducts={setSubProducts}
              subProducts={subProducts}
              setImages={setImages}
              images={images}
            />
            <Details
              details={product.details}
              product={product}
              setProduct={setProduct}
            />{" "}
            <Questions
              questions={product.questions}
              product={product}
              setProduct={setProduct}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
