import { FaLocationDot } from "react-icons/fa6";
import type { Room } from "../types/Room";
import HotelFeature from "./HotelFeature";
import HotelRules from "./HotelRules";
import WishlistBtn from "./WishlistBtn";

function RoomTextDetails({ name, location, description }: Room) {
  return (
    <>
      <h1 className="mt-6 text-3xl text-base font-extrabold tracking-tight md:text-4xl">
        {name} <WishlistBtn />
      </h1>
      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="inline-flex items-center gap-2">
          <FaLocationDot className="text-gray-500" />
          <span>
            {location.country}
            {location.city ? `, ${location.city}` : ""}
            {location.address ? `, ${location.address}` : ""}
          </span>
        </span>
      </div>

      <div className="mt-6 text-gray-700">
        <p className="leading-relaxed whitespace-pre-line">{description}</p>
      </div>
      <HotelFeature />
      <HotelRules />
    </>
  );
}

export default RoomTextDetails;
