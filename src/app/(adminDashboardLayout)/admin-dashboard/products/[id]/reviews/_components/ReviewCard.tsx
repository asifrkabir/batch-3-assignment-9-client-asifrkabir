import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IReview } from "@/types";
import { format } from "date-fns";
import { Star } from "lucide-react";
import DeleteReview from "./DeleteReview";

interface IProps {
  review: IReview;
  allowDelete?: boolean;
}

const ReviewCard = ({ review, allowDelete }: IProps) => {
  const { _id, user, rating, comment, createdAt } = review;

  return (
    <Card className="w-full shadow-md border">
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10">
              {user.profilePicture ? (
                <AvatarImage
                  src={user.profilePicture}
                  alt={user.name || "User"}
                />
              ) : (
                <AvatarFallback>
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-base font-medium">
                {user.name || "Anonymous"}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {format(new Date(createdAt), "PPP")}
              </p>
            </div>
          </div>
          {allowDelete && <DeleteReview id={_id} />}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {comment && <p className="text-sm text-gray-700">{comment}</p>}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;