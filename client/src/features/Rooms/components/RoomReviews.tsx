import Loading from "../../../components/Loading";
import useRoomReviews from "../hooks/useRoomReviews";

function RoomReviews() {
  const { data, isPending } = useRoomReviews();

  if (isPending) return <Loading />;

  return <div></div>;
}

export default RoomReviews;
