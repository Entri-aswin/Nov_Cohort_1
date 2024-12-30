import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { CartCards } from "../../componets/user/Cards";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {
    const [cartDetails, isLoading, error] = useFetch("/cart/get-cart");

    const handleRemoveCourse = async (courseId) => {
        try {
            const response = await axiosInstance({
                method: "DELETE",
                url: "/cart/remove-from-cart",
                data: { courseId },
            });
            toast.success("course removed successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const makePayment = async () => {
        try {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

            const session = await axiosInstance({
                url: "/payment/create-checkout-session",
                method: "POST",
                data: { products: cartDetails?.courses },
            });

            console.log(session, "=======session");
            const result = stripe.redirectToCheckout({
                // sessionId: session.data.sessionId,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            <div>
                {cartDetails?.courses?.map((value) => (
                    <CartCards item={value} key={value._id} handleRemove={handleRemoveCourse} />
                ))}
            </div>
            {cartDetails?.courses?.length ? (
                <div className="w-6/12 bg-base-300 flex flex-col items-center gap-5">
                    <h2>Price summary</h2>

                    <h2>Total Price: {cartDetails?.totalPrice}</h2>

                    <button className="btn btn-success" onClick={makePayment}>
                        Checkout
                    </button>
                </div>
            ) : (
                <h1> cart is empty </h1>
            )}
        </div>
    );
};
