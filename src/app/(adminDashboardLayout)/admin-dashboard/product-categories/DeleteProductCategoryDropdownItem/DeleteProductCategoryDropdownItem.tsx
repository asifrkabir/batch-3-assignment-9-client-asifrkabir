import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteProductCategory } from "@/hooks/productCategory.hook";
import { IApiResponse, IProductCategory } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

interface IProps {
  id: string;
}

const DeleteProductCategoryDropdownItem = ({ id }: IProps) => {
  const { mutate: deleteProductCategory, isPending } =
    useDeleteProductCategory();

  const queryClient = useQueryClient();

  const handleDeleteProductCategory = () => {
    deleteProductCategory(id, {
      onSuccess: (res: IApiResponse<IProductCategory>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Product category deleted successfully");

          queryClient.invalidateQueries({
            queryKey: ["PRODUCT_CATEGORIES"],
          });
        } else {
          console.error(res);
          toast.error(
            res.message ||
              "Failed to delete product category. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message ||
            "Failed to delete product category. Please try again."
        );
      },
    });
  };

  return (
    <DropdownMenuItem
      onClick={() => handleDeleteProductCategory()}
      className="text-red-500"
      disabled={isPending}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteProductCategoryDropdownItem;
