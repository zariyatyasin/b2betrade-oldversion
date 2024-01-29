import React from "react";
import MainpageLayout from "../../components/layout/MainpageLayout";
import Footer from "../../components/Footer/Footer";
export default function page() {
  return (
    <div>
      <MainpageLayout />
      <div className="relative pt-20 lg:pt-40 pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
        <div className="mt-5  text-gray-500">
          <div class="bg-white p-8   ">
            <h1 class="text-2xl font-bold mb-4">Return Policy - B2BETrade</h1>

            <p class="text-gray-700 mb-4">
              At B2BETrade, we strive to provide you with high-quality products.
              If you encounter any issues with your purchase, our return policy
              ensures a hassle-free process.
            </p>

            <h2 class="text-xl font-bold mb-2">Return Eligibility</h2>
            <ul class="list-disc pl-6 mb-4">
              <li>Products must be unused, unworn, and without flaws.</li>
              <li>
                For fashion items, products may be tried on to check for fit but
                should remain unworn.
              </li>
              <li>
                Include original tags, user manuals, warranty cards, freebies,
                invoice, and accessories.
              </li>
              <li>
                Return the product in its original, undamaged
                manufacturer&apos;s packaging/box.
              </li>
              <li>
                Do not tape or attach stickers directly to the
                manufacturer&apos;s packaging/box.
              </li>
            </ul>

            <h2 class="text-xl font-bold mb-2">Valid Reasons for Return</h2>
            <ul class="list-disc pl-6 mb-4">
              <li>
                Delivered product is damaged, physically destroyed, or broken.
              </li>
              <li>Defective product - unable to switch on or operate.</li>
              <li>Incomplete delivery - missing items and/or accessories.</li>
              <li>Incorrect product - wrong size, color, or fake item.</li>
              <li>Product does not match the description or picture.</li>
              <li>Product does not fit - size is unsuitable.</li>
            </ul>

            <p class="text-gray-700 mb-4">
              If your return request falls within the eligibility criteria
              mentioned above, we will process it accordingly.
            </p>

            <h2 class="text-xl font-bold mb-2">Return Process</h2>
            <p class="text-gray-700 mb-4">
              When returning a product, ensure it meets the eligibility
              criteria. Indicate the Order Number and Return Tracking Number on
              the package. Hand over the package to the designated Drop-Off
              station/Pickup Agent and collect the B2BETrade Return
              Acknowledgment paper for reference.
            </p>

            <p class="text-gray-700 mb-4">
              Note: Failure to meet return requirements may result in rejection
              of the return request.
            </p>

            <h2 class="text-xl font-bold mb-2">Additional Information</h2>
            <p class="text-gray-700">
              For electronic appliances and mobile phones, check warranty
              coverage for post-usage issues. Change of mind is accepted for
              selected categories (refer to the Return Policy per Category).
            </p>
          </div>
          <div class="bg-white p-8   ">
            <h1 class="text-2xl font-bold mb-4">
              Refund Procedures for B2BeTrade Wholesale Platform
            </h1>

            <ul class="list-disc pl-6 mb-4">
              <li>
                The timeline for processing your refund is contingent upon the
                nature of the refund and the payment method utilized.
              </li>
              <li>
                Refund initiation begins once B2BeTrade has successfully
                processed your refund in accordance with the specified refund
                type.
              </li>
              <li>
                The refund amount encompasses both the item price and shipping
                fee associated with the returned product.
              </li>
              <li>
                Return Refunds: The refund is initiated after your item has been
                returned to our warehouse and successfully passed Quality
                Control (QC). For detailed instructions on how to return an
                item, please refer to our Return Policy.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
