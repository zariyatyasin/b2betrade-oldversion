import React from "react";

const incentives = [
  {
    name: "Free Shipping",
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg",
  },
  {
    name: "24/7 Customer Support",
    description:
      "Our AI chat widget is powered by a naive series of if/else statements. Guaranteed to irritate.",
    imageSrc: "https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg",
  },
  {
    name: "Fast Shopping Cart",
    description:
      "Look how fast that cart is going. What does this mean for the actual experience? I don't know.",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg",
  },
  {
    name: "Gift Cards",
    description:
      "Buy them for your friends, especially if they don't like our store. Free money for us, it's great.",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg",
  },
];

export default function Feature() {
  return (
    <div className=" bg-white text-[#222222] mb-12 md:mb-14 lg:mb-16 ">
      <div className="max-w-7xl flex flex-col lg:flex-row  lg:items-center mx-auto py-8 px-4 sm:py-16 sm:px-6 lg:px-8  ">
        <div className=" flex-[2] mx-auto text-left  ">
          <h2
            className="text-2xl font-bold text-center lg:text-left  lg:leading-normal tracking-wide
            sm:text-[44px]"
          >
            Explore millions of offerings tailored to your business needs
          </h2>
        </div>
        <dl className=" flex-1 mt-8  text-center  grid grid-cols-4 lg:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <dd className=" text-xl lg:text-3xl  font-bold text-[#2B39D1]">
              200M+
            </dd>
            <dt className="mt-1 text-sm   lg:text-xl   text-gray-950 ">
              products
            </dt>
          </div>
          <div className="flex flex-col  sm:mt-0">
            <dd className=" text-xl lg:text-3xl  font-bold text-[#2B39D1]">
              24/7
            </dd>
            <dt className="mt-1 text-sm   lg:text-xl   text-gray-950 ">
              Delivery
            </dt>
          </div>
          <div className="flex flex-col  sm:mt-0">
            <dd className=" text-xl lg:text-3xl  font-bold text-[#2B39D1]">
              100k+
            </dd>
            <dt className="mt-1 text-sm   lg:text-xl   text-gray-950 ">
              Supplier
            </dt>
          </div>
          <div className="flex flex-col  sm:mt-0">
            <dd className=" text-xl lg:text-3xl font-bold text-[#2B39D1]">
              100k+
            </dd>

            <dt className="mt-1 text-sm   lg:text-xl   text-gray-950 ">
              Calories
            </dt>
          </div>
        </dl>
      </div>
    </div>
  );
}
