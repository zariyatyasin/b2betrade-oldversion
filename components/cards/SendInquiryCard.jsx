import Image from "next/image";
import React from "react";

export default function SendInquiryCard({ data }) {
  const {
    quantity,
    details,
    image,
    storeId: {
      storeName,
      owner,
      address: { city, country },
    },
    productId,
    userId: { name: userName, phoneNumber, image: userImage },
  } = data;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <Image
            height={500}
            width={400}
            className="w-12 h-12 rounded-full mr-4"
            src={userImage}
            alt="User Avatar"
          />
          <div>
            <p className="text-xl font-bold">{userName}</p>
            <p className="text-gray-600">{phoneNumber}</p>
          </div>
        </div>
        <div className="mb-4">
          {image &&
            image.map((imgArray, index) => (
              <Image
                key={index}
                height={500}
                width={400}
                className="w-full h-32 object-cover mb-2 rounded"
                src={imgArray[0].url}
                alt={`Product Image ${index + 1}`}
              />
            ))}
        </div>
        <div className="mb-4">
          <p>
            <span className="font-bold">Quantity:</span> {quantity}
          </p>
          <p>
            <span className="font-bold">Details:</span> {details}
          </p>
          <p>
            <span className="font-bold">Product ID:</span> {productId}
          </p>
        </div>
        <div>
          <p>
            <span className="font-bold">Store Name:</span> {storeName}
          </p>
          <p>
            <span className="font-bold">Store Owner:</span> {owner}
          </p>
          <p>
            <span className="font-bold">Location:</span> {city}, {country}
          </p>
        </div>
      </div>
    </div>
  );
}
