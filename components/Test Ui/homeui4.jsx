/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aIG9vzdMzDr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

export default function Component() {
  return (
    <main className="flex flex-col h-screen">
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link className="text-2xl font-bold text-[#2B39D1]" href="#">
            B2BeTrade
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Categories
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Suppliers
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Orders
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Reports
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              className="bg-gray-100 dark:bg-gray-800 border-none shadow-none pl-8 pr-4 py-2 rounded-md text-sm w-[300px]"
              placeholder="Search products..."
              type="search"
            />
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <Button className="hidden md:inline-flex" variant="primary">
            Sell on B2BeTrade
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 p-6">
        <div className="hidden md:block">
          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <nav className="grid gap-2">
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 font-medium"
                href="#"
              >
                Apparel
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 font-medium"
                href="#"
              >
                Electronics
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 font-medium"
                href="#"
              >
                Home & Garden
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 font-medium"
                href="#"
              >
                Beauty & Personal Care
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 font-medium"
                href="#"
              >
                Sports & Outdoors
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 font-medium"
                href="#"
              >
                Toys & Games
              </Link>
            </nav>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Discover the latest wholesale products from top suppliers.
              </p>
            </div>
            <Button size="sm" variant="primary">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <img
                alt="Product Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Wireless Headphones
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  High-quality audio with long-lasting battery life.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2B39D1] font-bold">$49.99</span>
                  <Button size="sm" variant="primary">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <img
                alt="Product Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Ergonomic Office Chair
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Comfortable and adjustable for long work sessions.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2B39D1] font-bold">$129.99</span>
                  <Button size="sm" variant="primary">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <img
                alt="Product Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Outdoor Camping Gear
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Durable and reliable equipment for your next adventure.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2B39D1] font-bold">$79.99</span>
                  <Button size="sm" variant="primary">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <img
                alt="Product Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Kitchen Appliances
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  High-performance tools for your commercial kitchen.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2B39D1] font-bold">$199.99</span>
                  <Button size="sm" variant="primary">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <img
                alt="Product Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Fitness Equipment
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Durable and reliable gear for your gym or studio.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2B39D1] font-bold">$299.99</span>
                  <Button size="sm" variant="primary">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <img
                alt="Product Image"
                className="w-full h-48 object-cover"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "cover",
                }}
                width={400}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Beauty Supplies</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  High-quality cosmetics and personal care products.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#2B39D1] font-bold">$39.99</span>
                  <Button size="sm" variant="primary">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
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
