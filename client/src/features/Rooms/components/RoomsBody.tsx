import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Modal from "../../../components/Modal";
import FilterSortBy from "./FilterSortBy";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

function RoomsBody() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="h-70">
        <img
          src="/images/desert-morocco-adventure.jpg"
          alt="Picture of desert camp in morocco"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative -mt-50">
        <div className="relative container mx-auto h-full rounded-2xl bg-white p-8 shadow">
          <FilterSortBy />

          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setShow((show) => !show);
            }}
            className="bg-base mt-4 ml-auto block cursor-pointer border-2 p-3 text-white duration-300 hover:bg-white hover:text-base md:hidden"
          >
            <FaFilter />
          </button>

          {show && (
            <Modal dir="to-right" close={() => setShow(false)}>
              <RoomsFilter />
            </Modal>
          )}

          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[300px_1fr]">
            <RoomsFilter isMobile />
            <RoomsList />
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomsBody;
