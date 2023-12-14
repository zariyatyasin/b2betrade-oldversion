import React, { useState } from "react";
import ChatBox from "../../components/chat/ChatBox";
import Link from "next/link";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
export default function StoreSide({ store }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };
  return (
    <div className=" mx-auto max-w-md">
      <div className="   bg-white   rounded-md   p-4">
        <div className="flex justify-center">
          {/* <img
            src={store.image}
            alt=""
            className="rounded-full w-24 h-24 shadow-md border-4 border-white transform hover:scale-11ß0"
          /> */}
        </div>

        <div className="mt-6 text-center">
          <div className="font-bold text-xl">{store.storeName}</div>
          {store.isVerify === "true" && (
            <div className="flex items-center justify-center mt-2">
              <img
                src="https://www.cdnlogo.com/logos/t/77/twitter-verified-badge.svg"
                className="h-4 w-4 mr-2 rounded-full"
                alt="Verified Badge"
              />
              <span className="text-gray-500">Verified</span>
            </div>
          )}
          <p className="text-gray-400 font-medium text-sm mt-2">
            UI Components Factory
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <Link href={`/store/${store._id}`}>
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
            <p className="text-gray-500 font-medium text-xs">Response time</p>
            <div className="text-sm font-bold">&le;3h</div>
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
          <h3 className="font-medium text-gray-900">Services</h3>
          <div className="mt-2 text-sm text-center">
            <p>Custom UI Design</p>
            <p>Responsive Web Development</p>
          </div>
        </div>
      </div>

      {isChatOpen && (
        <ChatBox storeName={store.storeName} onClose={handleCloseChat} />
      )}
    </div>
  );
}
