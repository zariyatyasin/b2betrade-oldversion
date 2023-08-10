"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { redirect, useSearchParams } from "next/navigation";
const validationSchema = Yup.object({
  // isRegistering: Yup.boolean(),
  // name: Yup.string().when("isRegistering", {
  //   is: true,
  //   then: Yup.string().required("Name is required"),
  // }),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().when("isRegistering", {
    is: true,
    then: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  }),
});

const page = () => {
  const session = useSession();
  const params = useSearchParams();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [providers, setProviders] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const handleRegister = async (values) => {
    const { email, password } = values;

    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      let options = {
        redirect: false,
        email: email,
        password: password,
      };
      await signIn("credentials", options);

      const data = await res.json();

      return data;
    } catch (error) {
      throw new Error(
        error.message || "An error occurred during registration."
      );
    }
  };

  const handleSignIn = async (values, callbackUrl) => {
    const { email, password } = values;
    let options = {
      redirect: false,
      email: email,
      password: password,
    };
    try {
      const result = await signIn("credentials", options);
      if (result?.error) {
        throw new Error(result.error);
      } else {
        console.log("User signed in successfully!");

        return result;
      }
    } catch (error) {
      throw new Error(error.message || "An error occurred during sign-in.");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      if (isRegistering) {
        const response = await handleRegister(values);
        setSuccess(response);
      } else {
        await handleSignIn(values, params.get("callbackUrl"));
        setSuccess("Signed in successfully.");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || "An error occurred.");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-xl font-bold text-gray-900">
            Sign In/Register
          </h2>
        </div>

        <div className="  sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
              validateOnChange
            >
              {({ errors, touched, setFieldValue }) => (
                <Form className="space-y-6">
                  {/* {isRegistering && (
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-1">
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  )} */}

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
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
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {isRegistering && (
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          autoComplete="new-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-200 shadow-sm placeholder-gray-900 focus:outline-none focus:ring-gray-900 focus:border-gray-200 sm:text-sm"
                        />
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  )}

                  <div className="flex flex-col">
                    {!isRegistering && (
                      <div className="text-sm">
                        <p className="font-medium text-gray-900 hover:text-gray-900">
                          Forgot your password?
                        </p>
                      </div>
                    )}
                    <div className="text-sm mt-2">
                      <p
                        className="font-medium text-gray-900 hover:text-gray-900 cursor-pointer"
                        onClick={() =>
                          setIsRegistering(
                            (prevIsRegistering) => !prevIsRegistering
                          )
                        }
                      >
                        {isRegistering
                          ? "Already have an account? Sign in"
                          : "Don't have an account? Register here"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    disabled={loading}
                  >
                    {loading
                      ? "Loading..."
                      : isRegistering
                      ? "Register"
                      : "Sign in"}
                  </button>

                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  {success && (
                    <div className="text-green-500 text-sm">{success}</div>
                  )}
                </Form>
              )}
            </Formik>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn ml-11"
                  >
                    Sign test
                  </button>
                ))}
              <div
                className="mt-6  "
                onClick={() => {
                  signIn("google");
                }}
              >
                <div
                  aria-label="Continue with google"
                  role="button"
                  className="focus:outline-none focus:ring-2 text-center  focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border  border-gray-200 flex items-center w-full "
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                      fill="#34A853"
                    />
                    <path
                      d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                      fill="#EB4335"
                    />
                  </svg>
                  <p className="text-base font-medium ml-4 text-gray-700">
                    Continue with Google
                  </p>
                </div>
                <div
                  aria-label="Continue with google"
                  role="button"
                  className="focus:outline-none focus:ring-2 text-center mt-2  focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border  border-gray-200 flex items-center w-full "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="28"
                    height="28"
                  >
                    <path
                      fill="#039be5"
                      d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                    />
                    <path
                      fill="#fff"
                      d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                    />
                  </svg>
                  <p className="text-base font-medium ml-4 text-gray-700">
                    Continue with Google
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
