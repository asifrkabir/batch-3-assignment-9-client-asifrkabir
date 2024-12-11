"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProductsForFeedQuery } from "@/hooks/product.hook";
import { useGetAllProductCategories } from "@/hooks/productCategory.hook";
import { IProduct, IProductCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const CompareProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<(IProduct | null)[]>(
    [null, null, null]
  );

  // Fetch categories
  const { data: productCategoriesData, isLoading: isProductCategoriesLoading } =
    useGetAllProductCategories([{ name: "limit", value: "10000" }]);

  // Fetch products based on selected category
  const { data: productsData, isLoading: isProductsLoading } = useQuery({
    ...getAllProductsForFeedQuery([
      { name: "limit", value: "10000" },
      { name: "category", value: selectedCategory },
    ]),
    enabled: !!selectedCategory,
  });

  const productCategories: IProductCategory[] =
    productCategoriesData?.data || [];
  const products: IProduct[] = productsData?.data || [];

  const handleProductChange = (index: number, productId: string) => {
    const selectedProduct =
      products.find((product) => product._id === productId) || null;
    setSelectedProducts((prev) => {
      const updated = [...prev];
      updated[index] = selectedProduct;
      return updated;
    });
  };

  const handleReset = () => {
    setSelectedProducts([null, null, null]);
    setSelectedCategory("");
  };

  return (
    <div className="space-y-6">
      <div>
        {isProductCategoriesLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <>
            <p className="text-sm mb-2">
              Select category (you can compare products from one category at a
              time)
            </p>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {productCategories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>

      {isProductsLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        selectedCategory && (
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableCell className="font-medium">Details</TableCell>
                  {selectedProducts.map((_, index) => (
                    <TableCell key={index}>
                      <Select
                        onValueChange={(value) =>
                          handleProductChange(index, value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={`Select Product ${index + 1}`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product._id} value={product._id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  {selectedProducts.map((product, index) => (
                    <TableCell key={index}>
                      {product ? product.name : "-"}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Shop</TableCell>
                  {selectedProducts.map((product, index) => (
                    <TableCell key={index}>
                      {product ? product.shop?.name : "-"}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Price</TableCell>
                  {selectedProducts.map((product, index) => (
                    <TableCell key={index}>
                      {product ? `$${product.price}` : "-"}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )
      )}

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          className="px-4 py-2 rounded-md"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default CompareProducts;
