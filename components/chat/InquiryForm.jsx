import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Images from "../productPage/reviews/Images";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import UploadImagesClould from "../../utils/UploadImagesClould";
import FullScreenLoading from "../fullScreenOverlay/FullScreenLoading";
const InquiryForm = ({ onClose, productId, storeId, name }) => {
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      quantity: 0,
      details: "",

      productId: productId,
      storeId: storeId,
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .required("Quantity is required")
        .min(1, "Quantity must be at least 1"),
      details: Yup.string().required("Detailed requirements are required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!session && status === "unauthenticated") {
        signIn();
      } else {
        try {
          setLoading(true);
          const uploadedImages = await UploadImagesClould(images);

          const response = await axios.post("/api/SendInquiry", {
            quantity: values.quantity,
            details: values.details,
            productId: productId,
            storeId: storeId,
            image: uploadedImages,
          });
          onClose();
          toast.success(response.data.message);
        } catch (error) {
          console.error("Error submitting form:", error.message);
        } finally {
          onClose();
          resetForm();
          setLoading(false);
        }
      }
    },
  });

  return (
    <div className="relative">
      {loading && <FullScreenLoading />}
      <button
        type="button"
        onClick={onClose}
        className="absolute   top-[-20px] right-2 text-red-500 hover:text-red-700"
      >
        <CloseOutlinedIcon />
      </button>
      <h1 className=" text-lg font-semibold text-gray-950">{name}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="quantity"
            className="block mt-8 mb-2 text-sm font-semibold text-gray-600"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.touched.quantity && formik.errors.quantity && (
            <div className="text-red-500 text-sm">{formik.errors.quantity}</div>
          )}
        </div>

        <div className="mt-4">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-semibold text-gray-600"
          >
            Detailed requirements
          </label>
          <textarea
            id="details"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.touched.details && formik.errors.details && (
            <div className="text-red-500 text-sm">{formik.errors.details}</div>
          )}
        </div>
        {/* <label
          htmlFor="details"
          className="block mt-2 text-sm font-semibold text-gray-600"
        >
          If you Have any sample of product
        </label> */}
        {/* <Images images={images} setImages={setImages} imageAllow={2} /> */}

        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className="mt-4 inline-flex items-center justify-center  border border-[#2B39D1] text-[#2B39D1] rounded-md bg-none px-6 py-2 text-center text-sm uppercase font-semibold transition-all duration-300 ease-in-out mr-2"
        >
          Send Inquiry
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;
