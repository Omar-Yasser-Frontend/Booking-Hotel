import { FaRegStar, FaStar } from "react-icons/fa";
import useMe from "../hooks/useMe";
import { useState } from "react";
import ModifyReviewBtn from "./ModifyReviewBtn";
import EditReviewForm from "../features/Rooms/components/EditReviewForm";

interface ReviewCardProps {
  _id: string;
  userId: { username: string; image?: string; _id: string } | undefined;
  rating: number;
  comment: string;
  createdAt: string;
}

function ReviewCard({
  _id,
  userId,
  rating,
  comment,
  createdAt,
}: ReviewCardProps) {
  const { data } = useMe();
  const [editReview, setEditReview] = useState(false);

  return (
    <div className="mb-5 w-full space-y-3 rounded-md bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userId?.image || "/images/default-user.jpg"}
            className="aspect-square w-10"
            alt={`Image for user ${userId?.username}`}
          />
          <div>
            <p className="font-semibold">{userId?.username}</p>
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toUTCString()}
            </p>
          </div>
        </div>
        {userId?._id === data?.user?._id && !editReview && (
          <ModifyReviewBtn
            isEdit={editReview}
            setIsEdit={setEditReview}
            reviewId={_id}
          />
        )}
      </div>
      <div className="space-y-4 pl-4">
        {editReview ? (
          <EditReviewForm
            curComment={comment}
            curRating={rating}
            close={() => setEditReview(false)}
            reviewId={_id}
          />
        ) : (
          <>
            <div className="flex gap-0.5 text-yellow-500">
              {Array.from({ length: 5 }).map((_, idx) =>
                idx + 1 <= rating ? <FaStar /> : <FaRegStar />,
              )}
            </div>
            <p>{comment}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
