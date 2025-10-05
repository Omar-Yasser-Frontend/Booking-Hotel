import { FaBath, FaBox, FaBroom, FaCar, FaWifi } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { GrYoga } from "react-icons/gr";
import { LuCoffee } from "react-icons/lu";
import { FaBowlFood } from "react-icons/fa6";
import RoomDetailsLists from "./RoomDetailsLists";

function HotelFeature() {
  return (
    <div className="my-8">
      <h3 className="mb-4 text-2xl font-semibold">Hotel Feature</h3>

      <RoomDetailsLists>
        <li className="flex items-center gap-2">
          <FaWifi /> <span>High Speed WI-FI</span>
        </li>
        <li className="flex items-center gap-2">
          <FaBroom /> <span>Daily Housekeeping</span>
        </li>
        <li className="flex items-center gap-2">
          <FaCar /> <span>Complimentary Valet Parking</span>
        </li>
        <li className="flex items-center gap-2">
          <FaBowlFood /> <span>24-Hour In Room Dining</span>
        </li>
        <li className="flex items-center gap-2">
          <FaBath /> <span>Spa-Style Bathroom</span>
        </li>
        <li className="flex items-center gap-2">
          <FaBox /> <span>Unpacking & Packing Service</span>
        </li>
        <li className="flex items-center gap-2">
          <LuCoffee /> <span>Luxury In-Room Refreshments</span>
        </li>
        <li className="flex items-center gap-2">
          <GrYoga /> <span>Wellness Pavilion Access</span>
        </li>
        <li className="flex items-center gap-2">
          <BsLightningChargeFill /> <span>Suite Work Desk & Charging Hub</span>
        </li>
      </RoomDetailsLists>
    </div>
  );
}

export default HotelFeature;
