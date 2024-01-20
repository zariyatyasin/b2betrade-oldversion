"use client";
import React from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

const EmptyCart = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col items-center text-center mt-10">
      {status === "loading" ? (
        // Show loading spinner or loading message while the session is loading
        <div>Loading...</div>
      ) : (
        <>
          <div className="text-gray-400">
            <Image src={"/icons/cart.png"} height={55} width={55} />
          </div>
          <h1 className="text-lg font-bold tracking-wider">
            YOUR CART IS EMPTY
          </h1>
          <div className="flex flex-col gap-y-2">
            {!session?.user && (
              <div className="mb-2 mt-2">
                <p>Sign in to view your cart and start shopping</p>
                <button
                  className="uppercase w-full px-8 p-2  text-white mt-2 bg-[#2B39D1]  font-semibold"
                  onClick={() => signIn()}
                >
                  Sign in / register
                </button>
              </div>
            )}
            {session?.user && ( // Render only if the user is logged in
              <Link href={"/browse"} prefetch={false}>
                <div className="text-center uppercase w-full p-2 bg-[#2B39D1] text-white t  font-semibold">
                  Continue shopping
                </div>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EmptyCart;
