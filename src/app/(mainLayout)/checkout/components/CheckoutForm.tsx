"use client";

import { useCart } from "@/context/cart.provider";
import CheckoutCart from "./CheckoutCart";
import AppForm from "@/components/form/AppForm";
import { zodResolver } from "@hookform/resolvers/zod";
import AppInput from "@/components/form/AppInput";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createOrderValidationSchema } from "@/schemas/order.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IApiResponse, ICreateOrder, IOrder } from "@/types";
import { useCreateOrder } from "@/hooks/order.hook";
import httpStatus from "http-status";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import AppTextarea from "@/components/form/AppTextarea";

const CheckoutForm = () => {
  const { mutate: createOrder, isPending } = useCreateOrder();
  const queryClient = useQueryClient();
  const { cart } = useCart();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const orderData: ICreateOrder = {
      shop: cart.shopId!,
      products: cart.products.map((cartProduct) => ({
        product: cartProduct.productId,
        price: cartProduct.price,
        quantity: cartProduct.quantity,
      })),
      totalPrice: Math.round(cart.totalPrice * 100) / 100,
      discount: data?.discount,
      deliveryAddress: data.deliveryAddress,
      status: "pending",
    };

    createOrder(orderData, {
      onSuccess: (res: IApiResponse<IOrder>) => {
        if (res.statusCode === httpStatus.CREATED) {
          queryClient.invalidateQueries({
            queryKey: ["ORDERS"],
          });
        } else {
          console.error(res);
          toast.error(res.message || "Failed to add order. Please try again.");
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.message || "Failed to add order. Please try again.");
      },
    });
  };

  return (
    <>
      {cart.products.length > 0 ? (
        <div>
          <CheckoutCart />

          <div className="flex items-center justify-between mt-20 mb-8">
            <h1 className="text-lg font-semibold md:text-2xl">Checkout</h1>
          </div>
          <div className="grid gap-4">
            <AppForm
              onSubmit={handleSubmit}
              resolver={zodResolver(createOrderValidationSchema)}
            >
              <AppTextarea
                name="deliveryAddress"
                label="Delivery Address"
                type="text"
                placeholder="Enter delivery address"
                required
              />

              <AppInput
                name="couponCode"
                label="Coupon Code"
                type="text"
                placeholder="Enter coupon code (if any)"
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </AppForm>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </>
  );
};

export default CheckoutForm;
