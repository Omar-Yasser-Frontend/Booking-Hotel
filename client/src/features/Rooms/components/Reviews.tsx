import { useEffect } from "react";
import Loading from "../../../components/Loading";
import useReview from "../hooks/useReview";
import toast from "react-hot-toast";
import PrimaryBtn from "../../../components/PrimaryBtn";
import { FaRegStar, FaStar } from "react-icons/fa";

function Reviews() {
  const { data, hasNextPage, isPending, isError, error, fetchNextPage } =
    useReview();

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError, error]);

  if (isPending) return <Loading />;

  return (
    <div className="my-10">
      {data?.pages &&
        data.pages
          ?.flat()
          .map(({ reviews }) => reviews)
          .flat()
          .map((review) => (
            <div
              key={review._id}
              className="my-5 space-y-3 rounded-md bg-gray-50 p-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={review.userId.image || "/images/default-user.jpg"}
                  className="aspect-square w-10"
                  alt={`Image for user ${review.userId.username}`}
                />
                <div>
                  <p className="font-semibold">{review.userId.username}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toUTCString()}
                  </p>
                </div>
              </div>
              <div className="space-y-4 pl-4">
                <div className="flex gap-0.5 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, idx) =>
                    idx + 1 <= review.rating ? <FaStar /> : <FaRegStar />,
                  )}
                </div>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
      {hasNextPage && (
        <PrimaryBtn onClick={() => fetchNextPage()}>Load More</PrimaryBtn>
      )}
    </div>
  );
}

export default Reviews;
