"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import axios from "axios";
const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("phoneNumber is required")
    .matches(
      /^(01)\d{9}$/,
      "Invalid phoneNumber number. It should start with '0' and have a total of 11 digits."
    ),
});

const page = () => {
  const session = useSession();
  const params = useSearchParams();
  const [isRegistering, setIsRegistering] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [providers, setProviders] = useState(null);
  const [success, setSuccess] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setpassword] = useState();
  useEffect(() => {
    if (session.status === "authenticated") {
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
  const loginHandle = async (values, callbackUrl) => {
    const { phoneNumber, password } = values;
    let options = {
      redirect: false,
      phoneNumber: phoneNumber,
      password: password,
    };
    try {
      const result = await signIn("credentials", options);
      if (result?.error) {
        console.log(result.error);
      } else {
        console.log("User signed in successfully!");

        return result;
      }
    } catch (error) {
      console.log(error.message || "An error occurred during sign-in.");
    }
  };

  const registerHandle = async (values) => {
    const { phoneNumber, password } = values;

    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.log(data.message);
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
      console.log(error.message || "An error occurred during registration.");
    }
  };

  const handleSubmit = async (values) => {
    const { phoneNumber, password } = values;

    try {
      const response = await axios.post("/api/auth/register/exsituser", {
        phoneNumber,
      });
      console.log(response);
      if (response.data.type === "login") {
        setIsRegistering(true);
        setSuccess(response.data.message);
      } else if (response.data.type === "register") {
        setIsRegistering(false);
        setSuccess(response.data.message);
      }
    } catch (error) {
      console.log(error);

      setError(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-xl mb-8 font-bold text-gray-900">
            Sign In/Register
          </h2>
        </div>

        <div className="  sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                phoneNumber: "",
                fullName: "", // Add new field for full name
                password: "", // Add new field for password
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                if (isRegistering === null) {
                  handleSubmit(values);
                } else {
                  isRegistering ? loginHandle(values) : registerHandle(values);
                }
              }}
              enableReinitialize
              validateOnChange
            >
              {({ errors, touched, setFieldValue }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <Field
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        inputMode="numeric" // Allow only numeric input
                        pattern="[0-9]*" // Enforce numeric input
                        autoComplete="phoneNumber"
                        required
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.phoneNumber && touched.phoneNumber
                            ? "border-red-500"
                            : "border-gray-200"
                        } shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm`}
                      />
                    </div>
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  {isRegistering !== null && (
                    <>
                      {isRegistering ? (
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Password
                          </label>
                          <div className="mt-1">
                            <Field
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="new-password"
                              required
                              className={`appearance-none block w-full px-3 py-2 border ${
                                errors.password && touched.password
                                  ? "border-red-500"
                                  : "border-gray-200"
                              } shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm`}
                            />
                          </div>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      ) : (
                        <>
                          <div>
                            <label
                              htmlFor="fullName"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Full Name
                            </label>
                            <div className="mt-1">
                              <Field
                                id="fullName"
                                name="fullName"
                                type="text"
                                autoComplete="name"
                                required
                                className={`appearance-none block w-full px-3 py-2 border ${
                                  errors.fullName && touched.fullName
                                    ? "border-red-500"
                                    : "border-gray-200"
                                } shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm`}
                              />
                            </div>
                            <ErrorMessage
                              name="fullName"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Password
                            </label>
                            <div className="mt-1">
                              <Field
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className={`appearance-none block w-full px-3 py-2 border ${
                                  errors.password && touched.password
                                    ? "border-red-500"
                                    : "border-gray-200"
                                } shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm`}
                              />
                            </div>
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-[#2B39D1] hover:bg-[#2B39D1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "CONTINUE"}
                  </button>

                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  {success && (
                    <div className="text-green-500 text-sm">{success}</div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
