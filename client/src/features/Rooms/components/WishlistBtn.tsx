import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMyWishlist } from "../hooks/useMyWishlist";
import { useCreateWishlist } from "../hooks/useCreateWishlist";
import { useDeleteWishlist } from "../../../hooks/useDeleteWishlist";
import toast from "react-hot-toast";
import { useParams } from "react-router";

function WishlistBtn() {
  const { roomId } = useParams();
  const { mutateAsync: createWishlist, isPending: isPendingCreate } =
    useCreateWishlist();
  const { mutateAsync: deleteWishlist, isPending: isPendingDelete } =
    useDeleteWishlist();
  const { data, isPending, isError } = useMyWishlist();

  return (
    <button
      onClick={() =>
        data
          ? toast.promise(deleteWishlist(data.wishlist._id), {
              loading: "Deleting Wishlist",
              success: "Wishlist Deleted",
              error: "Failed to delete wishlist",
            })
          : toast.promise(createWishlist({ roomId: roomId as string }), {
              loading: "Adding To Wishlist",
              success: "Room Added To Wishlist",
              error: "Failed to Add To wishlist",
            })
      }
      className="rounded-md border-3 border-white bg-black p-2 text-[16px] text-white duration-300 hover:border-black hover:bg-white hover:text-black"
      disabled={isPending || isError || isPendingCreate || isPendingDelete}
    >
      {data ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
}

export default WishlistBtn;
