"use client";
import { CheckIcon } from "@heroicons/react/outline";
import Link from "next/link";
const features = [
  {
    name: "Wholesale Product Sourcing",
    description:
      "Direct from Manufacturers: Skip intermediaries, access wholesale prices, and build direct relationships with suppliers for cost-effective and efficient sourcing.",
  },
  {
    name: "Fast Delivery",
    description:
      "Guaranteed fast and reliable delivery services to ensure that products reach customers promptly. Enhance customer satisfaction with timely shipments and efficient logistics.",
  },
  {
    name: "Best Price Products",
    description:
      "Best Price Guarantee: Curated products at unbeatable prices, maximizing savings for users on our platform",
  },
  {
    name: "Customization Options",
    description:
      "Allow businesses to customize their orders, meeting specific requirements.",
  },

  {
    name: "Real-time Negotiation",
    description:
      "Enable live chat or negotiation features during the bidding process.",
  },

  {
    name: "Comprehensive Product Range",
    description:
      "Access to a diverse range of products catering to both B2B and B2C needs.",
  },
  {
    name: "Transparency and Trust",
    description:
      "Transparency and Trust: User reviews and ratings ensure transparency, while stringent supplier verification guarantees the legitimacy and reliability of our partners",
  },

  {
    name: "User-Friendly Interface",
    description:
      "Ensure a seamless and intuitive platform for both B2B and B2C users.",
  },
];

