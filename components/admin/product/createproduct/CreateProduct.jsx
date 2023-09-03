"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SingularSelect from "@/components/selects/SingularSelect";
import MultipleSelect from "@/components/selects/MultipleSelect";
import AdminInput from "@/components/selects/AdminPut";
import DialogModal from "@/components/dilogModel/DialogModal";
import { useDispatch } from "react-redux";
import { showDialog } from "@/store/DialogSlice";
import CreateProductImage from "./CreateProductImage";
import AddImageColor from "./AddImageColor";
import AddProductStyle from "./AddProductStyle";
import Sizes from "./addToClick/size";
import Details from "./addToClick/Details";
import Questions from "./addToClick/Questions";

const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: {
    color: "",
    image: "",
  },
  sizes: [
    {
      size: "",
      qty: "",
      price: "",
    },
  ],
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
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState([]);
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getParentData = async () => {
      try {
        const { data } = await axios.get(`/api/product/${product.parent}`);
        if (data) {
          setProduct((prevProduct) => ({
            ...initialState,
            ...prevProduct,
            ...data,
            questions: [],
            details: [],
          }));
        }
      } catch (error) {
        console.error("Error fetching parent data:", error);
      }
    };
    getParentData();
  }, [product.parent]);

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

  const createProduct = async () => {
    console.log(product);
    // Implement your createProduct logic here
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
    <div>
      <Formik
        enableReinitialize
        initialValues={product}
        validationSchema={validate}
        onSubmit={createProduct}
      >
        {(formik) => (
          <Form>
            <CreateProductImage
              name="imageInputFile"
              header="Product Carousel Images"
              text="Add images"
              images={images}
              setImages={setImages}
              setColorImage={setColorImage}
            />

            <div className="">
              {product.color.image && (
                <img
                  src={product.color.image}
                  className={"h-24 w-24 mt-5"}
                  alt=""
                />
              )}
              {product.color.color && (
                <div
                  className={" h-8 w-8 rounded-full"}
                  style={{ backgroundColor: `${product.color.color}` }}
                ></div>
              )}
              <AddImageColor
                name="color"
                product={product}
                setProduct={setProduct}
                colorImage={colorImage}
              />
              <AddProductStyle
                name="styleInput"
                product={product}
                setProduct={setProduct}
                colorImage={colorImage}
              />
              <SingularSelect
                name="parent"
                value={product.parent}
                placeholder="Parent product"
                data={parents}
                header="Add to an existing product"
                handleChange={handleChange}
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
              <div>
                <AdminInput
                  type="text"
                  label="Name"
                  name="name"
                  placholder="Product name"
                  onChange={handleChange}
                />
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
                <Sizes
                  sizes={product.sizes}
                  product={product}
                  setProduct={setProduct}
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
                {/*
            <Images
              name="imageDescInputFile"
              header="Product Description Images"
              text="Add images"
              images={description_images}
              setImages={setDescriptionImages}
              setColorImage={setColorImage}
            />
           
       
          
            */}
              </div>
            </div>
            <button
              type="submit"
              className="p-2 border bg-gray-950 text-white font-bold"
            >
              Create Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
