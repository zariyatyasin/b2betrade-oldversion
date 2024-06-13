/**
 * v0 by Vercel.
 * @see https://v0.dev/t/olskITwCtbr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import {
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { CardContent, Card } from "@/components/ui/card";

export default function Component() {
  return (
    <>
      <header className="bg-gray-900 text-white py-4 px-6 md:px-8 lg:px-10 flex items-center justify-between">
        <Link className="flex items-center gap-2 font-bold text-xl" href="#">
          <PackageIcon className="w-6 h-6" />
          Acme Wholesale
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Categories
                  <ChevronDownIcon className="w-4 h-4 ml-2" />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-[800px] grid grid-cols-4 gap-4 p-4">
                  <NavigationMenuLink asChild>
                    <Link
                      className="group flex flex-col gap-2 p-4 rounded-md hover:bg-gray-800"
                      href="#"
                    >
                      <ShirtIcon className="w-8 h-8 text-primary" />
                      <span className="font-medium group-hover:underline">
                        Apparel
                      </span>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        Explore our wide selection of clothing and accessories.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group flex flex-col gap-2 p-4 rounded-md hover:bg-gray-800"
                      href="#"
                    >
                      <CoffeeIcon className="w-8 h-8 text-primary" />
                      <span className="font-medium group-hover:underline">
                        Home & Kitchen
                      </span>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        Find high-quality home goods and kitchen essentials.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group flex flex-col gap-2 p-4 rounded-md hover:bg-gray-800"
                      href="#"
                    >
                      <BoxIcon className="w-8 h-8 text-primary" />
                      <span className="font-medium group-hover:underline">
                        Tools & Hardware
                      </span>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        Discover our selection of professional-grade tools and
                        hardware.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group flex flex-col gap-2 p-4 rounded-md hover:bg-gray-800"
                      href="#"
                    >
                      <TruckIcon className="w-8 h-8 text-primary" />
                      <span className="font-medium group-hover:underline">
                        Automotive
                      </span>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        Browse our collection of automotive parts and
                        accessories.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group flex flex-col gap-2 p-4 rounded-md hover:bg-gray-800"
                      href="#"
                    >
                      <GamepadIcon className="w-8 h-8 text-primary" />
                      <span className="font-medium group-hover:underline">
                        Electronics
                      </span>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        Explore our selection of cutting-edge electronics.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group flex flex-col gap-2 p-4 rounded-md hover:bg-gray-800"
                      href="#"
                    >
                      <FlowerIcon className="w-8 h-8 text-primary" />
                      <span className="font-medium group-hover:underline">
                        Garden & Outdoor
                      </span>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        Find everything you need for your outdoor space.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group flex flex-col gap-2 p-4 rounded-md hover:bg-gray-800"
                      href="#"
                    >
                      <ToyBrickIcon className="w-8 h-8 text-primary" />
                      <span className="font-medium group-hover:underline">
                        Toys & Games
                      </span>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        Discover our wide selection of toys and games.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group flex flex-col gap-2 p-4 rounded-md hover:bg-gray-800"
                      href="#"
                    >
                      <BriefcaseIcon className="w-8 h-8 text-primary" />
                      <span className="font-medium group-hover:underline">
                        Office & Supplies
                      </span>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        Browse our collection of office essentials and supplies.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link className="hover:underline" href="#">
            Deals
          </Link>
          <Link className="hover:underline" href="#">
            About
          </Link>
          <Link className="hover:underline" href="#">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            className="hidden md:inline-flex"
            size="icon"
            variant="outline"
          >
            <SearchIcon className="w-5 h-5" />
            <span className="sr-only">Search</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="outline">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height={32}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width={32}
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem>Wishlist</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main>
        <section className="bg-gray-900 text-white py-20 px-6 md:px-8 lg:px-10">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Wholesale Products for Your Business
              </h1>
              <p className="text-lg text-gray-300">
                Discover a vast selection of high-quality wholesale products
                across multiple categories. Streamline your purchasing and grow
                your business.
              </p>
              <div className="flex gap-4">
                <Button size="lg">Shop Now</Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <img
              alt="Hero Image"
              className="rounded-xl object-cover"
              height={600}
              src="/placeholder.svg"
              style={{
                aspectRatio: "800/600",
                objectFit: "cover",
              }}
              width={800}
            />
          </div>
        </section>
        <section className="py-16 px-6 md:px-8 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Featured Categories</h2>
              <Link className="text-primary hover:underline" href="#">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link className="group" href="#">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    alt="Apparel"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    height={200}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                </div>
                <h3 className="mt-4 font-medium group-hover:text-primary transition-colors">
                  Apparel
                </h3>
              </Link>
              <Link className="group" href="#">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    alt="Home & Kitchen"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    height={200}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                </div>
                <h3 className="mt-4 font-medium group-hover:text-primary transition-colors">
                  Home & Kitchen
                </h3>
              </Link>
              <Link className="group" href="#">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    alt="Tools & Hardware"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    height={200}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                </div>
                <h3 className="mt-4 font-medium group-hover:text-primary transition-colors">
                  Tools & Hardware
                </h3>
              </Link>
              <Link className="group" href="#">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    alt="Automotive"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    height={200}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                </div>
                <h3 className="mt-4 font-medium group-hover:text-primary transition-colors">
                  Automotive
                </h3>
              </Link>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6 md:px-8 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Top Deals</h2>
              <Link className="text-primary hover:underline" href="#">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <img
                  alt="Product Image"
                  className="w-full h-48 object-cover rounded-t-lg"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">
                    Ergonomic Office Chair
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Comfortable and adjustable for all-day use.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold">$99.99</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Product Image"
                  className="w-full h-48 object-cover rounded-t-lg"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">
                    High-Performance Blender
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Powerful motor and durable stainless steel blades.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold">$79.99</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img
                  alt="Product Image"
                  className="w-full h-48 object-cover rounded-t-lg"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">Heavy-Duty Tool Set</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Professional-grade tools for the workshop or jobsite.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold">$149.99</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-8 px-6 md:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:underline" href="#">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="#">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="#">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:underline" href="#">
                  Apparel
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="#">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="#">
                  Tools & Hardware
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="#">
                  Automotive
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4" />
        </div>
      </footer>
    </>
  );
}

function BoxIcon(props) {
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
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function BriefcaseIcon(props) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CoffeeIcon(props) {
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
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
      <path d="M6 2v2" />
    </svg>
  );
}

function FlowerIcon(props) {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" />
      <path d="M12 7.5V9" />
      <path d="M7.5 12H9" />
      <path d="M16.5 12H15" />
      <path d="M12 16.5V15" />
      <path d="m8 8 1.88 1.88" />
      <path d="M14.12 9.88 16 8" />
      <path d="m8 16 1.88-1.88" />
      <path d="M14.12 14.12 16 16" />
    </svg>
  );
}

function GamepadIcon(props) {
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
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="2" />
    </svg>
  );
}

function PackageIcon(props) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
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

function ShirtIcon(props) {
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
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}

function ToyBrickIcon(props) {
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
      <rect width="18" height="12" x="3" y="8" rx="1" />
      <path d="M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3" />
      <path d="M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3" />
    </svg>
  );
}

function TruckIcon(props) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}
