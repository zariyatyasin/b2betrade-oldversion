import React from "react";

export default function ProductListCart() {
  return (
    <section aria-labelledby="related-heading" className="mt-24">
      <h2 id="related-heading" className="text-lg font-medium text-gray-900">
        You may also like&hellip;
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div className="group relative">
          <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img
              src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg"
              alt="Front of Billfold Wallet in natural leather."
              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href="#">
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  Billfold Wallet
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">Natural</p>
            </div>
            <p className="text-sm font-medium text-gray-900">$118</p>
          </div>
        </div>
      </div>
    </section>
  );
}
