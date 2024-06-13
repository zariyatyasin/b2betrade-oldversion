/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gKOxl3kVnnz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <>
      <header className="bg-[#2B39D1] text-gray-50 py-4 px-6 md:px-8 lg:px-10 flex items-center justify-between">
        <Link className="flex items-center gap-2 font-bold text-lg" href="#">
          <Package2Icon className="h-6 w-6" />
          <span>Acme Wholesale</span>
        </Link>
        <div className="w-full max-w-md">
          <form>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </form>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link className="hover:underline" href="#">
            Products
          </Link>
          <Link className="hover:underline" href="#">
            Pricing
          </Link>
          <Link className="hover:underline" href="#">
            About
          </Link>
          <Link className="hover:underline" href="#">
            Contact
          </Link>
        </nav>
        <div className="md:hidden">
          <Button size="icon" variant="ghost">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>
      </header>
      <main>
        <section className="bg-[#2B39D1] text-gray-50 py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Elevate Your Wholesale Experience
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl">
                Discover a seamless, modern platform for your wholesale
                business.
              </p>
              <div className="flex gap-4">
                <Button
                  className="bg-white text-[#2B39D1] hover:bg-gray-200"
                  size="lg"
                >
                  Shop Now
                </Button>
                <Button
                  className="border-white hover:bg-white hover:text-[#2B39D1]"
                  size="lg"
                  variant="outline"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-end">
              <img
                alt="Hero Image"
                className="max-w-full h-auto"
                height={600}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/600",
                  objectFit: "cover",
                }}
                width={600}
              />
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-8 lg:px-10">
            <div className="flex flex-col items-center text-center space-y-6 mb-12">
              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                Featured Products
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Discover Our Top Sellers
              </h2>
              <p className="max-w-xl text-gray-500 dark:text-gray-400 text-lg md:text-xl">
                Browse our curated selection of high-quality products for your
                wholesale business.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
                <img
                  alt="Product 1"
                  className="w-full h-48 object-cover"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold">Premium Desk Lamp</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Sleek and modern design for your office.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$99</span>
                    <Button
                      className="bg-[#2B39D1] text-gray-50 hover:bg-[#2028b1]"
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
                <img
                  alt="Product 2"
                  className="w-full h-48 object-cover"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold">Ergonomic Office Chair</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Designed for all-day comfort and support.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$249</span>
                    <Button
                      className="bg-[#2B39D1] text-gray-50 hover:bg-[#2028b1]"
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
                <img
                  alt="Product 3"
                  className="w-full h-48 object-cover"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold">
                    Wireless Conference Speaker
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    High-quality audio for your meeting rooms.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$199</span>
                    <Button
                      className="bg-[#2B39D1] text-gray-50 hover:bg-[#2028b1]"
                      size="sm"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
                <img
                  alt="Product 4"
                  className="w-full h-48 object-cover"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold">Modular Storage System</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Customizable and scalable storage solutions.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$299</span>
                    <Button
                      className="bg-[#2B39D1] text-gray-50 hover:bg-[#2028b1]"
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
        <section className="bg-[#2B39D1] text-gray-50 py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="flex justify-end">
              <img
                alt="Product Showcase"
                className="max-w-full h-auto"
                height={600}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "600/600",
                  objectFit: "cover",
                }}
                width={600}
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Streamlined Wholesale Purchasing
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-400">
                Discover a seamless, modern platform for your wholesale
                business. Browse our curated selection, filter by category, and
                checkout quickly.
              </p>
              <div className="flex gap-4">
                <Button
                  className="bg-white text-[#2B39D1] hover:bg-gray-200"
                  size="lg"
                >
                  Shop Now
                </Button>
                <Button
                  className="border-white hover:bg-white hover:text-[#2B39D1]"
                  size="lg"
                  variant="outline"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-8 lg:px-10">
            <div className="flex flex-col items-center text-center space-y-6 mb-12">
              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                Why Choose Us
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                The Benefits of Acme Wholesale
              </h2>
              <p className="max-w-xl text-gray-500 dark:text-gray-400 text-lg md:text-xl">
                Discover why leading businesses trust Acme Wholesale for their
                purchasing needs.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 space-y-4">
                <BoltIcon className="h-10 w-10 text-[#2B39D1]" />
                <h3 className="text-xl font-bold">Fast Delivery</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get your orders shipped quickly and efficiently.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 space-y-4">
                <ShieldCheckIcon className="h-10 w-10 text-[#2B39D1]" />
                <h3 className="text-xl font-bold">Secure Transactions</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Rest assured your data and payments are safe with us.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 space-y-4">
                <HeadphonesIcon className="h-10 w-10 text-[#2B39D1]" />
                <h3 className="text-xl font-bold">Dedicated Support</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our team is here to assist you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#2B39D1] text-gray-50 py-8 px-4 md:px-8 lg:px-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <Link className="flex items-center gap-2 font-bold text-lg" href="#">
            <Package2Icon className="h-6 w-6" />
            <span>Acme Wholesale</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link className="hover:underline" href="#">
              Products
            </Link>
            <Link className="hover:underline" href="#">
              Pricing
            </Link>
            <Link className="hover:underline" href="#">
              About
            </Link>
            <Link className="hover:underline" href="#">
              Contact
            </Link>
          </nav>
          <p className="text-sm text-gray-400">
            © 2024 Acme Wholesale. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

function BoltIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function HeadphonesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
