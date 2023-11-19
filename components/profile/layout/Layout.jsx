"use client";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { sidebarData } from "../../../data/ProfileData";
import SideBarItem from "./SideBarItems";

const navigation = [
  { name: "Overview", href: "#", icon: "HomeIcon", current: true },
  { name: "Team", href: "#", icon: "HomeIcon", current: false },
  { name: "Projects", href: "#", icon: "HomeIcon", current: false },
  { name: "Calendar", href: "#", icon: "HomeIcon", current: false },
  { name: "Documents", href: "#", icon: "HomeIcon", current: false },
  { name: "Reports", href: "#", icon: "HomeIcon", current: false },
];

 

const Layout = ({ children, data }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className=" max-w-7xl   mx-auto flex mt-8 gap-8  px-2 sm:px-4  lg:px-8">
     

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col   ">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="  border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
          <div className="flex-grow mt-5 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {sidebarData.map((item, i) => (
                <SideBarItem
                  kye={i}
                  item={item}
                  visible={data.tab == i.toString()}
                  index={i.toString()}
                />
              ))}
            </nav>
          </div>
        </div>

    
    
          

        
      
 
      </div>
       <main className="   flex-1 -">{children}</main>
      
    </div>
  );
};

export default Layout;
