"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/cart/Header";
import EmptyCart from "../../components/cart/EmptyCart";
import { useSelector } from "react-redux";
import CartProdcut from "../../components/cart/CartProduct";
import OrderSummary from "../../components/cart/OrderSummary";
import ProductListCart from "../../components/cart/ProductListCart";
import CartHeader from "../../components/cart/CartHeader";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { saveCart } from "../../request/user";
export default function page() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));
  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const { data: session, status } = useSession();
  useEffect(() => {
    setShippingFee(
      selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
    );
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(
      (
        selected.reduce((a, c) => a + c.price * c.qty, 0) +
        selected.reduce((a, c) => a + Number(c.shipping), 0)
      ).toFixed(2)
    );
  }, [selected]);
  const saveCartToDbHandler = async () => {
    if (session) {
      const res = saveCart(selected, session.user.id);
      router.push("/checkout");
    } else {
      signIn();
    }
  };

  return (
    <div className="">
      <Header />

      <div className="bg-[#f7f8fa]">
        <main className=" mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-[1440px] lg:px-8">
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-8">
              <CartHeader
                cartItems={cart.cartItems}
                selected={selected}
                setSelected={setSelected}
              />

              {cart.cartItems.length > 0 ? (
                <ul
                  role="list"
                  className="border-t border-b border-gray-200 divide-y divide-gray-200"
                >
                  {cart.cartItems.map((product, id) => (
                    <CartProdcut
                      product={product}
                      key={id}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  ))}
                </ul>
              ) : (
                <EmptyCart />
              )}
            </section>

            <OrderSummary
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
          </div>

          <ProductListCart />
        </main>
      </div>
    </div>
  );
}
