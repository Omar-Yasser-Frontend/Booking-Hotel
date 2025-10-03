import { Link } from "react-router";
import type { Room } from "../types/Room";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineBedroomParent } from "react-icons/md";

function RoomCard({
  _id,
  thumbnail,
  name,
  description,
  pricePerNight,
  capacity: { guests, rooms },
}: Room) {
  return (
    <Link
      to={_id}
      className="overflow-hidden rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.08)] duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
    >
      <img
        src={thumbnail}
        loading="lazy"
        className="h-40 w-full object-cover"
        alt="Room's thumbnail"
      />
      <div className="p-3">
        <h3 className="mb-3 text-xl font-semibold">{name}</h3>
        <p className="mb-2 inline-block font-semibold tracking-wide">
          <span className="text-yellow-gold">Price: {pricePerNight}</span>
        </p>

        <p className="text-sm text-gray-500">{description}</p>

        <p className="text-dark-900 mt-2 flex items-center gap-1 font-semibold">
          <IoMdPerson />
          {guests} of Guest Cap
        </p>
        <p className="text-dark-900 flex items-center gap-1 font-semibold">
          <MdOutlineBedroomParent />
          {rooms} of Room Cap
        </p>
      </div>
    </Link>
  );
}

export default RoomCard;
