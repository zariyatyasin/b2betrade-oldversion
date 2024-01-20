import React from "react";
import MainpageLayout from "../../components/layout/MainpageLayout";
import Footer from "../../components/Footer/Footer";
import Link from "next/link";
export default function page() {
  return (
    <div>
      <MainpageLayout />
      <div className="bg-white min-h-full px-4  py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className=" max-w-4xl mx-auto">
          <main className="sm:flex">
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Become a Partner
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Join hands with us to explore exciting partnership
                  opportunities and grow your business together. Discover the
                  benefits of collaboration with our B2BeTrade wholesale
                  platform
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Go back home
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Contact US to Become a Partner
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
