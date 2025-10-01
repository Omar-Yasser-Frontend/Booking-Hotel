import { Link } from "react-router";

function SignupBtn() {
  return (
    <Link
      to="/signup"
      className="bg-base cursor-pointer border-2 border-white px-3 py-3 text-sm font-bold text-white duration-300 hover:bg-white hover:text-black sm:px-6"
    >
      Signup
    </Link>
  );
}

export default SignupBtn;
