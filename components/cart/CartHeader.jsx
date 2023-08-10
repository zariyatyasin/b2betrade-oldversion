import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function CartHeader({ cartItems, selected, setSelected }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(selected.length === cartItems.length);
  }, [selected, cartItems]);

  const handleSelect = () => {
    if (active) {
      setSelected([]);
      setActive(false); // Deselect all items
    } else {
      setSelected(cartItems);
      setActive(true); // Select all items
    }
  };
  return (
    <div className="py-4 md:px-4 px-2 bg-white">
      <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl ">
        Item Summary({cartItems.length})
      </h1>
      <div className="flex items-center">
        <div
          className={`h-4 w-4 border rounded border-gray-950 hover:border-2 cursor-pointer ${
            active ? styles.cartCheckActive : ""
          } `}
          onClick={() => handleSelect()}
        ></div>
        <p className="ml-2 text-xs md:text-sm ">Select All items</p>
      </div>
    </div>
  );
}
