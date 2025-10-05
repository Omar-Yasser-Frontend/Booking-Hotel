import Container from "../../../components/Container";
import MainLoading from "../../../components/MainLoading";
import useRoom from "../hooks/useRoom";
import ReservationForm from "./ReservationForm";
import RoomSlider from "./RoomSlider";
import RoomTextDetails from "./RoomDetails";

function RoomDetailsBody() {
  const { data, isPending } = useRoom();

  const room = data?.room;

  if (isPending) return <MainLoading />;
  if (!room) return null;

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
        <aside className="order-2 h-max rounded-xl bg-gray-main p-5 md:top-24 lg:order-1">
          <h2 className="mb-4 text-2xl font-bold">Reserve this room</h2>
          <ReservationForm />
        </aside>
        <div className="order-1 lg:order-2">
          <RoomSlider thumbnail={room.thumbnail} images={room.images} />

          <RoomTextDetails {...room} />
        </div>
      </div>
    </Container>
  );
}

export default RoomDetailsBody;
