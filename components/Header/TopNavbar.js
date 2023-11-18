import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";

export default function TopNavbar() {
  return (
    <div className=" bg-white">
      <div className="max-w-[1600px] mx-auto py-2 px-4 md:px-6   border-b border-border-base  lg:px-8 2xl:px-10">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg ">
              <SpeakerphoneIcon
                className="h-4 w-4 text-black"
                aria-hidden="true"
              />
            </span>
            <p className="  text-gray-900 truncate text-sm">
              <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline">
                Big news! We're excited to announce a brand new product.
              </span>
            </p>
          </div>

          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <a
              href="#"
              className="border-transparent  text-gray-950   tracking-wider inline-flex items-center px-2 pt-1 border-b-2 text-sm "
            >
              Store Locator
            </a>
            <a
              href="#"
              className="border-transparent  text-gray-950   tracking-wider inline-flex items-center px-2 pt-1 border-b-2 text-sm "
            >
              Order Tracking
            </a>
            <a
              href="#"
              className="border-transparent  text-gray-950   tracking-wider inline-flex items-center px-2 pt-1 border-b-2 text-sm "
            >
              FAQs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
