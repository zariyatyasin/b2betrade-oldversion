"use client";
import { Disclosure, Tab } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

const product = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};
const TimeAgo = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date();
      const postTime = new Date(createdAt);
      const timeDifference = currentTime - postTime;

      // Convert time difference to seconds
      const seconds = Math.floor(timeDifference / 1000);

      // Define time intervals in seconds
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
      };

      // Calculate the most appropriate time unit
      let timeAgoString = "";
      let intervalCount = 0;
      for (const [unit, secondsPerUnit] of Object.entries(intervals)) {
        intervalCount = Math.floor(seconds / secondsPerUnit);
        if (intervalCount > 0) {
          timeAgoString = `${intervalCount} ${unit}${
            intervalCount > 1 ? "s" : ""
          } ago`;
          break;
        }
      }

      setTimeAgo(timeAgoString);
    };

    calculateTimeAgo();

    // Update time every minute
    const interval = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return <span>{timeAgo}</span>;
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BuyerRequestDetails({ requestProductDetails }) {
  console.log(requestProductDetails);

  const user = {
    name: "Chelsea Hagon",
    email: "chelsea.hagon@example.com",
    role: "Human Resources Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  const stats = [
    { label: "Vacation ", value: 12 },
    { label: "Sick ", value: 4 },
    { label: "Personal ", value: 2 },
  ];
  return (
    <div className=" mt-20">
      <main className="    mx-auto sm:pt-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <div className="lg:grid lg:grid-cols-4 lg:gap-x-6 lg:items-start">
            <Tab.Group
              as="div"
              className="bg-white pb-1 col-span-1 rounded-md shadow flex flex-col-reverse"
            >
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {requestProductDetails.images.map((image) => (
                    <Tab
                      key={image.public_id}
                      className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50  "
                    >
                      {({ selected }) => (
                        <div className="overflow-hidden">
                          <span className="sr-only">{image.public_id}</span>
                          <span className="absolute inset-0 rounded-md overflow-hidden">
                            <img
                              src={image.secure_url}
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "" : "hidden",
                              "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                            )}
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                {requestProductDetails.images.map((image) => (
                  <Tab.Panel key={image.public_id}>
                    <img
                      src={image.secure_url}
                      alt=""
                      className="w-full h-full object-center object-cover sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            <div className="bg-white h-full p-6 col-span-2 mt-10 px-4  rounded-md shadow sm:mt-16 lg:mt-0">
              <h1 className="text-3xl flex items-center font-extrabold tracking-tight text-gray-900">
                {requestProductDetails?.productName}
                <span className="inline-flex ml-2 items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  Urgent
                </span>
              </h1>
              <p className=" text-gray-500 text-sm mt-2">
                <TimeAgo createdAt={requestProductDetails?.createdAt} />
              </p>
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">
                  ৳ {requestProductDetails?.budget.toLocaleString("en-US")}
                </p>
              </div>

              {/* Reviews */}

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div className="text-base text-gray-700 space-y-6">
                  {" "}
                  {requestProductDetails.description}
                </div>

                <dl className=" mt-8 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Delivery Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(
                        requestProductDetails?.deliveryDate
                      ).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Location
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {requestProductDetails?.location}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Budget
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      ৳{requestProductDetails?.budget.toLocaleString("en-US")}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      +1 555-555-5555
                    </dd>
                  </div>
                  {/* <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">About</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                      anim incididunt cillum culpa consequat. Excepteur qui
                      ipsum aliquip consequat sint. Sit id mollit nulla mollit
                      nostrud in ea officia proident. Irure nostrud pariatur
                      mollit ad adipisicing reprehenderit deserunt qui eu.
                    </dd>
                  </div> */}
                </dl>
              </div>

              {/* <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="border-t divide-y divide-gray-200">
                  {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(
                                  open ? "text-indigo-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="pb-6 prose prose-sm"
                          >
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section> */}
            </div>
            <div className=" col-span-1  ">
              <div className=" bg-white shadow p-6 rounded-md">
                <h2
                  id="summary-heading"
                  className="text-xl font-bold text-gray-900 sm:text-2xl"
                >
                  Total bid <span className=" text-blue-600">5</span>
                </h2>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Best Bid</dt>
                    <dd className="text-2xl font-medium text-gray-950">
                      $99,459
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex items-center text-sm text-gray-600">
                      <span>Last Bid</span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      1 hr ago
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex text-sm text-gray-600">
                      <span>Ends in </span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      1d 3h left
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Bid Cost
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      4 bids
                    </dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="inline-flex mt-4 items-center justify-center px-4 py-2 w-full border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-[#2B39D1]"
                >
                  Submit your Offer
                </button>
              </div>

              <section
                aria-labelledby="profile-overview-title"
                className=" col-span-3 mt-6"
              >
                <div className="rounded-lg bg-white overflow-hidden shadow">
                  <div className="bg-white p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="sm:flex sm:space-x-5">
                        <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                          <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                            {user.name}
                          </p>
                          <p className="text-sm font-medium text-gray-600">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="px-6 py-5 text-sm font-medium text-center"
                      >
                        <span className="text-gray-600">{stat.label}</span>
                        <span className="text-gray-900">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
