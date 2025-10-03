import { useState } from "react";
import { useSearchParams } from "react-router";
import { useSyncSearchParams } from "../hooks/useSyncSearchParams";

function FilterSortBy() {
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(() => {
    return searchParams.get("sort") || "";
  });
  const updateSortParams = useSyncSearchParams(setSort, "sort");

  return (
    <div className="ml-auto block w-fit">
      <label htmlFor="sort">
        <h3 className="mt-4 text-right text-xl font-semibold">Sort By</h3>
      </label>
      <select
        className="mt-3 block bg-gray-100 p-3 shadow"
        name="sort"
        id="sort"
        value={sort}
        onChange={(e) => {
          const value = e.target.value;
          setSort(value);
          updateSortParams(value);
        }}
      >
        <option value="">Select All</option>
        <option value="-pricePerNight">Highest Price</option>
        <option value="pricePerNight">Lowest Price</option>
        <option value="-capacity.rooms">Highest Rooms Capacity</option>
        <option value="capacity.rooms">Lowest Rooms Capacity</option>
        <option value="-capacity.guests">Highest Guests Capacity</option>
        <option value="capacity.guests">Lowest Guests Capacity</option>
      </select>
    </div>
  );
}

export default FilterSortBy;
