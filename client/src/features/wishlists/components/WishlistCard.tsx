import { Link } from "react-router";
import type { Room } from "../../Rooms/types/Room";
import PrimaryBtn from "../../../components/PrimaryBtn";
import { useDeleteWishlist } from "../../../hooks/useDeleteWishlist";

interface WishlistCardProps {
  _id: string;
  userId: string;
  roomId: Room;
}

function WishlistCard({ roomId, _id }: WishlistCardProps) {
  const { mutate: deleteWishlist, isPending } = useDeleteWishlist();

  const handleRemove = (e: React.MouseEvent) => {
    // prevent the click from activating the surrounding link
    e.stopPropagation();
    e.preventDefault();
    deleteWishlist(_id);
  };

  return (
    <li className="rounded-md border bg-white p-3">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link
          to={`/rooms/${roomId._id}`}
          className="flex w-full flex-col items-start gap-4 sm:flex-row md:w-auto md:items-center"
        >
          <img
            src={roomId.thumbnail}
            className="h-35 w-full flex-shrink-0 rounded-md object-cover sm:h-28 sm:w-40 md:h-24 md:w-32"
            alt={`Thumbnail of the room ${roomId.name}`}
          />

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {roomId.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
              {roomId.description}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-700">
              <span className="rounded-full bg-gray-100 px-2 py-1">
                Price: ${roomId.pricePerNight}
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-1">
                Guests: {roomId.capacity.guests}
              </span>
              <span className="rounded-full bg-gray-100 px-2 py-1">
                Rooms: {roomId.capacity.rooms}
              </span>
            </div>
          </div>
        </Link>

        <div className="flex w-full items-center justify-end md:w-auto">
          <PrimaryBtn
            onClick={handleRemove}
            isPending={isPending}
            className="w-full md:w-auto"
          >
            Remove
          </PrimaryBtn>
        </div>
      </div>
    </li>
  );
}

export default WishlistCard;
