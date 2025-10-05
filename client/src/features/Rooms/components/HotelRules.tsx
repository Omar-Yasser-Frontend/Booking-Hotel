import { FaClock, FaDog } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import RoomDetailsLists from "./RoomDetailsLists";
import { IoLogoNoSmoking } from "react-icons/io5";
import { HiOutlineIdentification } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";

function HotelRules() {
  return (
    <div className="my-8">
      <h3 className="mb-4 text-2xl font-semibold">Hotel Roles</h3>

      <RoomDetailsLists>
        <li className="flex items-center gap-2">
          <FaClock /> <span>Check-in: from 2:00 PM</span>
        </li>
        <li className="flex items-center gap-2">
          <GiExitDoor /> <span>Check-out: until 12:00 PM</span>
        </li>
        <li className="flex items-center gap-2">
          <FaDog /> <span>No pets allowed</span>
        </li>
        <li className="flex items-center gap-2">
          <IoLogoNoSmoking /> <span>No smoking</span>
        </li>
        <li className="flex items-center gap-2">
          <HiOutlineIdentification /> <span>ID required upon check-in</span>
        </li>
        <li className="flex items-center gap-2">
          <FcCancel /> <span>Cancellation policy: Free before 24 hours</span>
        </li>
      </RoomDetailsLists>
    </div>
  );
}

export default HotelRules;
