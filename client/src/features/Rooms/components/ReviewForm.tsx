import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import useMe from "../../../hooks/useMe";
import Loading from "../../../components/Loading";
import PrimaryBtn from "../../../components/PrimaryBtn";
import useCreateReview from "../hooks/useCreateReview";
import ButtonLoading from "../../../components/ButtonLoading";

function ReviewForm() {
  const { isPending, isError } = useMe();
  const [rating, setRating] = useState(0);
  const [ratingTheme, setRatingTheme] = useState(0);
  const [error, setError] = useState<null | string>(null);
  const [comment, setComment] = useState("");
  const { mutate: review, isPending: isPendingReview } = useCreateReview();

  if (isPending) return <Loading />;

  if (isError)
    return (
      <div className="bg-gray-main mt-4 ml-auto w-fit space-y-4 rounded-md p-8">
        <div>Please login to be able to comment</div>
        <PrimaryBtn to="/login" className="mx-auto block w-fit">
          Login
        </PrimaryBtn>
      </div>
    );

  return (
    <form
      className="mt-10 flex flex-col items-start gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (rating === 0 || rating > 5)
          return setError("Rating Must be between 0 and 5");
        else if (error) setError(null);

        review(
          { rating, comment },
          {
            onSuccess: () => {
              setComment("");
              setRating(0);
              setRatingTheme(0);
            },
          },
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

      <PrimaryBtn disabled={isPendingReview}>
        {isPendingReview ? <ButtonLoading /> : "Submit"}
      </PrimaryBtn>
    </form>
  );
}

export default ReviewForm;
