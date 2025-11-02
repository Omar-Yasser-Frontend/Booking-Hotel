import EmptyResult from "../../../components/EmptyResult";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import { useBooking } from "../hooks/useBooking";
import BookingInfoCard from "./BookInfoCard";

function BookingList() {
  const { data, isPending, isError, error } = useBooking();

  if (isPending) return <Loading />;

  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div>
      <h2 className="text-3xl font-semibold">Your Bookings</h2>
      {!data.reservations.length ? (
        <EmptyResult>No reservation found</EmptyResult>
      ) : (
        <ul>
          {data.reservations.map((data) => (
            <BookingInfoCard {...data} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingList;
