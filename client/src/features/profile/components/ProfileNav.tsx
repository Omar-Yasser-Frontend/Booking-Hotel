import { Link } from "react-router";
import LogoutBtn from "../../../components/LogoutBtn";

function ProfileNav() {
  return (
      <nav>
        <ul>
          <li>
            <Link
              className="block p-4 duration-300 hover:bg-gray-100 hover:underline active:bg-gray-200"
              to={"/profile/info"}
            >
              Information
            </Link>
          </li>
          <li>
            <Link
              className="block p-4 duration-300 hover:bg-gray-100 hover:underline active:bg-gray-200"
              to={"/profile/change-password"}
            >
              Change Password
            </Link>
          </li>
          <li>
            <Link
              className="block p-4 duration-300 hover:bg-gray-100 hover:underline active:bg-gray-200"
              to={"/profile/history"}
            >
              Booking History
            </Link>
          </li>
          <li>
            <Link
              className="block p-4 duration-300 hover:bg-gray-100 hover:underline active:bg-gray-200"
              to={"/profile/activities"}
            >
              Activities
            </Link>
          </li>
          <li>
            <LogoutBtn />
          </li>
        </ul>
      </nav>
  );
}

export default ProfileNav;
