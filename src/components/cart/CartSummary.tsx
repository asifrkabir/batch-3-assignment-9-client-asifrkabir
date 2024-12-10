"use client";

import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart.provider";
import { Minus, MoveRight, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface IProps {
  closeModal: () => void;
}

const CartSummary = ({ closeModal }: IProps) => {
  const { cart, removeProductFromCart, updateProductQuantity, clearCart } =
    useCart();
  const [loading, setLoading] = useState(false);

  const handleIncrement = (productId: string, quantity: number) => {
    setLoading(true);
    updateProductQuantity(productId, quantity + 1);
    setLoading(false);
  };

  const handleDecrement = (productId: string, quantity: number) => {
    if (quantity <= 1) {
      removeProductFromCart(productId);
      return;
    }
    setLoading(true);
    updateProductQuantity(productId, quantity - 1);
    setLoading(false);
  };

  const handleRemove = (productId: string) => {
    setLoading(true);
    removeProductFromCart(productId);
    setLoading(false);
  };

  return (
    <div className="w-full mx-auto">
      {cart.products.length > 0 ? (
        <>
          <h3 className="text-lg mb-4">Shop: {cart.shopName}</h3>
          <div className="border rounded-md shadow-sm overflow-hidden">
            <div className="grid grid-cols-5 bg-gray-100 p-2 text-sm font-medium">
              <div className="col-span-2">Product</div>
              <div>Quantity</div>
              <div>Price</div>
              <div className="text-center">Actions</div>
            </div>
            <Separator />

            {cart.products.map((product) => (
              <div
                key={product.productId}
                className="grid grid-cols-5 items-center p-2 text-sm border-t"
              >
                <div className="col-span-2">
                  <p className="font-medium">{product.name}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleDecrement(product.productId, product.quantity)
                    }
                    disabled={loading}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-sm">{product.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleIncrement(product.productId, product.quantity)
                    }
                    disabled={loading}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div>${(product.price * product.quantity).toFixed(2)}</div>

                <div className="text-center">
                  <Button
                    className="bg-red-500 hover:bg-red-700 text-white"
                    size="icon"
                    onClick={() => handleRemove(product.productId)}
                    disabled={loading}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center p-4 border-t">
              <h3 className="text-lg font-semibold">Total:</h3>
              <div className="flex items-center space-x-4">
                <p className="text-lg font-medium">
                  ${cart.totalPrice.toFixed(2)}
                </p>
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white"
                  onClick={clearCart}
                  disabled={loading}
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            <div className="flex justify-end items-center p-4 border-t">
              <div className="flex items-center space-x-4">
                <Link href="/checkout">
                  <Button
                    className="bg-emerald-500 hover:bg-emerald-700 gap-2"
                    onClick={() => closeModal()}
                  >
                    Proceed to Checkout <MoveRight />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartSummary;
