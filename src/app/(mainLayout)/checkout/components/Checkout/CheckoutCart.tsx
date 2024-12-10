"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/context/cart.provider";

const CheckoutCart = () => {
  const { cart } = useCart();

  return (
    <div className="border rounded-md shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableCell className="col-span-2">Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.products.map((product) => (
              <TableRow key={product.productId}>
                <TableCell className="col-span-2">
                  <p className="font-medium">{product.name}</p>
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  ${(product.price * product.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center p-4 border-t">
        <h3 className="text-lg font-semibold">Total:</h3>
        <div className="flex items-center space-x-4">
          <p className="text-lg font-medium">${cart.totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
