/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TMlsi4Zp7Gi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-gray-950 text-gray-50 px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Wholesale</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Products
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Categories
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Suppliers
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-gray-950 text-gray-50">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Revolutionize Your Wholesale Buying Experience
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl dark:text-gray-400">
                  Discover a seamless and efficient way to source the best
                  wholesale products for your business.
                </p>
                <div className="space-x-4 mt-6">
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
                    href="#"
                  >
                    Browse Products
                  </Link>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm">
                  Featured Products
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover the Best Wholesale Deals
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl dark:text-gray-400">
                  Browse our curated selection of top-selling wholesale products
                  across various categories.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View Product</span>
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
                <div className="bg-gray-950 p-4">
                  <h3 className="font-bold text-xl text-gray-50">
                    Premium Leather Backpack
                  </h3>
                  <p className="text-sm text-gray-400">Durable and stylish</p>
                  <h4 className="font-semibold text-lg md:text-xl text-primary">
                    $49.99
                  </h4>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View Product</span>
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
                <div className="bg-gray-950 p-4">
                  <h3 className="font-bold text-xl text-gray-50">
                    Stainless Steel Cookware Set
                  </h3>
                  <p className="text-sm text-gray-400">
                    Professional-grade quality
                  </p>
                  <h4 className="font-semibold text-lg md:text-xl text-primary">
                    $99.99
                  </h4>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View Product</span>
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
                <div className="bg-gray-950 p-4">
                  <h3 className="font-bold text-xl text-gray-50">
                    Ergonomic Office Chair
                  </h3>
                  <p className="text-sm text-gray-400">
                    Comfortable and supportive
                  </p>
                  <h4 className="font-semibold text-lg md:text-xl text-primary">
                    $149.99
                  </h4>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                <Link className="absolute inset-0 z-10" href="#">
                  <span className="sr-only">View Product</span>
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
                <div className="bg-gray-950 p-4">
                  <h3 className="font-bold text-xl text-gray-50">
                    High-Performance Blender
                  </h3>
                  <p className="text-sm text-gray-400">
                    Powerful and versatile
                  </p>
                  <h4 className="font-semibold text-lg md:text-xl text-primary">
                    $79.99
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Explore Our Product Categories
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Browse our extensive selection of wholesale products across
                various categories to find the perfect items for your business.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Link
                className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                href="#"
              >
                <div className="bg-primary rounded-full p-2">
                  <ShirtIcon className="h-6 w-6 text-gray-50" />
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                  Clothing
                </h3>
              </Link>
              <Link
                className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                href="#"
              >
                <div className="bg-primary rounded-full p-2">
                  <CircuitBoardIcon className="h-6 w-6 text-gray-50" />
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                  Electronics
                </h3>
              </Link>
              <Link
                className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                href="#"
              >
                <div className="bg-primary rounded-full p-2">
                  <HomeIcon className="h-6 w-6 text-gray-50" />
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                  Home & Garden
                </h3>
              </Link>
              <Link
                className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                href="#"
              >
                <div className="bg-primary rounded-full p-2">
                  <SmileIcon className="h-6 w-6 text-gray-50" />
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                  Beauty & Personal Care
                </h3>
              </Link>
              <Link
                className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                href="#"
              >
                <div className="bg-primary rounded-full p-2">
                  <ClubIcon className="h-6 w-6 text-gray-50" />
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                  Sports & Outdoors
                </h3>
              </Link>
              <Link
                className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                href="#"
              >
                <div className="bg-primary rounded-full p-2">
                  <ToyBrickIcon className="h-6 w-6 text-gray-50" />
                </div>
                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                  Toys & Games
                </h3>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Featured Suppliers
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover top-rated wholesale suppliers offering high-quality
                products and reliable service.
              </p>
            </div>
            <div className="divide-y rounded-lg border dark:border-gray-800">
              <div className="grid w-full grid-cols-2 items-stretch justify-center divide-x md:grid-cols-3 lg:grid-cols-4">
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    alt="Supplier Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    height="70"
                    src="/placeholder.svg"
                    width="140"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    alt="Supplier Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    height="70"
                    src="/placeholder.svg"
                    width="140"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-8">
                  <img
                    alt="Supplier Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    height="70"
                    src="/placeholder.svg"
                    width="140"
                  />
                </div>
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                  <img
                    alt="Supplier Logo"
                    className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    height="70"
                    src="/placeholder.svg"
                    width="140"
                  />
                </div>
              </div>
              <div className="grid w-full grid-cols-2 items-stretch justify-center divide-x md:grid-cols-3 lg:grid-cols-4">
                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CircuitBoardIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M11 9h4a2 2 0 0 0 2-2V3" />
      <circle cx="9" cy="9" r="2" />
      <path d="M7 21v-4a2 2 0 0 1 2-2h4" />
      <circle cx="15" cy="15" r="2" />
    </svg>
  );
}

function ClubIcon(props) {
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
      <path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" />
      <path d="M12 17.66L12 22" />
    </svg>
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
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

function SmileIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
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
