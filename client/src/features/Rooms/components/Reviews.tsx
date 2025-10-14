import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading";
import PrimaryBtn from "../../../components/PrimaryBtn";
import ReviewCard from "../../../components/ReviewCard";
import useReview from "../hooks/useReview";

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
          .map((review) => <ReviewCard {...review} />)}
      {hasNextPage && (
        <PrimaryBtn onClick={() => fetchNextPage()}>Load More</PrimaryBtn>
      )}
    </div>
  );
}

export default Reviews;
