import Loading from "../../../components/Loading";
import PrimaryBtn from "../../../components/PrimaryBtn";
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

  if (isError)
    return (
      <div className="mt-8">
        <h2>{error.message}</h2>
        <PrimaryBtn to="/">Go Home</PrimaryBtn>
      </div>
    );

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
