import React from "react";

export const HeaderPolicy = () => {
  return (
    <div>
      <nav
        aria-label="Offers"
        className="order-last bg-gray-50  lg:order-first"
      >
        <div className="max-w-7xl mx-auto lg:px-8 ">
          <ul
            role="list"
            className="lg:grid hidden grid-cols-1 divide-y divide-gray-300 lg:grid-cols-3 lg:divide-y-0 lg:divide-x"
          >
            <li className="flex flex-col">
              <a
                href="#"
                className="relative flex-1 flex flex-col justify-center   py-2 px-4 text-center focus:z-10"
              >
                <p className="text-sm text-gray-500">Download the app</p>
                <p className="font-semibold text-gray-900">
                  Get an exclusive $5 off code
                </p>
              </a>
            </li>

            <li className="flex flex-col">
              <a
                href="#"
                className="relative flex-1 flex flex-col justify-center   py-2 px-4 text-center focus:z-10"
              >
                <p className="text-sm text-gray-500">
                  Return when you&#039;re ready
                </p>
                <p className="font-semibold text-gray-900">
                  60 days of free returns
                </p>
              </a>
            </li>

            <li className="flex flex-col">
              <a
                href="#"
                className="relative flex-1 flex flex-col justify-center   py-2 px-4 text-center focus:z-10"
              >
                <p className="text-sm text-gray-500">
                  Sign up for our newsletter
                </p>
                <p className="font-semibold text-gray-900">
                  15% off your first order
                </p>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
