"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { IProduct } from "@/types";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const maxContentLength = 200;
  const maxImagesToShow = 2;

  const {
    _id,
    name,
    description,
    price,
    discountedPrice,
    category,
    inventoryCount,
    imageUrls,
    onSale,
    isActive,
  } = product;

  return (
    <Card className="relative flex flex-col rounded-lg border w-full h-auto transition-shadow hover:shadow-md">
      {/* Header - Product Info */}
      <CardHeader className="flex flex-col p-4">
        <div className="mt-2 flex justify-between">
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <h3 className="text-md mb-4">{category.name}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">
                {description.slice(0, maxContentLength)}
                {description.length > maxContentLength && (
                  <Link href={`/product/${product._id}`}>
                    <span className="text-emerald-600 cursor-pointer hover:underline">
                      ...Read more
                    </span>
                  </Link>
                )}
              </p>
            )}
          </div>
          <div>
            {inventoryCount <= 0 ? (
              <Badge className="bg-gray-400 text-white">Out of Stock</Badge>
            ) : (
              <Badge className="bg-emerald-500 text-white">In Stock</Badge>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          {onSale ? (
            <div className="text-sm text-emerald-600">
              <span className="line-through">${price}</span>{" "}
              <span className="font-semibold">${discountedPrice}</span>
            </div>
          ) : (
            <div className="text-sm font-semibold">${price}</div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Image Grid */}
        {imageUrls && imageUrls.length > 0 && (
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-2 mb-8">
            {imageUrls.slice(0, maxImagesToShow).map((imageUrl, index) => (
              <div key={index} className="relative overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`Product image ${index + 1}`}
                  width={1920}
                  height={150}
                  className="object-cover transition duration-300 rounded-sm"
                />
                {/* Overlay if more images */}
                {index === maxImagesToShow - 1 &&
                  imageUrls!.length > maxImagesToShow && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold">
                      +{imageUrls!.length - maxImagesToShow}
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Footer - Action Buttons */}
      <CardFooter className="p-4 flex justify-between items-center">
        {isActive ? (
          <Link href={`/product/${_id}`}>
            <Button variant="outline" size="sm">
              <Eye className="mr-2" /> View Details
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Product Inactive
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
