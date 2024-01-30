import React, { useState } from "react";
import ChatBox from "../../components/chat/ChatBox";
import Link from "next/link";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import Image from "next/image";
export default function StoreSide({ store }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };
  const modifyImageUrl = (url) => {
    const uploadIndex = url?.indexOf("/upload/");
    if (uploadIndex !== -1) {
      const modifiedUrl =
        url?.slice(0, uploadIndex + 8) +
        "f_auto,q_auto/" +
        url?.slice(uploadIndex + 8);
      return modifiedUrl;
    }
    return url;
  };
  const imageUrl =
    store?.image.length > 0
      ? modifyImageUrl(store.image[0]?.url)
      : "https://res.cloudinary.com/drtexlmq7/image/upload/v1705749427/bvxioa50sceeggcjqbuk.png";

  return (
    <div className=" mx-auto  rounded-md  overflow-hidden shadow   max-w-xs">
      <div className="flex justify-center  ">
        <Image
          height={128}
          width={280}
          src={imageUrl}
          alt=""
          className=" w-full max-h-32  object-cover "
        />
      </div>
      <div className="   bg-white   rounded-md   p-4">
        <div className="mt-2 text-center">
          {
            <div className="flex items-center justify-center mt-2">
              <div className="font-bold text-xl">{store?.storeName}</div>
              <img
                src="https://www.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
                className="h-4 w-4 ml-2 rounded-full"
                alt="Verified Badge"
              />
            </div>
          }
          <p className="text-gray-400 font-medium text-sm mt-2 uppercase">
            {store?.storeType}
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <Link href={`/store/${store?._id}`}>
            <button className="py-2 w-32 bg-[#2B39D1] text-sm rounded-md border border-[#2B39D1] text-white mr-2">
              View Store
            </button>
          </Link>
          <button
            onClick={handleOpenChat}
            className="py-2 w-32 bg-[#2B39D1] text-sm rounded-md border border-[#2B39D1] text-white"
          >
            Message
          </button>
        </div>

        <div className="flex items-center justify-between mt-6 px-2">
          <div className="text-center">
            <p className="text-gray-500 font-medium text-xs">Store rating</p>
            <div className="text-sm font-bold">4.9/5</div>
          </div>
          <div className="text-center">
            <p className="text-gray-500 font-medium text-xs">
              On-time delivery rate
            </p>
            <div className="text-sm font-bold">100.0%</div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 px-2">
          <div className="text-center">
            <p className="text-gray-500 font-medium text-xs">Location</p>
            <div className="text-sm font-bold">{store?.address.city} </div>
          </div>
          <div className="text-center">
            <p className="text-gray-500 font-medium text-xs">Floorspace</p>
            <div className="text-sm font-bold">7000m²</div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 px-2">
          <div className="text-center">
            <p className="text-gray-500 font-medium text-xs">Eco Pacaging</p>
            <div className="  text-green-500">
              <EnergySavingsLeafOutlinedIcon />
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-500 font-medium text-xs">Eco Rating</p>
            <div className="text-sm font-bold">3.45</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-gray-500  text-xs  ">Services</h3>
          <div className="mt-2 text-xs  r">
            <p>{store?.description}</p>
          </div>
        </div>
      </div>

      {/* {isChatOpen && (
        <ChatBox storeName={store.storeName} onClose={handleCloseChat} />
      )} */}
    </div>
  );
}
