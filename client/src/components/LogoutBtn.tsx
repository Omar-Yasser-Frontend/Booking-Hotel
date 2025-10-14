import { useLogout } from "../features/profile/hooks/useLogout";

function LogoutBtn() {
  const { mutate: logout, isPending } = useLogout();
  return (
    <button
      disabled={isPending}
      className="block w-full cursor-pointer bg-red-50 p-4 text-start duration-300 hover:bg-red-100 active:bg-red-200"
      onClick={() => logout()}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
