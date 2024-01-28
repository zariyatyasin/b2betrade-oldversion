"use client";

import Link from "next/link";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { signOut, useSession } from "next-auth/react";

import { toggleSidebar } from "../../../../store/ExpandSlice";
import { usePathname } from "next/navigation";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import AdminsidebarData from "../../../../data/AdminSidebarData";
const Sidebar = () => {
  const { data: session, status } = useSession();

  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;
  const pathname = usePathname();
  const router = pathname.split("/admin/dashboard/")[1];
  const dispatch = useDispatch();
  const [openSections, setOpenSections] = useState([]);

  const toggleSection = (index) => {
    const isOpen = openSections.includes(index);
    if (isOpen) {
      setOpenSections(openSections.filter((i) => i !== index));
    } else {
      setOpenSections([...openSections, index]);
    }
  };
  return (
    <div
      className={`fixed overflow-y-scroll top-0 left-0 z-50 transition-all border ease-in-out duration-300 bg-white h-screen w-64 ${
        expand ? "" : "-translate-x-full"
      }`}
    >
      <div
        className={`text-black  md:hidden     abs olute right-[-20px] text-3xl top-[57px] z-50    cursor-pointer ${
          !expand && "rotate-180"
        }`}
        onClick={() => dispatch(toggleSidebar(true))}
      >
        X
      </div>

      <div className="flex-shrink-0 flex border-b  border-gray-200 ml-4">
        <a href="#" className="flex-shrink-0 group block">
          <div className="flex items-center h-16">
            <div>
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={session?.user?.image}
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                {session?.user?.name}
              </p>
              <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                {session?.user.role}
              </p>
            </div>
          </div>
        </a>
      </div>

      <div
        className={`  transition-all ease-in-out duration-300  top-0 left-0 h-screen `}
      >
        <div className={`  `}>
          <div className="overflow-y-auto overflow-x-hidden flex-grow relative mt-5">
            {AdminsidebarData.map((section, index) => (
              <div key={index} className=" py-2   px-4 ">
                <div
                  className="flex flex-row items-center h-8 cursor-pointer"
                  onClick={() => toggleSection(index)} // Add click handler
                >
                  <div className="mb-2 text-sm font-semibold tracking-tight flex justify-between   w-full  transition-all ease-in-out duration-300 ">
                    <div>{section.heading}</div>
                    {openSections.includes(index) ? (
                      <KeyboardArrowUpOutlinedIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 18 }} />
                    )}
                  </div>
                </div>
                {openSections.includes(index) && ( // Conditionally render links based on openSections state
                  <ul>
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.link} prefetch={false}>
                          <div
                            className={`${
                              router == link.label.toLowerCase()
                                ? "bg-[#000080] text-white"
                                : ""
                            } inline-flex items-center rounded-md  text-s m hover:bg-[#000080] hover:text-white cursor-pointer h-9 px-4 py-2 w-full justify-start pl-4`}
                          >
                            <span className="inline-flex justify-center items-center">
                              {link.icon}
                            </span>
                            <span className="ml-1 text-sm  font-medium">
                              {link.label}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
