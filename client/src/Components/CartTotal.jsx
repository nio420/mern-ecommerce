import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { getCartAmount, deliveryFee, currency } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : Number(subtotal) + Number(deliveryFee);

  return (
    <section className="w-full">
      {/* Header Container */}
      <div className="mb-2">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p className="text-primary">Subtotal</p>
          <p className="font-medium">
            {currency} {subtotal}.00
          </p>
        </div>
        <hr className="border-none h-px bg-gray-200" />

        {/* Shipping Fee */}
        <div className="flex justify-between">
          <p className="text-primary">Shipping Fee</p>
          <p className="font-medium">
            {currency} {deliveryFee}.00
          </p>
        </div>
        <hr className="border-none h-px bg-gray-200" />

        {/* Total */}
        <div className="flex justify-between text-base mt-1">
          <b className="text-gray-800">Total</b>
          <b className="text-gray-900">
            {currency} {total}.00
          </b>
        </div>
        <hr className="text-gray-500" />
      </div>
    </section>
  );
};

export default CartTotal;
