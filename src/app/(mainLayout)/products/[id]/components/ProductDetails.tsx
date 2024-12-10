"use client";

import AddToCart from "@/components/cart/AddToCart";
import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  product: IProduct;
}

const ProductDetails = ({ product }: IProps) => {
  const {
    name,
    description,
    price,
    discountedPrice,
    category,
    inventoryCount,
    imageUrls,
    onSale,
    shop,
  } = product;

  const placeholderCount = 1;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          {imageUrls && imageUrls.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {imageUrls.map((imageUrl, index) => (
                <div key={index} className="relative overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`Product image ${index + 1}`}
                    width={300}
                    height={150}
                    className="object-cover rounded-md transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 mb-8">
              {Array.from({ length: placeholderCount }).map((_, index) => (
                <div key={index} className="relative overflow-hidden">
                  <Image
                    src={`https://placehold.co/300x150/cccccc/ffffff?text=No+Image`}
                    alt={`Placeholder image ${index + 1}`}
                    width={300}
                    height={150}
                    className="object-cover rounded-md transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">{name}</h1>
          <Link
              href={`/shops/${shop._id}`}
              className="hover:text-emerald-500"
            >
              <h3 className="text-md mb-4">{shop.name}</h3>
            </Link>
          <h3 className="text-md mb-4">Category: {category.name}</h3>

          {description && (
            <p className="text-sm text-gray-700 mb-4">{description}</p>
          )}

          <div className="text-lg mb-4">
            {onSale ? (
              <div className="text-emerald-600">
                <span className="line-through">${price}</span>{" "}
                <span className="font-semibold">${discountedPrice}</span>
              </div>
            ) : (
              <div className="font-semibold">${price}</div>
            )}
          </div>

          <div className="mb-6">
            {inventoryCount <= 0 ? (
              <span className="text-red-500 font-semibold">Out of Stock</span>
            ) : (
              <span className="text-emerald-500 font-semibold">In Stock</span>
            )}
          </div>

          <div className="flex gap-4">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
