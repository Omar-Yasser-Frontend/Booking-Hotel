import { Link } from "react-router";

function LoginBtn() {
  return (
    <Link
      to="/login"
      className="border-base focus:ring-accent-500 cursor-pointer rounded-none border-2 bg-transparent px-3 py-3 text-sm font-semibold text-white duration-300 hover:border-white hover:bg-white hover:text-black focus:ring-2 focus:outline-none sm:px-6"
    >
      Login
    </Link>
  );
}

export default LoginBtn;
