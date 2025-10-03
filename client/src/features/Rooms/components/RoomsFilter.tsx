import FilterCapacity from "./FilterCapacity";
import FilterLocation from "./FilterLocation";
import PriceFilter from "./PriceFilter";

interface RoomsFilterProps {
  isMobile?: boolean;
}

function RoomsFilter({ isMobile = false }: RoomsFilterProps) {
  return (
    <aside className={`p-6 md:shadow-xl ${isMobile ? "hidden md:block" : ""}`}>
      <h2 className="text-3xl font-bold">Filter Rooms</h2>
      <FilterLocation />
      <FilterCapacity />
      <PriceFilter />
    </aside>
  );
}

export default RoomsFilter;
