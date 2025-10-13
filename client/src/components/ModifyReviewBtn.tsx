import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import ReviewMenu from "./ReviewMenu";

function ModifyReviewBtn({
  reviewId,
  isEdit,
  setIsEdit,
}: {
  reviewId: string;
  isEdit: boolean;
  setIsEdit: React.Dispatch<boolean>;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const close = () => setShowMenu(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu((show) => !show);
        }}
        className="border-gray-main cursor-pointer border p-2"
      >
        <CiMenuKebab />
      </button>
      {showMenu && (
        <ReviewMenu
          {...{ isEdit, setIsEdit }}
          close={close}
          reviewId={reviewId}
        />
      )}
    </div>
  );
}

export default ModifyReviewBtn;
