import React from "react";
import StoreCard from "../cards/StoreCard";

export default function Table({ headers, data, CardComponent }) {
  return (
    <div className=" ">
      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8  ">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg ">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.values(headers).map((header, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.map((data, id) => (
                    // <StoreCard data={data} key={id} />
                    <CardComponent key={id} data={data} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
