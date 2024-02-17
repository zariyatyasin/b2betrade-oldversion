"use client";
import React, { useEffect, useRef, useState } from "react";
import { HeaderWithOutCat } from "../../components/Header/HeaderWithOutCat";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import FullScreenLoading from "../../components/fullScreenOverlay/FullScreenLoading";
import Link from "next/link";
import Footer from "../../components/Footer/Footer";

const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(
      /^(01)\d{9}$/,
      "Invalid phoneNumber number. It should start with '0' and have a total of 11 digits."
    ),
});

export default function page() {
  const session = useSession();
  const params = useSearchParams();
  const [isRegistering, setIsRegistering] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [enteredOtp, setEnteredOtp] = useState(["", "", "", "", "", ""]);
  const otpInputsRefs = useRef([]);
  const [otp, setOtp] = useState("");
  const [otpSuccess, setotpSuccess] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const handleOtpInputChange = (index, value) => {
    const newOtp = [...enteredOtp];
    newOtp[index] = value;

    // Move focus to next input if not at the last input
    if (index < enteredOtp.length - 1 && value !== "") {
      otpInputsRefs.current[index + 1].focus();
    }

    setEnteredOtp(newOtp);
  };
  const renderOtpInputs = () => {
    return enteredOtp.map((digit, index) => (
      <input
        key={index}
        className="m-2 border h-10 w-10 text-center form-control rounded"
        type="text"
        maxLength="1"
        value={digit}
        onChange={(e) => handleOtpInputChange(index, e.target.value)}
        ref={(input) => (otpInputsRefs.current[index] = input)}
      />
    ));
  };
  console.log(otp);
  const handleOtpSend = async () => {
    // Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(generatedOtp);
    const apiKey = "vUg6OOv4uFlo7WIfkgwC";
    const senderId = "8809617615565";

    // try {

    //   await axios.post("http://bulksmsbd.net/api/smsapimany", {
    //     api_key: apiKey,
    //     senderid: senderId,
    //     messages: [
    //       {
    //         to: phoneNumber,
    //         message: `Welcome to B2BeTrade, Your OTP is: ${generatedOtp}`,
    //       },
    //     ],
    //   });
    // } catch (error) {
    //   console.error("Error sending OTP:", error);

    // }
  };
  const handleVerifyOtp = () => {
    const enteredOtpjon = enteredOtp.join("");

    if (otp === parseInt(enteredOtpjon)) {
      setotpSuccess(true);
    } else {
      setotpSuccess(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/register/exsituser", {
        phoneNumber,
      });

      if (response.data.type === "login") {
        setIsRegistering(true);
        setSuccess(response.data.message);
      } else if (response.data.type === "register") {
        handleOtpSend();
        setIsRegistering(false);
        setSuccess(response.data.message);
      }
    } catch (error) {
      console.log(error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeaderWithOutCat />
      {loading && <FullScreenLoading />}

      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-xl mb-8 font-bold text-gray-900">
            {isRegistering
              ? "Sign In"
              : isRegistering === false
              ? "Register"
              : "Sign In/Register"}
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {(isRegistering === true || isRegistering === null) && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10  "
            >
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="phoneNumber"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                  />
                </div>
                {/* Error message */}
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-[#2B39D1] hover:bg-[#2B39D1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                disabled={loading}
              >
                {loading ? "Loading..." : "CONTINUE"}
              </button>
            </form>
          )}

          {isRegistering === false && otpSuccess === false && (
            <div>
              <div className="w-full">
                <div className="bg-white h-64 py-3 rounded text-center">
                  <h1 className="text-2xl font-bold">OTP Verification</h1>
                  <div className="flex flex-col mt-4">
                    <span>Enter the OTP you received</span>
                  </div>

                  <div
                    id="otp"
                    className="flex flex-row justify-center text-center px-2 mt-5"
                  >
                    {renderOtpInputs()}
                  </div>

                  <div className="flex justify-center text-center mt-5">
                    <div
                      className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"
                      onClick={handleVerifyOtp}
                    >
                      <span className="font-bold">Verify OTP</span>
                      <i className="bx bx-caret-right ml-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {otpSuccess === true && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10  "
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                  />
                </div>
                {/* Error message */}
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-[#2B39D1] hover:bg-[#2B39D1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                disabled={loading}
              >
                {loading ? "Loading..." : "CONTINUE"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
