<Popover.Group className="hidden   lg:block lg:self-stretch">
  <div className="h-full flex space-x-8">
    {categories?.map((category) => (
      <Popover key={category.name} className="flex ">
        {({ open }) => (
          <>
            <div className="relative flex">
              <Popover.Button
                className={classNames(
                  open
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-700 hover:text-gray-800",
                  "relative z-10    flex items-center text-sm transition-colors ease-out duration-200  font-medium border-b-2 -mb-px pt-px"
                )}
              >
                {category.name}
              </Popover.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500 z-10">
                <div
                  className="absolute inset-0 top-1/2 bg-white shadow"
                  aria-hidden="true"
                />

                <div className="relative bg-white">
                  <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                      <div className="col-start-2 grid grid-cols-2 gap-x-8"></div>
                      <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                        {subCategories.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${section.name}-heading`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${section.name}-heading`}
                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                            ></ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    ))}

    {navigation.pages.map((page) => (
      <a
        key={page.name}
        href={page.href}
        className="flex items-center text-base font-medium text-gray-700 hover:text-gray-800"
      >
        {page.name}
      </a>
    ))}
  </div>
</Popover.Group>;
