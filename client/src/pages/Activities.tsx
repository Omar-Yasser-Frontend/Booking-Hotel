import { Link } from "react-router";
import Loading from "../components/Loading";
import ReviewCard from "../components/ReviewCard";
import { useUserReviews } from "../features/profile/hooks/useUserReviews";
import ErrorMessage from "../components/ErrorMessage";

function Activities() {
  const { data, isPending, isError, error } = useUserReviews();

  if (isPending) return <Loading />;

  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="w-full">
      {data.pages
        .flat()
        .map((data) => data.reviews)
        .flat()
        .map((review) => (
          <>
            <p className="mt-5">
              Your review on this room{" "}
              <Link className="text-blue-700" to={"/rooms/" + review.roomId}>
                Here
              </Link>
            </p>
            <ReviewCard {...review} />
          </>
        ))}
    </div>
  );
}

export default Activities;
