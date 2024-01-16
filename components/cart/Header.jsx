import React from "react";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Link from "next/link";
export default function Header() {
  return (
    <div>
      <header className="relative bg-white shadow px-4">
        <nav aria-label="Top" className="max-w-7xl mx-auto ">
          <div className=" sm:px-0 sm:pb-0">
            <div className="h-16 flex items-center justify-between">
              <div className="  flex">
                <Link
                  href="/"
                  className="inline-block focus:outline-none text-gray-950 font-bold text-xl md:text-3xl max-w-[131px] "
                >
                  B2B
                  <span className=" text-[#2B39D1] text-2xl lg:text-3xl">
                    eTrade
                  </span>
                </Link>
              </div>

              <div className=" flex items-center text-xs  md:text-sm text-gray-700">
                <Link href={`/browse`}>
                  <div className="bor">CONTINUE SHOPPING</div>
                </Link>
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
