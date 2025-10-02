import { Link, NavLink } from "react-router";
import { AiOutlineHeart } from "react-icons/ai";
import useMe from "../hooks/useMe";

function NavLinksModal() {
  const { data, isPending, isError } = useMe();
  const user = !isPending && !isError ? data?.user : null;

  return (
    <nav>
      {user && (
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <img
              src={user.image || "/images/default-user.jpg"}
              alt="Profile"
              className="border-base h-10 w-10 rounded-full border-2 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base text-sm font-semibold">
                {user.username}
              </p>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>
            <Link
              to="/wishlists"
              className="border-base hover:bg-base focus-visible:ring-accent-500 inline-flex items-center gap-2 rounded-md border-2 px-3 py-2 text-base text-sm font-semibold duration-300 hover:text-white focus-visible:ring-2 focus-visible:outline-none"
            >
              <AiOutlineHeart size={18} />
              <span>Favorites</span>
            </Link>
          </div>
        </div>
      )}
      <ul className="flex flex-col justify-stretch gap-4 text-base font-semibold">
        <li>
          <NavLink
            className={
              "hover:text-accent-500 hover:bg-gray-main relative block w-full p-4 duration-300 hover:pl-8"
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={
              "hover:text-accent-500 hover:bg-gray-main relative block w-full p-4 duration-300 hover:pl-8"
            }
            to={"/rooms"}
          >
            Rooms / Hotels
          </NavLink>
        </li>
        <li>
          <NavLink
            className={
              "hover:text-accent-500 hover:bg-gray-main relative block w-full p-4 duration-300 hover:pl-8"
            }
            to={"/About us"}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            className={
              "hover:text-accent-500 hover:bg-gray-main relative block w-full p-4 duration-300 hover:pl-8"
            }
            to={"/Contact"}
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
      {!user && (
        <div className="mt-4 flex flex-col gap-3 p-4">
          <NavLink
            to="/login"
            className="border-base hover:bg-base focus-visible:ring-accent-500 block w-full border-2 bg-transparent px-4 py-3.5 text-center text-base text-sm font-semibold duration-300 hover:text-white focus-visible:ring-2 focus-visible:outline-none"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="border-base bg-base focus-visible:ring-accent-500 block w-full border-2 px-4 py-3.5 text-center text-sm font-bold text-white duration-300 hover:bg-transparent hover:text-base focus-visible:ring-2 focus-visible:outline-none"
          >
            Signup
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default NavLinksModal;
