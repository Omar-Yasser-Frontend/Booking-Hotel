import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import Modal from "./Modal";
import NavLinksModal from "./NavLinksModal";
function HeaderMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const close = () => setShowMenu(false);

  return (
    <div>
      <div
        className="cursor-pointer rounded-md border-2 border-white p-1 lg:hidden"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          setShowMenu((show) => !show);
        }}
      >
        <CiMenuBurger size={24} />
      </div>

      {showMenu && (
        <Modal close={close} dir="to-right">
          <NavLinksModal />
        </Modal>
      )}
    </div>
  );
}

export default HeaderMenu;
