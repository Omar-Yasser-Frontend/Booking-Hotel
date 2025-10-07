import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

import Loading from "../../../components/Loading";
import useRoomReviewsAvg from "../hooks/useRoomReviewsAvg";
import ReviewsAvgProg from "./ReviewsAvgProg";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";

function RoomReviews() {
  const { data, isPending } = useRoomReviewsAvg();
  let handleStarCalc = data?.reviewsAvg?.avgRating || 0;

  if (isPending) return <Loading />;

  return (
    <div className="mt-20 space-y-2 md:mt-10">
      <div className="w-fit text-center">
        <p className="text-5xl font-bold">
          <p>
            {data?.reviewsAvg?.avgRating?.toFixed(1) || 0}
            <span className="my-2 flex items-center justify-end gap-2 text-[16px] text-yellow-500">
              {Array.from({ length: 5 }).map(() => {
                if (handleStarCalc === 0) return <FaRegStar />;
                if (handleStarCalc < 1) {
                  handleStarCalc = 0;
                  return <FaStarHalfAlt />;
                }
                --handleStarCalc;
                return <FaStar />;
              })}
            </span>
          </p>
        </p>
        <p className="font-bold text-gray-500">
          {data?.reviewsAvg.totalReviews || 0} <br /> Reviews Count
        </p>
      </div>
      <ReviewsAvgProg
        perRating={data?.reviewsAvg.perRating}
        totalReviews={data?.reviewsAvg.totalReviews || 0}
      />
      <Reviews />
      <ReviewForm />
    </div>
  );
}

export default RoomReviews;
