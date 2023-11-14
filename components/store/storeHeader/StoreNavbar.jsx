/* This example requires Tailwind CSS v2.0+ */

export default function StoreNavbar({ subCategory }) {
  return (
    <header className=" ">
      <nav className="  px-4 sm:px-6 lg:px-0" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <div className="hidden   space-x-8 lg:block">
              {subCategory.map((link) => (
                <a className="text-base font-medium text-black  uppercase">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="  space-x-4">
            <a
              href="#"
              className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              Contact the Seller
            </a>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {subCategory.map((link) => (
            <a className="text-base font-medium text-black uppercase ">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
