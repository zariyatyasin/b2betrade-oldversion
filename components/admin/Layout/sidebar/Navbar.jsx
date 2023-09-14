import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SchoolIcon from "@mui/icons-material/School";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { toggleSidebar } from "../../../../store/ExpandSlice";
export const Navbar = () => {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const expand = expandSidebar.expandSidebar;
  const dispatch = useDispatch();
  return (
    <div
      className={`fixed top-0 mb-24 left-0 right-0 w-full pr-8
      bg-white border-b  
      flex items-center justify-between z-10   transition-all ease-in-out duration-300    h-[65px]    ${
        expand ? " pl-64" : " "
      }   `}
    >
      <div className={`flex items-center ml-6 text-black  `}>
        <div
          className="text-2xl md:text-3xl cursor-pointer"
          onClick={() => dispatch(toggleSidebar(true))}
        >
          <MenuOutlinedIcon />
        </div>
      </div>

      <div className="flex ml-2 flex-col  justify-center">
        <div className="flex items-center">hekki</div>
      </div>
    </div>
  );
};
