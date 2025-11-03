import Container from "../../../components/Container";
import ErrorMessage from "../../../components/ErrorMessage";
import MainLoading from "../../../components/MainLoading";
import PrimaryBtn from "../../../components/PrimaryBtn";
import useMe from "../../../hooks/useMe";
import useRoom from "../hooks/useRoom";
import ReservationForm from "./ReservationForm";
import RoomTextDetails from "./RoomDetails";
import RoomReviews from "./RoomReviews";
import RoomSlider from "./RoomSlider";

function RoomDetailsBody() {
  const { data, isPending, isError, error } = useRoom();
  const { data: me } = useMe();

  const room = data?.room;

  if (isPending) return <MainLoading />;

  if (isError) return <ErrorMessage message={error.message} />;

  if (!room) return null;

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
        <aside className="bg-gray-main relative order-2 h-max overflow-hidden rounded-xl p-5 md:top-24 lg:order-1">
          <h2 className="mb-4 text-2xl font-bold">Reserve this room</h2>
          <ReservationForm />
          {!me && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0000002d]">
              <PrimaryBtn to="/login">Login</PrimaryBtn>
            </div>
          )}
        </aside>
        <div className="order-1 lg:order-2">
          <RoomSlider thumbnail={room.thumbnail} images={room.images} />

          <RoomTextDetails {...room} />
        </div>
      </div>
      <RoomReviews />
    </Container>
  );
}

export default RoomDetailsBody;
