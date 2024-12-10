"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppTextarea from "@/components/form/AppTextarea";
import { Button } from "@/components/ui/button";
import envConfig from "@/config/envConfig";
import { useCart } from "@/context/cart.provider";
import { useCreateOrder } from "@/hooks/order.hook";
import { createOrderValidationSchema } from "@/schemas/order.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PaymentModal from "../Payment/PaymentModal";
import CheckoutCart from "./CheckoutCart";
import { IApiResponse, ICreateOrder, IOrder } from "@/types";
import httpStatus from "http-status";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(envConfig.stripePublishableKey as string);

const CheckoutForm = () => {
  const { mutate: createOrder, isPending } = useCreateOrder();
  const queryClient = useQueryClient();
  const { cart, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const onPaymentSuccess = () => {
    setIsModalOpen(false);
    clearCart();
    const successPageUrl = `/payment-success?orderId=${orderId}`;
    router.push(successPageUrl);
  };

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

          setOrderId(res.data!._id!);
          setIsModalOpen(true);
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
                  "Proceed to Payment"
                )}
              </Button>
            </AppForm>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}

      {orderId !== "" && (
        <Elements stripe={stripePromise}>
          <PaymentModal
            open={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onPaymentSuccess={onPaymentSuccess}
            paymentData={{
              order: orderId,
              shop: cart.shopId!,
              amount: Math.round(cart.totalPrice * 100) / 100,
            }}
          />
        </Elements>
      )}
    </>
  );
};

export default CheckoutForm;
