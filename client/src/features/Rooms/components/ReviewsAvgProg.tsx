type PerRatingObj = { _id: number; count: number };

interface ReviewsAvgProgProps {
  perRating: PerRatingObj[] | undefined;
  totalReviews: number;
}

const fillReviews = (perRating: PerRatingObj[]) => {
  const reviewsPlaceHolder = [1, 2, 3, 4, 5];
  return reviewsPlaceHolder.map(
    (reviewIdx) =>
      perRating.find((rating) => rating._id === reviewIdx) || {
        _id: reviewIdx,
        count: 0,
      },
  );
};

function ReviewsAvgProg({ perRating = [], totalReviews }: ReviewsAvgProgProps) {
  const rating = fillReviews(perRating).map((rating) => ({
    ...rating,
    ratingAvg: rating.count
      ? Math.floor((rating.count / totalReviews) * 100)
      : 0,
  }));

  return (
    <div>
      <ul>
        {rating.map((rate) => (
          <li className="flex items-center gap-2">
            <span>{rate._id}</span>
            <div className="bg-gray-main h-2 w-full overflow-hidden rounded-full md:w-[50%] xl:w-[40%]">
              <div
                className="h-full bg-red-400"
                style={{ width: rate.ratingAvg + "%" }}
              ></div>
            </div>
            <span className="block w-[4ch]">{rate.ratingAvg}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewsAvgProg;
