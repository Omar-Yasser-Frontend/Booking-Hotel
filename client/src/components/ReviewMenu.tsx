import { FaPen, FaTrash } from "react-icons/fa";
import { useDeleteComment } from "../hooks/useDeleteComment";
import useOutsideClick from "../hooks/useOutsideClick";
import toast from "react-hot-toast";

function ReviewMenu({
  reviewId,
  isEdit,
  setIsEdit,
  close,
}: {
  reviewId: string;
  isEdit: boolean;
  setIsEdit: React.Dispatch<boolean>;
  close: () => void;
}) {
  const { mutateAsync: deleteReview } = useDeleteComment();
  const ref = useOutsideClick(close);

  return (
    <ul
      className="border-gray-main absolute top-[calc(100%+10px)] right-0 w-30 rounded-md border"
      ref={ref}
    >
      <li>
        <button
          onClick={() => {
            toast.promise(deleteReview(reviewId), {
              loading: "Deleteing...",
              success: "Comment Deleted",
              error: "Failed to delete comment",
            });
            close();
          }}
          className="border-gray-main flex w-full items-center gap-2 border-b px-4 py-2 hover:bg-gray-100"
        >
          <span>Delete</span> <FaTrash />
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            setIsEdit(true);
            close();
          }}
          className="border-gray-main flex w-full items-center gap-2 border-b px-4 py-2 hover:bg-gray-100"
        >
          <span>Edit</span> <FaPen />
        </button>
      </li>
    </ul>
  );
}

export default ReviewMenu;
