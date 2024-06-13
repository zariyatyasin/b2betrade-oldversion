/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Xeqty5OeQGY
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

export default function Component() {
  return (
    <>
      <header className="bg-gray-950 text-gray-50 px-4 md:px-6 py-4 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="font-semibold text-lg">Acme Wholesale</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium hover:text-gray-300 transition-colors">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-[800px] grid grid-cols-4 gap-4 p-4">
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto w-full items-start gap-2 rounded-md bg-gray-900/50 p-4 hover:bg-gray-800/50 transition-colors"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Furniture
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-400">
                        Desks, chairs, tables, and more for your office.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto w-full items-start gap-2 rounded-md bg-gray-900/50 p-4 hover:bg-gray-800/50 transition-colors"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Electronics
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-400">
                        Laptops, monitors, printers, and more for your business.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto w-full items-start gap-2 rounded-md bg-gray-900/50 p-4 hover:bg-gray-800/50 transition-colors"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Office Supplies
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-400">
                        Pens, paper, folders, and more for your workspace.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto w-full items-start gap-2 rounded-md bg-gray-900/50 p-4 hover:bg-gray-800/50 transition-colors"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Breakroom
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-400">
                        Appliances, snacks, and more for your breakroom.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto w-full items-start gap-2 rounded-md bg-gray-900/50 p-4 hover:bg-gray-800/50 transition-colors"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Technology
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-400">
                        Computers, software, and more for your business.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto w-full items-start gap-2 rounded-md bg-gray-900/50 p-4 hover:bg-gray-800/50 transition-colors"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Cleaning & Facilities
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-400">
                        Janitorial supplies, equipment, and more for your
                        workspace.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto w-full items-start gap-2 rounded-md bg-gray-900/50 p-4 hover:bg-gray-800/50 transition-colors"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Safety & PPE
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-400">
                        Protective equipment, first aid, and more for your
                        workplace.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      className="group grid h-auto w-full items-start gap-2 rounded-md bg-gray-900/50 p-4 hover:bg-gray-800/50 transition-colors"
                      href="#"
                    >
                      <div className="text-sm font-medium leading-none group-hover:underline">
                        Breakroom
                      </div>
                      <div className="line-clamp-2 text-sm leading-snug text-gray-400">
                        Appliances, snacks, and more for your breakroom.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="font-medium hover:text-gray-300 transition-colors"
                  href="#"
                >
                  Deals
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="font-medium hover:text-gray-300 transition-colors"
                  href="#"
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="font-medium hover:text-gray-300 transition-colors"
                  href="#"
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="rounded-full" size="icon" variant="ghost">
            <SearchIcon className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button className="rounded-full" size="icon" variant="ghost">
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button size="sm" variant="solid">
            Sign In
          </Button>
        </div>
      </header>
      <main>
        <section className="bg-gray-950 text-gray-50 py-20 md:py-32">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Elevate Your Business with Acme Wholesale
              </h1>
              <p className="text-lg md:text-xl text-gray-400">
                Discover a vast selection of high-quality products for your
                business at wholesale prices. Streamline your procurement
                process and focus on growth.
              </p>
              <div className="flex gap-4">
                <Button size="lg" variant="solid">
                  Shop Now
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                alt="Hero Image"
                className="rounded-lg"
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
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View</span>
                </Link>
                <img
                  alt="Product 1"
                  className="object-cover w-full h-64"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/400",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <div className="bg-gray-950 text-gray-50 p-4">
                  <h3 className="font-bold text-xl">Ergonomic Office Chair</h3>
                  <p className="text-sm text-gray-400">
                    Comfortable and supportive
                  </p>
                  <h4 className="font-semibold text-lg md:text-xl">$199.99</h4>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View</span>
                </Link>
                <img
                  alt="Product 2"
                  className="object-cover w-full h-64"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/400",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <div className="bg-gray-950 text-gray-50 p-4">
                  <h3 className="font-bold text-xl">
                    Wireless Conference Phone
                  </h3>
                  <p className="text-sm text-gray-400">
                    Clear audio for meetings
                  </p>
                  <h4 className="font-semibold text-lg md:text-xl">$299.99</h4>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View</span>
                </Link>
                <img
                  alt="Product 3"
                  className="object-cover w-full h-64"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/400",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <div className="bg-gray-950 text-gray-50 p-4">
                  <h3 className="font-bold text-xl">
                    High-Speed Laser Printer
                  </h3>
                  <p className="text-sm text-gray-400">
                    Fast and reliable printing
                  </p>
                  <h4 className="font-semibold text-lg md:text-xl">$399.99</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-950 text-gray-50 py-12 md:py-20">
          <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                alt="Featured Product"
                className="rounded-lg"
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Discover Our Featured Product
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                Check out our latest and greatest product, designed to
                streamline your business operations.
              </p>
              <div className="flex gap-4">
                <Button size="lg" variant="solid">
                  Learn More
                </Button>
                <Button size="lg" variant="outline">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View</span>
                </Link>
                <img
                  alt="Product 4"
                  className="object-cover w-full h-64"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/400",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <div className="bg-gray-950 text-gray-50 p-4">
                  <h3 className="font-bold text-xl">
                    Adjustable Standing Desk
                  </h3>
                  <p className="text-sm text-gray-400">
                    Promote healthy posture
                  </p>
                  <h4 className="font-semibold text-lg md:text-xl">$499.99</h4>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View</span>
                </Link>
                <img
                  alt="Product 5"
                  className="object-cover w-full h-64"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/400",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <div className="bg-gray-950 text-gray-50 p-4">
                  <h3 className="font-bold text-xl">High-Performance Laptop</h3>
                  <p className="text-sm text-gray-400">
                    Powerful for business tasks
                  </p>
                  <h4 className="font-semibold text-lg md:text-xl">
                    $1,099.99
                  </h4>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View</span>
                </Link>
                <img
                  alt="Product 6"
                  className="object-cover w-full h-64"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "500/400",
                    objectFit: "cover",
                  }}
                  width={500}
                />
                <div className="bg-gray-950 text-gray-50 p-4">
                  <h3 className="font-bold text-xl">
                    Noise-Cancelling Headphones
                  </h3>
                  <p className="text-sm text-gray-400">
                    Immersive audio experience
                  </p>
                  <h4 className="font-semibold text-lg md:text-xl">$249.99</h4>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
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

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
