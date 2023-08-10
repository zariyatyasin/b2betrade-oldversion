"use client";
import React, { useState } from "react";
import { SudzarSale } from "./SudzarSale";
import { SudzarUnderMoney } from "./SudzarUnderMoney";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("SudzarWomenSale");

  const tabs = [
    { name: "SudzarWomenSale", label: "Sudzar Women Sale" },
    { name: "UpTo90", label: "Up to 90%" },
    { name: "Under500", label: "Under 500 tk" },
    { name: "Buy3Get60", label: "Buy 3 Get 60% Off" },
  ];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="text-center  px-2 sm:px-4 lg:px-8 mb-12 md:mb-14 lg:mb-16">
      <div className="flex box-content py-2 relative justify-center overflow-x-auto xl:overflow-visible   rounded-lg">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`cursor-pointer whitespace-nowrap ml-8 py-2 px-4 rounded  font-medium text-lg transition ${
              activeTab === tab.name
                ? "text-gray-900 underline underline-offset-8"
                : "text-gray-500 underline-offset-8 hover:text-gray-900 hover:underline"
            }`}
            onClick={() => handleTabClick(tab.name)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="mt-8">
        {activeTab === "SudzarWomenSale" && (
          <div>
            <SudzarSale />
            <button className="mt-2 bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
              View All
            </button>
          </div>
        )}
        {activeTab === "UpTo90" && (
          <div>
            <SudzarUnderMoney />
            <button className="mt-2 bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
              View All
            </button>
          </div>
        )}
        {activeTab === "Under500" && (
          <div>
            <p>Products under 500 tk</p>
            <button className="mt-2 bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
              View All
            </button>
          </div>
        )}
        {activeTab === "Buy3Get60" && (
          <div>
            <p>Buy 3 Get 60% off products</p>
            <button className="mt-2 bg-gray-900 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
              View All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
