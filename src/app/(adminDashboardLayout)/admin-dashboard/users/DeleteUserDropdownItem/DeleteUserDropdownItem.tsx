import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteUser } from "@/hooks/user.hook";
import { IApiResponse, IUser } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

interface IProps {
  id: string;
}

const DeleteUserDropdownItem = ({ id }: IProps) => {
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const queryClient = useQueryClient();

  const handleDeleteUser = () => {
    deleteUser(id, {
      onSuccess: (res: IApiResponse<IUser>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("User deleted successfully");

          queryClient.invalidateQueries({
            queryKey: ["USERS"],
          });
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to delete User. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to delete User. Please try again."
        );
      },
    });
  };

  return (
    <DropdownMenuItem
      onClick={() => handleDeleteUser()}
      className="text-red-500"
      disabled={isPending}
    >
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteUserDropdownItem;
