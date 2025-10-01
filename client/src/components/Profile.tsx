import { Link } from "react-router";
import useMe from "../hooks/useMe";
import HeaderMenu from "./HeaderMenu";
import LoginBtn from "./LoginBtn";
import { FaSearch } from "react-icons/fa";
import SignupBtn from "./SignupBtn";
import { AiOutlineHeart } from "react-icons/ai";

function Profile() {
  const { data, isPending, isError } = useMe();

  const user = !isPending && !isError ? data?.user : null;

  if (!user)
    return (
      <div className="ml-auto flex items-center gap-4">
        <div className="hidden items-center gap-4 sm:flex">
          <LoginBtn /> <SignupBtn />
        </div>
        <HeaderMenu />
      </div>
    );

  return (
    <div className="ml-auto flex items-center gap-1 sm:gap-4">
      <button className="block cursor-pointer rounded-md border-2 border-white p-2">
        <FaSearch className="text-9 sm:text-10" />
      </button>
      <Link
        to={"/favorit"}
        className="focus-visible:ring-accent-500 hidden items-center gap-2 rounded-md border-2 border-white px-3 py-2 text-sm font-semibold text-white duration-300 hover:bg-white hover:text-base focus-visible:ring-2 focus-visible:outline-none sm:inline-flex"
      >
        <AiOutlineHeart size={18} />
        <span>Favorites</span>{" "}
      </Link>
      <Link to={"/profile"}>
        <img
          src={user?.image || "/image/default-user.jpg"}
          className="aspect-square w-9 rounded-full sm:w-10"
          alt=""
        />
      </Link>

      <HeaderMenu />
    </div>
  );
}

export default Profile;
