import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import { useRooms } from "../hooks/useRooms";
import PaginateRooms from "./PaginateRooms";
import RoomCard from "./RoomCard";

function RoomsList() {
  const { data, isPending, error, isError } = useRooms();

  if (isPending)
    return (
      <div className="mt-40 flex w-full items-center justify-center">
        <Loading />
      </div>
    );

  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="mt-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
          {data?.rooms.map((room) => (
            <RoomCard key={room._id} {...room} />
          ))}
        </div>
        <PaginateRooms roomsCount={data.roomsCount} />
      </div>
    </>
  );
}

export default RoomsList;
