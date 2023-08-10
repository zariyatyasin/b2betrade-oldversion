import React from "react";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Link from "next/link";
export default function Header() {
  return (
    <div>
      <header className="relative bg-white shadow">
        <nav
          aria-label="Top"
          className="max-w-[1440px] mx-auto sm:px-6 lg:px-8"
        >
          <div className="px-4   sm:px-0 sm:pb-0">
            <div className="h-16 flex items-center justify-between">
              <div className="  flex">
                <Link href={"/"}>
                  <h1 className=" uppercase md:text-2xl text-2xl tracking-wide text-gray-950 font-bold ">
                    Sudzar
                  </h1>
                </Link>
              </div>

              <div className=" flex items-center  text-sm text-gray-700">
                <div className="bor">CONTINUE SHOPPING</div>
                <div>
                  <KeyboardArrowRightOutlinedIcon />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
