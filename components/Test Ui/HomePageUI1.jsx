/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZEZrkwURxRx
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#0d0d0d] text-white py-4 px-6 flex items-center justify-between md:px-8 lg:px-10">
        <Link className="text-2xl font-bold" href="#">
          Futura
        </Link>
        <nav className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <Link
            className="hover:text-[#8c8c8c] transition-colors hidden md:block"
            href="#"
          >
            Shop
          </Link>
          <Link
            className="hover:text-[#8c8c8c] transition-colors hidden md:block"
            href="#"
          >
            About
          </Link>
          <Link
            className="hover:text-[#8c8c8c] transition-colors hidden md:block"
            href="#"
          >
            Contact
          </Link>
          <Button
            className="px-3 py-2 rounded-full hidden md:flex"
            variant="outline"
          >
            <SearchIcon className="w-5 h-5" />
          </Button>
          <Button
            className="px-3 py-2 rounded-full bg-[#8c8c8c] hover:bg-[#a6a6a6] transition-colors hidden md:flex"
            variant="solid"
          >
            Cart
          </Button>
          <Button
            className="px-2 py-2 rounded-full md:hidden"
            size="icon"
            variant="outline"
          >
            <MenuIcon className="w-6 h-6" />
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="bg-[#0d0d0d] text-white py-12 px-6 flex flex-col items-center justify-center md:py-20 md:px-8 lg:py-24 lg:px-10">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl lg:text-6xl">
            Welcome to Futura
          </h1>
          <p className="text-lg mb-8 md:text-xl lg:text-2xl">
            Discover the future of e-commerce
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              className="px-6 py-3 rounded-full bg-[#8c8c8c] hover:bg-[#a6a6a6] transition-colors"
              variant="solid"
            >
              Shop Now
            </Button>
            <Button
              className="px-6 py-3 rounded-full border-[#8c8c8c] hover:border-[#a6a6a6] transition-colors"
              variant="outline"
            >
              Learn More
            </Button>
          </div>
        </section>
        <section className="bg-[#1a1a1a] text-white py-12 px-6 md:py-20 md:px-8 lg:py-24 lg:px-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 md:text-4xl lg:text-5xl">
                Featured Products
              </h2>
              <p className="text-lg mb-8 md:text-xl lg:text-2xl">
                Discover our latest innovative products
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8">
                <div className="bg-[#0d0d0d] rounded-lg overflow-hidden">
                  <img
                    alt="Product 1"
                    className="w-full h-48 object-cover sm:h-56 md:h-64 lg:h-72"
                    height={300}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/300",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Product 1
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $99.99
                    </p>
                  </div>
                </div>
                <div className="bg-[#0d0d0d] rounded-lg overflow-hidden">
                  <img
                    alt="Product 2"
                    className="w-full h-48 object-cover sm:h-56 md:h-64 lg:h-72"
                    height={300}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/300",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Product 2
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $149.99
                    </p>
                  </div>
                </div>
                <div className="bg-[#0d0d0d] rounded-lg overflow-hidden">
                  <img
                    alt="Product 3"
                    className="w-full h-48 object-cover sm:h-56 md:h-64 lg:h-72"
                    height={300}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/300",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Product 3
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $79.99
                    </p>
                  </div>
                </div>
                <div className="bg-[#0d0d0d] rounded-lg overflow-hidden">
                  <img
                    alt="Product 4"
                    className="w-full h-48 object-cover sm:h-56 md:h-64 lg:h-72"
                    height={300}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/300",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Product 4
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $199.99
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 md:text-4xl lg:text-5xl">
                Personalized Recommendations
              </h2>
              <p className="text-lg mb-8 md:text-xl lg:text-2xl">
                Our AI-driven recommendations are tailored to your preferences
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8">
                <div className="bg-[#0d0d0d] rounded-lg overflow-hidden">
                  <img
                    alt="Recommendation 1"
                    className="w-full h-48 object-cover sm:h-56 md:h-64 lg:h-72"
                    height={300}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/300",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Recommendation 1
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $79.99
                    </p>
                  </div>
                </div>
                <div className="bg-[#0d0d0d] rounded-lg overflow-hidden">
                  <img
                    alt="Recommendation 2"
                    className="w-full h-48 object-cover sm:h-56 md:h-64 lg:h-72"
                    height={300}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/300",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Recommendation 2
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $99.99
                    </p>
                  </div>
                </div>
                <div className="bg-[#0d0d0d] rounded-lg overflow-hidden">
                  <img
                    alt="Recommendation 3"
                    className="w-full h-48 object-cover sm:h-56 md:h-64 lg:h-72"
                    height={300}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/300",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Recommendation 3
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $129.99
                    </p>
                  </div>
                </div>
                <div className="bg-[#0d0d0d] rounded-lg overflow-hidden">
                  <img
                    alt="Recommendation 4"
                    className="w-full h-48 object-cover sm:h-56 md:h-64 lg:h-72"
                    height={300}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/300",
                      objectFit: "cover",
                    }}
                    width={300}
                  />
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Recommendation 4
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $149.99
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#0d0d0d] text-white py-12 px-6 md:py-20 md:px-8 lg:py-24 lg:px-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 md:text-4xl lg:text-5xl">
                Innovative Products
              </h2>
              <p className="text-lg mb-8 md:text-xl lg:text-2xl">
                Discover our latest cutting-edge products
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8">
                <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Product 1
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $199.99
                    </p>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Product 2
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $249.99
                    </p>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Product 3
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $179.99
                    </p>
                  </div>
                </div>
                <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">
                      Product 4
                    </h3>
                    <p className="text-lg font-medium text-[#8c8c8c] md:text-xl lg:text-2xl">
                      $299.99
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 md:text-4xl lg:text-5xl">
                Futuristic Visuals
              </h2>
              <p className="text-lg mb-8 md:text-xl lg:text-2xl">
                Experience our products in stunning, futuristic environments
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8" />
            </div>
          </div>
        </section>
      </main>
    </div>
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
