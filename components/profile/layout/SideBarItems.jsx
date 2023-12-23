"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import slugify from "slugify";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
function SideBarItems({ item, visible, index }) {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(visible);

  return (
    <div className="">
      {item.heading === "Sign out" ? (
        <b
          onClick={() => signOut()}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          Sign out
        </b>
      ) : (
        <div
          className="flex items-center justify-between    w-full"
          onClick={() => setShow((prev) => !prev)}
        >
          <div className=" inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start">
            {item.heading}
          </div>
          <div>
            {show ? (
              <KeyboardArrowUpOutlinedIcon sx={{ fontSize: 18 }} />
            ) : (
              <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 18 }} />
            )}
          </div>
        </div>
      )}

      {show && (
        <ul className="mt-2 ml-4  ">
          {item.links.map((link, i) => (
            <li
              key={i}
              className={` text-sm  ${
                link.link.startsWith("/profile/orders")
                  ? searchParams.get("q")?.split("__")[0] ===
                    slugify(link.name, { lower: true })
                  : searchParams.get("q") ===
                    slugify(link.name, { lower: true })
              } ${
                searchParams.get("q")?.split("__")[0] ===
                slugify(link.name, { lower: true })
                  ? "font-bold"
                  : ""
              }`}
            >
              <Link
                className=""
                href={
                  link.link.startsWith("/profile/orders")
                    ? `${link.link}?tab=${index}&q=${slugify(link.name, {
                        lower: true,
                      })}__${link.filter}`
                    : `${link.link}?tab=${index}&q=${slugify(link.name, {
                        lower: true,
                      })}`
                }
              >
                <div className="block py-2 px-4 hover:text-blue-700">
                  {link.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SideBarItems;
