/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wZpQn3RyCjC
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
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-[#2B39D1] py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link className="text-white font-bold text-xl" href="#">
            Wholesale Platform
          </Link>
          <div className="flex items-center">
            <div className="relative mr-4">
              <Input
                className="rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                placeholder="Search products..."
                type="text"
              />
              <SearchIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full border border-white/20 text-white hover:bg-white/20"
                  size="icon"
                  variant="ghost"
                >
                  <UserIcon className="h-6 w-6" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={12}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle>Bulk Clothing</CardTitle>
                <CardDescription>
                  Browse our selection of high-quality wholesale clothing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="T-Shirts"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">T-Shirts</span>
                  </Link>
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="Hoodies"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">Hoodies</span>
                  </Link>
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="Pants"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">Pants</span>
                  </Link>
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="Accessories"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">Accessories</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle>Bulk Electronics</CardTitle>
                <CardDescription>
                  Explore our selection of wholesale electronic products.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="Laptops"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">Laptops</span>
                  </Link>
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="Smartphones"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">Smartphones</span>
                  </Link>
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="Tablets"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">Tablets</span>
                  </Link>
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="Accessories"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">Accessories</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 shadow-md">
              <CardHeader>
                <CardTitle>Bulk Home Goods</CardTitle>
                <CardDescription>
                  Discover our selection of wholesale home and kitchen products.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="Furniture"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">Furniture</span>
                  </Link>
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="Kitchen Appliances"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">
                      Kitchen Appliances
                    </span>
                  </Link>
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="Decor"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">Decor</span>
                  </Link>
                  <Link
                    className="flex flex-col items-center gap-2 rounded-md bg-gray-100 p-4 text-center transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                    href="#"
                  >
                    <img
                      alt="Bedding"
                      className="h-20 w-20 object-contain"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <span className="text-sm font-medium">Bedding</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="bg-[#2B39D1] py-6 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <p>© 2023 Wholesale Platform. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link className="hover:text-gray-300" href="#">
              About
            </Link>
            <Link className="hover:text-gray-300" href="#">
              Contact
            </Link>
            <Link className="hover:text-gray-300" href="#">
              Terms of Service
            </Link>
            <Link className="hover:text-gray-300" href="#">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
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

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
