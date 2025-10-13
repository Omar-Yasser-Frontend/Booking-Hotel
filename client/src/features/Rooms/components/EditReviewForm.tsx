import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import ButtonLoading from "../../../components/ButtonLoading";
import PrimaryBtn from "../../../components/PrimaryBtn";
import { useUpdateReview } from "../hooks/useUpdateReview";
import toast from "react-hot-toast";

function EditReviewForm({
  reviewId,
  curComment,
  curRating,
  close,
}: {
  reviewId: string;
  curRating: number;
  curComment: string;
  close: () => void;
}) {
  const [rating, setRating] = useState(curRating);
  const [ratingTheme, setRatingTheme] = useState(curRating);
  const [error, setError] = useState<null | string>(null);
  const [comment, setComment] = useState(curComment);
  const { mutateAsync: updateReview, isPending } = useUpdateReview();

  return (
    <form
      className="mt-10 flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (rating === 0 || rating > 5)
          return setError("Rating Must be between 0 and 5");
        else if (error) setError(null);

        toast.promise(
          updateReview(
            { review: { rating, comment }, id: reviewId },
            {
              onSuccess: () => {
                setComment("");
                setRating(0);
                setRatingTheme(0);
              },
            },
          ).then(close),
          { success: "reveiw updated successfully", loading: "updating..." },
        );
      }}
    >
      <div className="flex text-xl text-yellow-500">
        {Array.from({ length: 5 }).map((_, idx) => (
          <span
            key={idx}
            className="cursor-pointer px-0.5"
            onMouseEnter={() => setRatingTheme(idx + 1)}
            onMouseLeave={() => setRatingTheme(rating)}
            onClick={() => setRating(idx + 1)}
          >
            {ratingTheme >= idx + 1 ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter Text..."
        className="h-60 w-xl max-w-full resize-none rounded-md bg-gray-100 p-5 outline-none"
      />

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={close}
          className="hover:bg-gray-main hover:border-gray-main cursor-pointer border-3 border-transparent px-6 py-3 duration-300 hover:underline"
        >
          Close
        </button>
        <PrimaryBtn disabled={isPending}>
          {isPending ? <ButtonLoading /> : "Submit"}
        </PrimaryBtn>
      </div>
    </form>
  );
}

export default EditReviewForm;
