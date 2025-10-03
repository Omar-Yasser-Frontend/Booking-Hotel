import { FaFilter } from "react-icons/fa";
import Container from "../../../components/Container";
import FilterSortBy from "./FilterSortBy";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import { useState } from "react";
import Modal from "../../../components/Modal";

function RoomsBody() {
  const [show, setShow] = useState(false);

  return (
    <Container>
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
    </Container>
  );
}

export default RoomsBody;
