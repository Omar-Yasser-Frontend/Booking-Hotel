import { Link } from "react-router";
import useMe from "../hooks/useMe";
import HeaderMenu from "./HeaderMenu";
import LoginBtn from "./LoginBtn";
import { FaSearch } from "react-icons/fa";
import SignupBtn from "./SignupBtn";
import { AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import Modal from "./Modal";
import SearchModal from "./SearchModal";

function Profile() {
  const { data, isPending, isError } = useMe();
  const [showSearch, setShowSearch] = useState(false);
  const close = () => {
    setShowSearch(false);
    document.documentElement.style.overflow = "visible";
  };
  const open = () => {
    setShowSearch(true);
    document.documentElement.style.overflow = "hidden";
  };

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
    <>
      <div className="ml-auto flex items-center gap-1 sm:gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          className="block cursor-pointer rounded-md border-2 border-white p-2"
        >
          <FaSearch className="text-9 sm:text-10" />
        </button>
        <Link
          to={"/wishlists"}
          className="focus-visible:ring-accent-500 hidden items-center gap-2 rounded-md border-2 border-white px-3 py-2 text-sm font-semibold text-white duration-300 hover:bg-white hover:text-base focus-visible:ring-2 focus-visible:outline-none sm:inline-flex"
        >
          <AiOutlineHeart size={18} />
          <span>Wishlists</span>
        </Link>
        <Link to={"/profile/info"}>
          <img
            src={user?.image || "/images/default-user.jpg"}
            className="aspect-square w-9 rounded-full bg-white sm:w-10"
            alt=""
          />
        </Link>

        <HeaderMenu />
      </div>
      {showSearch && (
        <Modal close={close} dir="top-center">
          <Modal.Close close={close} absolute className="p-2" />
          <SearchModal />
        </Modal>
      )}
    </>
  );
}

export default Profile;
