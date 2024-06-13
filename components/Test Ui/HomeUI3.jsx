/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7pYMeLBqpEJ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] dark:bg-gray-950">
      <header className="bg-[#2B39D1] py-4 px-6 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link className="text-white font-bold text-lg" href="#">
            Wholesale Platform
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              className="text-white hover:text-gray-200 transition-colors"
              href="#"
            >
              Products
            </Link>
            <Link
              className="text-white hover:text-gray-200 transition-colors"
              href="#"
            >
              Categories
            </Link>
            <Link
              className="text-white hover:text-gray-200 transition-colors"
              href="#"
            >
              Orders
            </Link>
            <Link
              className="text-white hover:text-gray-200 transition-colors"
              href="#"
            >
              Suppliers
            </Link>
            <Link
              className="text-white hover:text-gray-200 transition-colors"
              href="#"
            >
              Analytics
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              className="text-white hover:bg-white hover:text-[#2B39D1] transition-colors"
              variant="outline"
            >
              Sign In
            </Button>
            <Button className="bg-white text-[#2B39D1] hover:bg-gray-200 transition-colors">
              Sign Up
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-12 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#2B39D1]">
              Streamline Your Wholesale Purchasing
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Discover a vast selection of high-quality products, with intuitive
              search and filtering tools to help you find exactly what you need.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-[#2B39D1] text-white hover:bg-[#2131b1] transition-colors">
                Explore Products
              </Button>
              <Button
                className="text-[#2B39D1] hover:bg-[#2B39D1] hover:text-white transition-colors"
                variant="outline"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div>
            <img
              alt="Wholesale Platform"
              className="rounded-lg object-cover w-full"
              height={400}
              src="/placeholder.svg"
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width={600}
            />
          </div>
        </div>
      </main>
      <section className="bg-white dark:bg-gray-900 py-12 px-6 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#2B39D1]">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden">
              <img
                alt="Product 1"
                className="w-full h-48 object-cover"
                height={200}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width={300}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product 1</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  High-quality product description goes here.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#2B39D1] font-bold">$19.99</span>
                  <Button
                    className="bg-[#2B39D1] text-white hover:bg-[#2131b1] transition-colors"
                    size="sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden">
              <img
                alt="Product 2"
                className="w-full h-48 object-cover"
                height={200}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width={300}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product 2</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  High-quality product description goes here.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#2B39D1] font-bold">$24.99</span>
                  <Button
                    className="bg-[#2B39D1] text-white hover:bg-[#2131b1] transition-colors"
                    size="sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden">
              <img
                alt="Product 3"
                className="w-full h-48 object-cover"
                height={200}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width={300}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product 3</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  High-quality product description goes here.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#2B39D1] font-bold">$29.99</span>
                  <Button
                    className="bg-[#2B39D1] text-white hover:bg-[#2131b1] transition-colors"
                    size="sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md overflow-hidden">
              <img
                alt="Product 4"
                className="w-full h-48 object-cover"
                height={200}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width={300}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product 4</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  High-quality product description goes here.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#2B39D1] font-bold">$34.99</span>
                  <Button
                    className="bg-[#2B39D1] text-white hover:bg-[#2131b1] transition-colors"
                    size="sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-[#2B39D1] text-white py-8 px-6 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link className="text-white font-bold text-lg" href="#">
              Wholesale Platform
            </Link>
          </div>
          <nav className="flex space-x-6">
            <Link className="hover:text-gray-200 transition-colors" href="#">
              Products
            </Link>
            <Link className="hover:text-gray-200 transition-colors" href="#">
              Categories
            </Link>
            <Link className="hover:text-gray-200 transition-colors" href="#">
              Orders
            </Link>
            <Link className="hover:text-gray-200 transition-colors" href="#">
              Suppliers
            </Link>
            <Link className="hover:text-gray-200 transition-colors" href="#">
              Analytics
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
