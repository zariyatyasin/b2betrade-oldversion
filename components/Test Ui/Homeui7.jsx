/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sXjuAZeQllD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <>
      <section className="bg-gray-100 py-20 md:py-32 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Unlock the Power of Wholesale
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                Discover our extensive product catalog and streamline your
                business with our wholesale offerings.
              </p>
              <Link
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-100"
                href="#"
              >
                Explore Catalog
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Welcome back, [Username]!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Check out our latest product recommendations just for you.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  New Arrivals
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore our latest wholesale products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Browse Our Catalog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Link
              className="bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
              href="#"
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-t-md">
                <img
                  alt="Electronics"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Electronics
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore our wide range of electronic products.
                </p>
              </div>
            </Link>
            <Link
              className="bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
              href="#"
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-t-md">
                <img
                  alt="Apparel"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Apparel
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Browse our collection of high-quality apparel.
                </p>
              </div>
            </Link>
            <Link
              className="bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
              href="#"
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-t-md">
                <img
                  alt="Home Decor"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Home Decor
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover our stylish home decor products.
                </p>
              </div>
            </Link>
            <Link
              className="bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
              href="#"
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-t-md">
                <img
                  alt="Furniture"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Furniture
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore our high-quality furniture collection.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-20 md:py-32 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-t-md">
                <img
                  alt="Product 1"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Product 1
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  High-quality product with great features.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    $49.99
                  </span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-t-md">
                <img
                  alt="Product 2"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Product 2
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Durable and reliable product for your business.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    $79.99
                  </span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-t-md">
                <img
                  alt="Product 3"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Product 3
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Innovative product with cutting-edge features.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    $99.99
                  </span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-t-md">
                <img
                  alt="Product 4"
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Product 4
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Versatile product for your business needs.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    $59.99
                  </span>
                  <Button size="sm" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