export default function Hero() {
  return (
    <div className="bg-white">
      <main>
        <div>
          <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
            <div className=" ">
              <div className="relative shadow-xl h-[400px]   sm:overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    className="h-full w-full object-cover"
                    src="https://res.cloudinary.com/drtexlmq7/image/upload/v1705473154/rstationProduct/tyhd2prb6e2nfzut0wyc.png"
                    alt=" B2BeTrade Logo"
                  />
                </div>

                {/* <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-white">
                      Take control of your
                    </span>
                    <span className="block text-indigo-200">
                      customer support
                    </span>
                  </h1>
                  <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                    occaecat fugiat aliqua.
                  </p>
                  <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                      >
                        Get started
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                      >
                        Live demo
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Logo cloud */}
          <div className="bg-indigo-200 bg-opacity-25">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <h2 className="max-w-md mx-auto text-3xl font-extrabold text-[#2B39D1] text-center lg:max-w-xl lg:text-left">
                  The Bangladesh&apos;s most innovative companies partner with
                  B2BeTrade.
                </h2>
                <div className="flow-root self-center mt-8 lg:mt-0">
                  <div className="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
                    <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                      <Link
                        target="_black"
                        href="https://foundry.eastdelta.edu.bd/?fbclid=IwAR00ly7RRiTJXctX-M2LSotUHBCqxXAcx-SDsV0VZSpm9aX-DVInKa-UU2Y"
                      >
                        <img
                          className=" h-24"
                          src="https://res.cloudinary.com/drtexlmq7/image/upload/v1705473890/rstationProduct/xq3ddlmymrzreswghbq9.png"
                          alt="Edu Foundry"
                        />
                      </Link>
                    </div>
                    <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                      <Link href={"https://www.cicforsdg.org/"} target="_blank">
                        <img
                          className="h-24"
                          src="https://res.cloudinary.com/drtexlmq7/image/upload/v1705473875/rstationProduct/r1ejvoguefv3sjbo9vbx.jpg"
                          alt="cicforsdg"
                        />
                      </Link>
                    </div>
                    <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                      <img
                        className="h-24"
                        src="https://res.cloudinary.com/drtexlmq7/image/upload/v1705485876/rstationProduct/fjafrfdkx6l6th44vsyo.jpg"
                        alt="Level"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="relative bg-[#2B39D1]">
          <div className="h-80 w-full absolute bottom-0 xl:inset-0 xl:h-full">
            <div className="h-full w-full xl:grid xl:grid-cols-2">
              <div className="h-full xl:relative xl:col-start-2">
                <img
                  className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                  src="https://res.cloudinary.com/drtexlmq7/image/upload/v1705475734/rstationProduct/dycgj3s5yqk1el0gvdbp.jpg"
                  alt="Md yasin"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#2B39D1] xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
                />
              </div>
            </div>
          </div>
          <div className="  mx-auto px-4 sm:px-6   lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
            <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
              <p className="mt-3 text-3xl font-extrabold text-white">
                My Story
              </p>
              <p className="mt-5 text-lg text-gray-300">
                I&apos;m Yasin, a computer science enthusiast who decided to embark
                on a thrilling journey that led to the creation of B2BeTrade in
                January 2024. Back in university, I was knee-deep in code and
                algorithms, but my mind was always buzzing with ideas beyond the
                classroom. It struck me that there was a gap in the market—a
                need for a platform that could simplify the process of
                businesses getting their hands on wholesale products straight
                from the source. And that&apos;s how the seed for B2BeTrade was
                planted.
              </p>
              <p className="mt-5 text-lg text-gray-300">
                I didn&apos;t go at it alone; I teamed up with some brilliant minds
                who shared my vision. Together, we pulled all-nighters, faced
                challenges head-on, and fine-tuned our platform to create
                something revolutionary. B2BeTrade wasn&apos;t just about building a
                website; it was about reshaping the B2B e-commerce landscape and
                fostering a community of businesses.B2BeTrade was becoming more
                than just a project—it was becoming a mission to simplify and
                enhance the way businesses connect and trade.
              </p>
              <p className="mt-5 text-lg text-gray-300">
                <span className=" text-lg font-bold">
                  A special acknowledgment
                </span>
                to the People who have played a crucial role in the success of
                this project
              </p>
            </div>
          </div>
        </div> */}
        <div className="bg-white">
          <div className="mx-auto py-12 px-4 max-w-[1400px] sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
              <div className="space-y-5 sm:space-y-4">
                <h2 className="text-3xl font-extrabold text-[#2B39D1]  tracking-tight sm:text-4xl">
                  My Story
                </h2>
                <p className="text-xl text-gray-500">
                  I&apos;m Yasin, a computer science enthusiast who decided to
                  embark on a thrilling journey that led to the creation of
                  B2BeTrade in January 2024. Back in university, I was knee-deep
                  in code and algorithms, but my mind was always buzzing with
                  ideas beyond the classroom. It struck me that there was a gap
                  in the market—a need for a platform that could simplify the
                  process of businesses getting their hands on wholesale
                  products straight from the source. And that&apos;s how the
                  seed for B2BeTrade was planted. I didn&apos;t go at it alone;
                  I teamed up with some brilliant minds who shared my vision.{" "}
                  <span className=" text-lg font-bold">
                    A special acknowledgment
                  </span>
                  <span>
                    {" "}
                    to the People who have played a crucial role in the success
                    of this project
                  </span>
                </p>
              </div>
              <div className="lg:col-span-2">
                <ul
                  role="list"
                  className="space-y-12 sm:grid sm:grid-cols-3 sm:gap-x-6  sm:space-y-0 lg:gap-x-8"
                >
                  <li>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        <img
                          className="object-cover shadow-lg rounded-lg"
                          src={
                            "https://res.cloudinary.com/drtexlmq7/image/upload/v1705475734/rstationProduct/dycgj3s5yqk1el0gvdbp.jpg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        <img
                          className="object-cover shadow-lg rounded-lg"
                          src={
                            "https://res.cloudinary.com/drtexlmq7/image/upload/v1705477655/rstationProduct/jryxfyityxp5otja8fyf.jpg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2 h-full lg:h-64">
                        <img
                          className="object-cover shadow-lg rounded-lg"
                          src={
                            "https://res.cloudinary.com/drtexlmq7/image/upload/v1705477626/rstationProduct/emo3sl3ywgz96zll00fk.jpg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                  <li className=" col-span-2 ">
                    <div className="  ">
                      <div className="aspect-w-3 aspect-h-2">
                        <img
                          className="object-cover shadow-lg rounded-lg"
                          src={
                            "https://res.cloudinary.com/drtexlmq7/image/upload/v1705478090/rstationProduct/bnjma3byka2yo8bzk3ik.jpg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div>
              <h2 className="text-5xl   font-bold text-[#2B39D1] uppercase  tracking-wide">
                Our Values
              </h2>
              <img
                className="h-full w-full  object-fill "
                src="https://res.cloudinary.com/drtexlmq7/image/upload/v1705480945/rstationProduct/x6gzwfxfrjeuea8g6lbk.png"
                alt="Md yasin"
              />
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-4 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <CheckIcon
                        className="absolute h-6 w-6 text-green-500"
                        aria-hidden="true"
                      />
                      <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                        {feature.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-9 text-base text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
