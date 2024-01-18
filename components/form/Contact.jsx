"use client";

import { MailIcon, PhoneIcon } from "@heroicons/react/outline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Footer from "../Footer/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

import { toast } from "react-toastify";
import * as Yup from "yup";
import { useState } from "react";
import Link from "next/link";
export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+8801841480230";
    const whatsappLink = `https://wa.me/${phoneNumber}`;

    window.open(whatsappLink, "_blank");
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    phone: Yup.string()
      .required("Phone Number is required")
      .matches(
        /^(01)\d{9}$/,
        "Invalid phoneNumber number. It should start with '0' and have a total of 11 digits."
      ),
    message: Yup.string().required("Message is required"),
  });

  const initialValues = {
    fullName: "",
    phone: "",
    message: "",
  };
  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/contact", values);

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 relative">
      <div
        className=" static lg:fixed right-0 bottom-72 bg-white p-4 z-40 rounded-md  border shadow-md cursor-pointer items-center flex-col mb-4 sm:mb-0"
        onClick={handleWhatsAppClick}
      >
        <div className=" flex flex-col  relative   items-center justify-center">
          <WhatsAppIcon sx={{ fontSize: 28 }} className=" text-[#25D366]" />
          <p className="text-sm mt-2 text-gray-500 flex items-center ">
            Live Chat{" "}
            <div className=" ml-1  relative flex h-3 w-3 ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
            </div>
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto  px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="relative bg-white shadow-xl">
          <h2 className="sr-only">Contact us</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Contact information */}
            <div className="relative overflow-hidden py-10 px-6 bg-indigo-700 sm:px-10 xl:p-12">
              <div
                className="absolute inset-0 pointer-events-none sm:hidden"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  width={343}
                  height={388}
                  viewBox="0 0 343 388"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                    fill="url(#linear1)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear1"
                      x1="254.553"
                      y1="107.554"
                      x2="961.66"
                      y2="814.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  width={359}
                  height={339}
                  viewBox="0 0 359 339"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                    fill="url(#linear2)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear2"
                      x1="192.553"
                      y1="28.553"
                      x2="899.66"
                      y2="735.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  width={160}
                  height={678}
                  viewBox="0 0 160 678"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                    fill="url(#linear3)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear3"
                      x1="192.553"
                      y1="325.553"
                      x2="899.66"
                      y2="1032.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white">
                Contact information
              </h3>

              <p className="mt-6 text-base text-indigo-50 max-w-3xl">
                Have questions or need assistance? Feel free to reach out to us
                using the contact form above. We're here to help you with
                anything you need on your journey to a great shopping
                experience.
              </p>

              <dl className="mt-8 space-y-6">
                <dt>
                  <span className="sr-only">Phone number</span>
                </dt>
                <dd className="flex text-base text-indigo-50">
                  <PhoneIcon
                    className="flex-shrink-0 w-6 h-6 text-indigo-200"
                    aria-hidden="true"
                  />
                  <a
                    href="tel:+8801841480230"
                    className="ml-3 text-2xl font-bold"
                  >
                    +8801841480230
                  </a>
                </dd>
                <dt>
                  <span className="sr-only">Email</span>
                </dt>
                <dd className="flex text-base text-indigo-50">
                  <MailIcon
                    className="flex-shrink-0 w-6 h-6 text-indigo-200"
                    aria-hidden="true"
                  />
                  <span className="ml-3">b2betradebd@gmail.com</span>
                </dd>
              </dl>
              <ul role="list" className="mt-8 flex space-x-12">
                <li>
                  <Link
                    className="text-indigo-200 hover:text-indigo-100"
                    href="https://www.facebook.com/b2betrade/"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      aria-hidden="true"
                    >
                      <path
                        d="M22.258 1H2.242C1.556 1 1 1.556 1 2.242v20.016c0 .686.556 1.242 1.242 1.242h10.776v-8.713h-2.932V11.39h2.932V8.887c0-2.906 1.775-4.489 4.367-4.489 1.242 0 2.31.093 2.62.134v3.037l-1.797.001c-1.41 0-1.683.67-1.683 1.653v2.168h3.362l-.438 3.396h-2.924V23.5h5.733c.686 0 1.242-.556 1.242-1.242V2.242C23.5 1.556 22.944 1 22.258 1"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-indigo-200 hover:text-indigo-100"
                    href="https://www.instagram.com/b2betrade/"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      aria-hidden="true"
                    >
                      <path
                        d="M11.999 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.386.6.11.819-.26.819-.578 0-.284-.01-1.04-.017-2.04-3.337.724-4.042-1.61-4.042-1.61-.545-1.386-1.332-1.755-1.332-1.755-1.09-.744.082-.73.082-.73 1.205.086 1.838 1.238 1.838 1.238 1.07 1.833 2.81 1.304 3.493.996.109-.775.419-1.303.762-1.603C7.145 17 4.343 15.97 4.343 11.373c0-1.31.468-2.382 1.236-3.22-.124-.304-.536-1.524.118-3.176 0 0 1.007-.323 3.3 1.23.956-.266 1.983-.4 3.003-.404 1.02.005 2.046.138 3.005.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.652.243 2.872.12 3.176.77.838 1.233 1.91 1.233 3.22 0 4.61-2.806 5.624-5.478 5.921.43.37.814 1.103.814 2.223 0 1.603-.015 2.898-.015 3.291 0 .321.217.695.825.578C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12.001-12"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-indigo-200 hover:text-indigo-100"
                    href="https://www.linkedin.com/company/b2betrade/"
                  >
                    <span className="sr-only">LinkdIN</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      viewBox="0 0 448 512"
                    >
                      {" "}
                      <path
                        fill="#e0ecff"
                        d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact form */}
            <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
              <h3 className="text-lg font-medium text-gray-900">
                Send us a message
              </h3>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Full Name
                    </label>
                    <div className="mt-1">
                      <Field
                        type="text"
                        id="fullName"
                        name="fullName"
                        autoComplete="given-name"
                        className="py-3 px-4 block w-full border shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Phone
                      </label>
                    </div>
                    <div className="mt-1">
                      <Field
                        type="text"
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        className="py-3 px-4 block w-full border shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        aria-describedby="phone-optional"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex justify-between">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Message
                      </label>
                    </div>
                    <div className="mt-1">
                      <Field
                        as="textarea"
                        id="message"
                        name="message"
                        rows={4}
                        className="py-3 px-4 block w-full  shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                        aria-describedby="message-max"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:flex sm:justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
