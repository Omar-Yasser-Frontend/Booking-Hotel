import { Outlet } from "react-router";
import ProfileNav from "../features/profile/components/ProfileNav";
import Container from "../components/Container";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import Modal from "../components/Modal";

function ProfileLayout() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <div className="bg-gray-main block p-3 sm:hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="ml-auto block cursor-pointer p-2 text-xl"
          >
            <CiMenuBurger />
          </button>
        </div>

        <Container>
          <div className="border-gray-main grid grid-cols-6 border shadow-2xl">
            <aside className="border-gray-main col-start-1 col-end-3 hidden border-r sm:block">
              <ProfileNav />
            </aside>
            <div className="col-start-1 -col-end-1 p-4 sm:col-start-3">
              <Outlet />
            </div>
          </div>
        </Container>
      </div>
      {showModal && (
        <Modal dir="to-right" close={() => setShowModal(false)}>
          <ProfileNav />
        </Modal>
      )}
    </>
  );
}

export default ProfileLayout;
