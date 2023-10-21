import React, { useState } from "react";
import { signOut } from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import slugify from "slugify";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SideBarItems({ item, visible, index }) {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(visible);

  return (
    <div className="mb-4">
      {item.heading === "Sign out" ? (
        <b
          onClick={() => signOut()}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          Sign out
        </b>
      ) : (
        <div className="flex items-center justify-between">
          <b
            onClick={() => setShow((prev) => !prev)}
            className="cursor-pointer hover:text-blue-700"
          >
            {item.heading}{" "}
            {show ? (
              <RemoveIcon className="w-6 h-6" />
            ) : (
              <AddIcon className="w-6 h-6" />
            )}
          </b>
        </div>
      )}

      {show && (
        <ul className="mt-2">
          {item.links.map((link, i) => (
            <li
              key={i}
              className={`${
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
