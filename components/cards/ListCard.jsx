/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon, MailIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function ListCard({ notProcessedOrders }) {
  console.log(notProcessedOrders);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {notProcessedOrders.map((order) => (
          <li key={order._id}>
            <Link
              href={`/admin/dashboard/order`}
              className="block hover:bg-gray-50"
            >
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    {/* Assuming there's an imageUrl property in the product object */}
                    <img
                      className="h-12 w-12 rounded-full"
                      src={order.products[0]?.image || ""}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {order.orderNumber}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <MailIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">
                          {order.shippingAddress.fullName}
                        </span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Order Number: {order.orderNumber}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <span>Status: {order.status}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
