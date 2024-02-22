import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FullScreenLoading from "../fullScreenOverlay/FullScreenLoading";
import { toast } from "react-toastify";
import SingularSelect from "../selects/SingularSelect";
import MultipleSelect from "../selects/MultipleSelect";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "../ui/button";
import Model from "./Model";

function B2bRegistration({ categories, userType }) {
  const role = [
    { _id: 1, name: "supplier" },
    { _id: 2, name: "manufacturer" },
    { _id: 3, name: "seller" },
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
    role: userType,
    ShopAddress: "",
    address: {
      street: "",
      city: "chittagong",

      country: "bangladesh",
    },
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(" You full Name is required"),
    storeName: Yup.string().required(" You full storeName is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(
        /^(01)\d{9}$/,
        "Invalid phoneNumber number. It should start with '0' and have a total of 11 digits."
      ),
    password: Yup.string().required(" You full password is required"),
    category: Yup.string().required(" You full category is required"),

    // Add other validation rules for your fields here
    // ...
  });

  const [values, setValues] = useState(initialValues);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState(["", "", "", ""]);
  const otpInputsRefs = useRef([]);
  const [otp, setOtp] = useState("");
  const [otpSuccess, setotpSuccess] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getSubs() {
      if (values.category) {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `/api/admin/subcategory/${values.category}`
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
  }, [values.category]);
  useEffect(() => {
    let intervalId;

    if (resendDisabled && otpSuccess === false) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            setResendDisabled(false);
            clearInterval(intervalId);
          } else if (prevCountdown === 1) {
            setResendDisabled(false);
          }
          return Math.max(prevCountdown - 1, 0);
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [resendDisabled, otpSuccess]);

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && enteredOtp[index] === "" && index > 0) {
      e.preventDefault();
      otpInputsRefs.current[index - 1].focus();
    }
  };
  const handleVerifyOtp = (enteredOtpjon) => {
    setLoading(true);
    if (otp === parseInt(enteredOtpjon)) {
      setTimeout(() => {
        setotpSuccess(true);
        setLoading(false);
        setShowOtpModal(false);
        setError(null);
      }, 2000);
    } else {
      setotpSuccess(false);
      setLoading(false);
      setError("Incorrect OTP. Please try again.");
    }
  };

  const closeOtpModal = () => {
    setEnteredOtp(["", "", "", ""]);
    setError(null);
    setShowOtpModal(false);
    setCountdown(60);
  };
  const handleResendClick = () => {
    if (otpSuccess === false) {
      setResendDisabled(true);
      setCountdown(60);

      handleOtpSend();
      setError(null);
      setEnteredOtp(["", "", "", ""]);
    }
  };
  const handleOtpInputChange = (index, value) => {
    const newOtp = [...enteredOtp];
    newOtp[index] = value;

    setEnteredOtp(newOtp);

    if (index < enteredOtp.length - 1 && value !== "") {
      otpInputsRefs.current[index + 1].focus();
    }

    const isAllFilled = newOtp.every((digit) => digit !== "");

    if (isAllFilled) {
      const enteredOtpjon = newOtp.join("");
      handleVerifyOtp(enteredOtpjon);
    }
  };
  const handleOtpPaste = (event) => {
    const pastedData = event.clipboardData.getData("Text");
    const pastedOtp = pastedData.match(/\d/g);
    if (pastedOtp && pastedOtp.length === enteredOtp.length) {
      const newOtp = pastedOtp.slice(0, enteredOtp.length);
      setEnteredOtp(newOtp);
      handleVerifyOtp(newOtp.join(""));
    }
  };
  const renderOtpInputs = () => {
    return enteredOtp.map((digit, index) => (
      <input
        key={index}
        className="m-2 border h-10 w-10 text-center form-control rounded"
        type="text"
        maxLength="1"
        value={digit || ""}
        onChange={(e) => handleOtpInputChange(index, e.target.value)}
        ref={(input) => (otpInputsRefs.current[index] = input)}
        onKeyDown={(e) => handleOtpKeyDown(index, e)}
        onPaste={handleOtpPaste} // Add this line for paste event
      />
    ));
  };

  const handleOtpSend = async (phoneNumber) => {
    // Generate OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000);

    setOtp(generatedOtp);
    const apiKey = "vUg6OOv4uFlo7WIfkgwC";
    const senderId = "8809617615565";
    setCountdown(60);
    try {
      await axios.post("http://bulksmsbd.net/api/smsapimany", {
        api_key: apiKey,
        senderid: senderId,
        messages: [
          {
            to: phoneNumber,
            message: `Welcome to B2BeTrade, Your OTP is: ${generatedOtp}`,
          },
        ],
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (otpSuccess) {
      try {
        setLoading(true);
        const response = await axios.post(
          "/api/formrequest/b2bregistration",

          values
        );

        if (response.status === 201) {
          resetForm();
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
      setValues(values);
    } else {
      handleOtpSend(values.phoneNumber);
      setShowOtpModal(true);
      setError("Verify the Phone number");
    }
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <Form className="  mb-24">
          {loading && <FullScreenLoading />}
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

            {/* <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address if has any
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
            </div> */}
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
                defaultValue={values.role}
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
                htmlFor="address.country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <Field
                type="text"
                name="address.country"
                id="address.country"
                autoComplete="address.country"
                placeholder="Bangladesh"
                defaultValue="Bangladesh"
                disabled
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="address.country"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-6 sm:col-span-2">
              <label
                htmlFor="address.city"
                className="block text-sm font-medium text-gray-700"
              >
                city
              </label>
              <Field
                type="text"
                name="address.city"
                id="address.city"
                autoComplete="address.city"
                placeholder="chittagong"
                defaultValue="chittagong"
                disabled
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="address.city"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-6 sm:col-span-3">
              <label
                htmlFor="ShopAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <Field
                type="text"
                name="ShopAddress"
                id="ShopAddress"
                autoComplete="ShopAddress"
                className="flex-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0     sm:text-sm border-gray-300"
              />
              <ErrorMessage
                name="ShopAddress"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
          <Model isOpen={showOtpModal} onClose={closeOtpModal}>
            <div className="w-full">
              <div className="bg-white   py-3 rounded text-center">
                <div className="flex flex-col mt-4">
                  <span>Enter the OTP you received at</span>

                  <div onClick={closeOtpModal} className=" text-blue-600">
                    Edit
                  </div>
                </div>

                <div
                  id="otp"
                  className="flex flex-row justify-center text-center px-2 mt-5"
                >
                  {renderOtpInputs()}
                </div>

                <div className=" text-xs text-red-500 mt-1">
                  {error && error}
                </div>

                <div>
                  {resendDisabled && (
                    <div className="text-center">{countdown}s</div>
                  )}
                </div>
                <div>
                  {!resendDisabled && (
                    <button
                      className=" text-center font-bold"
                      onClick={handleResendClick}
                      disabled={resendDisabled}
                    >
                      Resend
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Model>
          <div className=" text-xs text-red-600 mb-2">{error && error}</div>
          <div className="  pb-4 ">
            <button
              type="submit"
              className=" px-4 py-2 rounded-md bg-[#2B39D1] text-white  "
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
