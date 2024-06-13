/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wbEWk8H64HO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function Component() {
  return (
    <>
      <section className="relative w-full h-[80vh] min-h-[600px] bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950 to-transparent" />
        <span className="w-full h-full object-cover opacity-50 rounded-md bg-muted" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-50 mb-4 tracking-tight">
            Elevate Your Wholesale Experience
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
            Discover a vast selection of high-quality products, tailored
            pricing, and seamless ordering for your business.
          </p>
          <Link
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary-500 px-8 text-base font-medium text-gray-50 shadow-sm transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            href="#"
          >
            Explore Products
          </Link>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="#">
                <img
                  alt="Electronics"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-gray-50">
                  <h3 className="text-lg font-semibold">Electronics</h3>
                  <p className="text-sm">Laptops, Phones, Accessories</p>
                </div>
              </Link>
            </div>
            <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="#">
                <img
                  alt="Apparel"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-gray-50">
                  <h3 className="text-lg font-semibold">Apparel</h3>
                  <p className="text-sm">Clothing, Accessories, Footwear</p>
                </div>
              </Link>
            </div>
            <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="#">
                <img
                  alt="Home"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-gray-50">
                  <h3 className="text-lg font-semibold">Home</h3>
                  <p className="text-sm">Furniture, Decor, Kitchenware</p>
                </div>
              </Link>
            </div>
            <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="#">
                <img
                  alt="Beauty"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-gray-50">
                  <h3 className="text-lg font-semibold">Beauty</h3>
                  <p className="text-sm">Cosmetics, Skincare, Haircare</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20 bg-gray-100 dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Featured Products
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Discover our top-selling products across various categories.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="#">
                    <img
                      alt="Product 1"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      height={400}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "400/400",
                        objectFit: "cover",
                      }}
                      width={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-gray-50">
                      <h3 className="text-lg font-semibold">Product 1</h3>
                      <p className="text-sm">$49.99</p>
                    </div>
                  </Link>
                </div>
                <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="#">
                    <img
                      alt="Product 2"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      height={400}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "400/400",
                        objectFit: "cover",
                      }}
                      width={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-gray-50">
                      <h3 className="text-lg font-semibold">Product 2</h3>
                      <p className="text-sm">$79.99</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Exclusive Deals
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Check out our limited-time offers and discounts.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="#">
                    <img
                      alt="Product 3"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      height={400}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "400/400",
                        objectFit: "cover",
                      }}
                      width={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-gray-50">
                      <h3 className="text-lg font-semibold">Product 3</h3>
                      <p className="text-sm">$39.99</p>
                    </div>
                  </Link>
                </div>
                <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="#">
                    <img
                      alt="Product 4"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      height={400}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "400/400",
                        objectFit: "cover",
                      }}
                      width={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 text-gray-50">
                      <h3 className="text-lg font-semibold">Product 4</h3>
                      <p className="text-sm">$59.99</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
