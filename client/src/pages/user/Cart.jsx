import React from "react";
import { useFetch } from "../../hooks/useFetch";

export const Cart = () => {

    const [cartDetails,isLoading,error]=useFetch('/cart/get-cart-details')

  return <div>Cart</div>;
};
