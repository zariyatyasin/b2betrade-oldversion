"use client";
import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useRouter } from "next/navigation";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Navigation } from "../../data/Navigation";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MobileCategory from "./MobileCategory";
function MobileMenu({ categories, subCategories }) {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === "profile") {
      // Navigate to the profile page
      router.push("/profile");
    }
    if (newValue === "category") {
      setOpen(!open);
    }
    if (newValue === "category" && !open) {
      setValue("");
    }
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <CloseOutlinedIcon />
                </button>
              </div>

              {/*            
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "text-indigo-600 border-indigo-600"
                              : "text-gray-900 border-transparent",
                            "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {subCategories.map((subCategory) => (
                    <Tab.Panel
                      key={subCategory.name}
                      className="pt-10 pb-8 px-4 space-y-10"
                    >
                      <div className="grid grid-cols-2 gap-x-4">
                        {categories
                          .filter(
                            (filteredCategory) =>
                              filteredCategory.parent &&  
                              filteredCategory.parent._id === subCategory._id
                          )
                          .map((filteredSubCategory) => (
                            <div key={filteredSubCategory.name}>
                          
                              {filteredSubCategory.name}
                            </div>
                          ))}
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group> */}
              {categories.map((category, i) => (
                <MobileCategory
                  category={category}
                  subCategories={subCategories}
                />
              ))}

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {Navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Sign in
                  </a>
                </div>
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Create account
                  </a>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      {isMobile && (
        <BottomNavigation
          className="fixed bottom-0 left-0 right-0 border bg-white"
          sx={{ zIndex: 10 }}
          value={value}
          showLabels
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="recents"
            icon={<HomeOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Category"
            value="category"
            icon={<CategoryOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Nearby"
            value="nearby"
            icon={<FavoriteBorderOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Profile"
            value="profile"
            icon={<AccountCircleOutlinedIcon />}
          />
        </BottomNavigation>
      )}
    </div>
  );
}

export default MobileMenu;