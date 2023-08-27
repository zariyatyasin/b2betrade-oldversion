import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SchoolIcon from "@mui/icons-material/School";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { toggleSidebar } from "@/store/ExpandSlice";
export const Navbar = () => {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;
  const dispatch = useDispatch();
  return (
    <div
      className={`fixed top-0 left-0 z-10  transition-all ease-in-out duration-300 bg-white shadow h-16  ${
        expand ? "ml-64" : ""
      } w-full flex items-center  px-4 sm:px-6 lg:px-8 }`}
    >
      <div className={`flex items-center text-black  `}>
        <div
          className="text-2xl md:text-3xl cursor-pointer"
          onClick={() => dispatch(toggleSidebar(true))}
        >
          <MenuOutlinedIcon />
        </div>
        <div className="flex ml-2 flex-col  justify-center">
          <div className="flex items-center"></div>
        </div>
      </div>
    </div>
  );
};
