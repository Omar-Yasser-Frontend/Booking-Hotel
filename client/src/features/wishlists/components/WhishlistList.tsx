import EmptyResult from "../../../components/EmptyResult";
import ErrorMessage from "../../../components/ErrorMessage";
import MainLoading from "../../../components/MainLoading";
import { useWishlist } from "../hooks/useWishlist";
import WishlistCard from "./WishlistCard";

function WhishlistList() {
  const { data, isPending, isError, error } = useWishlist();

  if (isPending) return <MainLoading />;

  if (isError) return <ErrorMessage message={error.message} />;

  if (!data.wishlists?.length)
    return <EmptyResult>You have no wishlists</EmptyResult>;

  return (
    <ul className="mt-10 space-y-5 px-5">
      {data.wishlists.map((wishlist) => (
        <WishlistCard {...wishlist} />
      ))}
    </ul>
  );
}

export default WhishlistList;
