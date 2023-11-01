<div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
  <div className="grid grid-cols-2 gap-8">
    <div className="col-span-1">
      <img
        src={requestProductDetails.images[0]}
        alt="Product"
        className="w-full rounded-lg shadow"
      />
    </div>
    <div className="col-span-1">
      <h1 className="text-3xl font-bold mb-4">
        {requestProductDetails.productName}
      </h1>
      <p className="text-gray-800 mb-2">{requestProductDetails.description}</p>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800">
          Budget: ${requestProductDetails.budget}
        </span>
        <span className="text-gray-800">
          Delivery Date:{" "}
          {new Date(requestProductDetails.deliveryDate).toLocaleDateString()}
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800">
          Location: {requestProductDetails.location}
        </span>
        <span className="text-gray-800">
          Urgent: {requestProductDetails.isUrgent ? "Yes" : "No"}
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800">
          Preferred Brand: {requestProductDetails.preferredBrand}
        </span>
        <span className="text-gray-800">
          Preferred Color: {requestProductDetails.preferredColor}
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800">
          Payment Method: {requestProductDetails.paymentMethod}
        </span>
        <span className="text-gray-800">
          Contact Number: {requestProductDetails.contactNumber}
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800">
          Approved: {requestProductDetails.isApproved ? "Yes" : "No"}
        </span>
        <span className="text-gray-800">
          Fulfilled: {requestProductDetails.isFulfilled ? "Yes" : "No"}
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800">
          Paid: {requestProductDetails.isPaid ? "Yes" : "No"}
        </span>
        <span className="text-gray-800">
          Bargain Allowed:{" "}
          {requestProductDetails.isBargainAllowed ? "Yes" : "No"}
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800">
          Sample Requested:{" "}
          {requestProductDetails.isSampleRequested ? "Yes" : "No"}
        </span>
        <span className="text-gray-800">
          Supplier Experience: {requestProductDetails.supplierExperience}
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800">
          Target Price: ${requestProductDetails.targetPrice}
        </span>
        <span className="text-gray-800">
          Estimated Order Frequency:{" "}
          {requestProductDetails.estimatedOrderFrequency}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-gray-800 mb-2">Additional Requirements:</p>
        <p className="text-gray-800">
          {requestProductDetails.additionalRequirements}
        </p>
      </div>
      <div className="mt-4">
        <p className="text-gray-800 mb-2">Tags:</p>
        <ul className="list-disc ml-4">
          {requestProductDetails.tags.map((tag, index) => (
            <li key={index} className="text-blue-600">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <p className="text-gray-800 mb-2">Attachment URLs:</p>
        <ul className="list-disc ml-4">
          {requestProductDetails.attachmentUrls.map((url, index) => (
            <li key={index}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                {url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>;
