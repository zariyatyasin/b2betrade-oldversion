"use client";
import React, { useEffect, useRef, useState } from "react";
import { HeaderWithOutCat } from "../../components/Header/HeaderWithOutCat";
import OtpInput from "react-otp-input";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { signIn, useSession, getProviders } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import FullScreenLoading from "../../components/fullScreenOverlay/FullScreenLoading";
import Link from "next/link";

import Model from "../../components/modelUi/Model";
const Page = () => {
  const session = useSession();
  const params = useSearchParams();
  const [isRegistering, setIsRegistering] = useState(null);
  const [showNumber, setShowNumber] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [enteredOtp, setEnteredOtp] = useState(["", "", "", ""]);
  const otpInputsRefs = useRef([]);
  const [otp, setOtp] = useState("");
  const [otpSuccess, setotpSuccess] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(true);
  const [providers, setProviders] = useState(null);
  const [hasStore, setHasStore] = useState(false);
  const [storeName, setStoreName] = useState("");

  const [storeAddress, setStoreAddress] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const regions = ["Dhaka", "Chittagong", "Khulna", "Rajshahi"];
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    let intervalId;

    if (resendDisabled && isRegistering === false && otpSuccess === false) {
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
  }, [resendDisabled, isRegistering, otpSuccess]);

  useEffect(() => {
    if (session?.status === "authenticated") {
      const callbackUrl = params.get("callbackUrl");
      if (callbackUrl) {
        redirect(callbackUrl);
      } else {
        redirect("/");
      }
    }
  }, [session]);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/getitem/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [hasStore]);

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
        setShowNumber(false);
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
    if (isRegistering === false && otpSuccess === false) {
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

      // Focus on the next input field
      if (otpInputsRefs.current[enteredOtp.length]) {
        otpInputsRefs.current[enteredOtp.length].focus();
      }
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

  const handleOtpSend = async () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000);
    console.log(generatedOtp);
    setOtp(generatedOtp);
    const apiKey = "vUg6OOv4uFlo7WIfkgwC";
    const senderId = "8809617615565";

    try {
      await axios.post("https://bulksmsbd.net/api/smsapimany", {
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
  const loginHandle = async (e) => {
    e.preventDefault();

    let options = {
      redirect: false,
      phoneNumber: phoneNumber,
      password: password,
    };
    try {
      setLoading(true);
      const result = await signIn("credentials", options);

      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess("User signed in successfully!");

        return result;
      }
    } catch (error) {
      setError(error.message || "An error occurred during sign-in.");
    } finally {
      setLoading(false);
    }
  };

  const handleResign = (event) => {
    event.preventDefault();

    location.reload();
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
        setShowNumber(false);
        setSuccess(response.data.message);
      } else if (response.data.type === "register") {
        handleOtpSend();
        setCountdown(60);
        setShowOtpModal(true);
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

  const registerHandle = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          password,
          name: fullName,
          storeName,
          ShopAddress: storeAddress,
          category: selectedCategory,

          city: selectedRegion,
        }),
      });

      if (!res.ok) {
        setLoading(false);
        const data = await res.json();
        setError(data.message);
      }
      let options = {
        redirect: false,
        phoneNumber: phoneNumber,
        password: password,
      };
      await signIn("credentials", options);

      const data = await res.json();

      return data;
    } catch (error) {
      setError(error.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (otp) => {
    setOtp(otp);
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
          {showNumber === true && (
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
                    placeholder="01XXXXXXXXX"
                    autoComplete="phoneNumber"
                    required
                    className="appearance-none placeholder:text-gray-300 block w-full px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                  />
                </div>
                {phoneNumber.length !== 11 && phoneNumber !== "" && (
                  <p className="text-red-500 text-sm mt-1">
                    Phone number must be exactly 11 digits
                  </p>
                )}
                {!/^01/.test(phoneNumber) && phoneNumber.length === 11 && (
                  <p className="text-red-500 text-sm mt-1">
                    Phone number must start with 01
                  </p>
                )}
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

          {isRegistering && (
            <form
              onSubmit={loginHandle}
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
                {phoneNumber.length !== 11 && phoneNumber !== "" && (
                  <p className="text-red-500 text-sm mt-1">
                    Phone number must be exactly 11 digits
                  </p>
                )}
                {!/^01/.test(phoneNumber) && phoneNumber.length === 11 && (
                  <p className="text-red-500 text-sm mt-1">
                    Phone number must start with 01
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`appearance-none block w-full px-3 py-2 border  shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <RemoveRedEyeOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </button>
                  </div>
                </div>
                <div className=" text-xs text-red-500 mt-1">
                  {error && error}
                </div>
                <Link
                  href={"/forgetpassword"}
                  className=" text-xs text-gray-500 mt-3"
                >
                  Forget Password?
                </Link>

                <label
                  htmlFor="remember-me"
                  className=" text-xs block  mt-2 text-gray-500"
                >
                  Don&apos;t have account?
                  <span
                    className="ml-1  font-medium hover:cursor-pointer"
                    onClick={handleResign}
                  >
                    Create one
                  </span>
                </label>
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
            <Model isOpen={showOtpModal} onClose={closeOtpModal}>
              <div className="w-full">
                <div className="bg-white w-full  py-3 rounded text-center">
                  <div className="flex flex-col mt-4">
                    <span className="">Enter the OTP you received at</span>
                    <span className="font-bold">+88{phoneNumber}</span>
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
          )}
          <>
            {otpSuccess === true && (
              <form
                onSubmit={registerHandle}
                className="space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
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
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-2 border shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <RemoveRedEyeOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="hasStore"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Do you have a store?
                  </label>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        checked={hasStore}
                        onChange={(e) => setHasStore(e.target.checked)}
                      />
                      <span className="ml-2 text-gray-900">Yes</span>
                    </label>
                  </div>
                </div>
                {hasStore && ( // Show additional fields only if user has store
                  <>
                    <div>
                      <label
                        htmlFor="storeName"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Store Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="storeName"
                          name="storeName"
                          type="text"
                          autoComplete="off"
                          required
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Store Category
                      </label>
                      <div className="mt-1">
                        <select
                          id="category"
                          name="category"
                          autoComplete="off"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Region
                      </label>
                      <div className="mt-1">
                        <select
                          id="region"
                          name="region"
                          autoComplete="off"
                          required
                          value={selectedRegion}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                        >
                          <option value="">Select Region</option>
                          {regions.map((region, index) => (
                            <option key={index} value={region}>
                              {region}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="storeAddress"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Store Address
                      </label>
                      <div className="mt-1">
                        <input
                          id="storeAddress"
                          name="storeAddress"
                          type="text"
                          autoComplete="off"
                          required
                          value={storeAddress}
                          onChange={(e) => setStoreAddress(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                        />
                      </div>
                    </div>
                  </>
                )}
                {password.length < 6 && password !== "" && (
                  <p className="text-red-500 text-sm mt-1">
                    Password must be at least 6 characters
                  </p>
                )}
                {password !== confirmPassword && confirmPassword !== "" && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-[#2B39D1] hover:bg-[#2B39D1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  disabled={password !== confirmPassword}
                >
                  {loading ? "Loading..." : "CONTINUE"}
                </button>
              </form>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Page;
