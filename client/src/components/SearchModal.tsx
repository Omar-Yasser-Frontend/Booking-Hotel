import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { AiOutlineSearch, AiOutlineStar, AiOutlineUser } from "react-icons/ai";
import { useSearch } from "../hooks/useSearch";

function SearchModal() {
  const { data, mutate: search, isPending, isError, error } = useSearch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) return;
    const id = setTimeout(() => {
      search(query.trim());
    }, 350);
    return () => clearTimeout(id);
  }, [query, search]);

  const rooms = useMemo(() => data?.rooms ?? [], [data]);
  const hasTyped = query.trim().length > 0;
  const showEmpty = !isPending && hasTyped && rooms.length === 0 && !isError;

  return (
    <div className="flex max-h-[80vh] w-full flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
      <div className="sticky top-0 z-10 border-b bg-white/80 p-3 backdrop-blur">
        <label htmlFor="search" className="sr-only">
          Search rooms
        </label>
        <div className="focus-within:ring-accent-500 flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm focus-within:ring-2">
          <AiOutlineSearch className="text-gray-400" size={18} />
          <input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rooms, cities, keywords..."
            className="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
            autoFocus
          />
        </div>
      </div>

      <div className="min-h-[220px] overflow-y-auto p-3">
        {!hasTyped && (
          <div className="py-8 text-center text-sm text-gray-500">
            Start typing to search rooms
          </div>
        )}

        {isPending && hasTyped && (
          <ul className="grid grid-cols-1 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="animate-pulse">
                <div className="flex items-stretch gap-3 rounded-lg border p-2">
                  <div className="h-16 w-16 rounded bg-gray-200" />
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 h-4 w-2/3 rounded bg-gray-200" />
                    <div className="mb-1 h-3 w-1/3 rounded bg-gray-100" />
                    <div className="h-3 w-1/2 rounded bg-gray-100" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {isError && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error instanceof Error
              ? error.message
              : "Something went wrong while searching."}
          </div>
        )}

        {showEmpty && (
          <div className="py-8 text-center text-sm text-gray-500">
            No rooms found for "{query.trim()}"
          </div>
        )}

        {rooms.length > 0 && (
          <ul className="grid grid-cols-1 gap-3">
            {rooms.map((room) => (
              <li key={room._id}>
                <Link
                  to={`/rooms/${room._id}`}
                  className="group flex items-stretch gap-3 rounded-lg border p-2 shadow-sm transition hover:shadow-md"
                >
                  <img
                    src={room.thumbnail}
                    alt={room.name}
                    className="h-16 w-16 flex-none rounded-md object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="truncate text-[13px] font-semibold text-gray-900">
                        {room.name}
                      </h3>
                      <span className="bg-burgundy/10 text-burgundy shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap">
                        ${""}
                        {room.pricePerNight}
                        <span className="text-burgundy/80 ml-0.5 text-[10px]">
                          /night
                        </span>
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-gray-600">
                      {room.location?.city}, {room.location?.country}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <AiOutlineUser />
                        {room.capacity?.guests}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-700">
                        <AiOutlineStar className="text-amber-500" />
                        {room.rating?.toFixed?.(1) ?? room.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchModal;
