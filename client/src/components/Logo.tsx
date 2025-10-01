import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router";

function Logo() {
  return (
    <div>
      <Link
        to={"/"}
        className="flex items-center gap-2 text-xl font-bold sm:text-3xl"
      >
        <FaBuilding />
        <span>Hotel Booking</span>
      </Link>
    </div>
  );
}

export default Logo;
