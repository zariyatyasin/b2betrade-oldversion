import React from "react";
import { Header } from "../../../../components/Header/Header";
import RequestProduct from "../../../../model/RequestProduct";
import User from "../../../../model/User";
import SellerRequest from "../../../../model/SellerRequest";
import DetailsPageImage from "../../../../components/buyerrequest/detailsPage/DetailsPageImage";
import SubmitForm from "../../../../components/buyerrequest/detailsPage/SubmitForm";
import BuyProfile from "../../../../components/buyerrequest/detailsPage/BuyProfile";
import SellerBiding from "../../../../components/buyerrequest/detailsPage/SellerBiding";
import { getCurrentUser } from "../../../../utils/session";
async function getData({ params }) {
  const session = await getCurrentUser();

  let requestProductDetails = await RequestProduct.findById(
    params.id[0]
  ).populate({
    path: "userId",
    model: User,
  });
  let sellerRequest = await SellerRequest.find({
    requestId: params.id[0],
  }).populate({
    path: "sellerId",
    model: User,
  });

  return {
    session,
    requestProductDetails: JSON.parse(JSON.stringify(requestProductDetails)),
    sellerRequest: JSON.parse(JSON.stringify(sellerRequest)),
  };
}

export default async function page({ params }) {
  const { session, requestProductDetails, sellerRequest } = await getData({
    params,
  });

  const hasSubmittedOffer = sellerRequest.some(
    (request) => request?.sellerId._id === session?.id
  );

  console.log(sellerRequest);
  return (
    <div>
      <Header />

      <main className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {requestProductDetails?.productName}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                on
                <time className="ml-2">
                  {new Date(
                    requestProductDetails.createdAt
                  ).toLocaleDateString()}
                </time>
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              Report
            </button>
            {hasSubmittedOffer ? (
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600"
              >
                Submited
              </button>
            ) : (
              <SubmitForm
                sellerRequest={sellerRequest}
                session={session}
                productName={requestProductDetails.productName}
                userId={requestProductDetails.userId._id}
                ProductId={requestProductDetails._id}
              />
            )}
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow border sm:rounded-md">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Details Information
                  </h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                    <div className="sm:col-span-3">
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {requestProductDetails.description}
                      </dd>
                    </div>
                    <div className="sm:col-span-3">
                      <dt className="text-sm font-medium text-gray-500">
                        Sample Image
                      </dt>
                      <DetailsPageImage
                        requestProductDetails={requestProductDetails.images}
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Delivery Date:
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(
                          requestProductDetails.deliveryDate
                        ).toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Location:
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {requestProductDetails.shippingAddress.city}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Budget:
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {requestProductDetails.budget}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Urgent:
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {requestProductDetails.isUrgent ? "Yes" : "No"}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Preferred Brand:
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {requestProductDetails.preferredBrand}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Preferred Color:
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {requestProductDetails.preferredColor}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Bargain Allowed:
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {requestProductDetails.isBargainAllowed ? "Yes" : "No"}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Sample Requested:
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {requestProductDetails.isSampleRequested ? "Yes" : "No"}
                      </dd>
                    </div>
                    {/* Add other details here */}
                  </dl>
                </div>
              </div>
            </section>

            {hasSubmittedOffer && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg  border">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Your form
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Personal details and application.
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Margot Foster
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Application for
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Backend Developer
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        margotfoster@example.com
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Salary expectation
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        $120,000
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {sellerRequest[0].description}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Attachments
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <ul
                          role="list"
                          className="border border-gray-200 rounded-md divide-y divide-gray-200"
                        >
                          <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <span className="ml-2 flex-1 w-0 truncate">
                                resume_back_end_developer.pdf
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                          <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <span className="ml-2 flex-1 w-0 truncate">
                                coverletter_back_end_developer.pdf
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>

          <section
            aria-labelledby="timeline-title"
            className="lg:col-start-3 lg:col-span-1"
          >
            {session && session?.id === requestProductDetails?.userId._id ? (
              <SellerBiding
                requestProductDetails={requestProductDetails}
                sellerRequest={sellerRequest}
              />
            ) : (
              <BuyProfile requestProductDetails={requestProductDetails} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
