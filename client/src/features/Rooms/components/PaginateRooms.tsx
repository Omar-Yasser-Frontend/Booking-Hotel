import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSearchParams } from "react-router";

interface PaginateRoomsProps {
  roomsCount: number;
}

function PaginateRooms({ roomsCount }: PaginateRoomsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const style =
    "flex aspect-square w-10 cursor-pointer items-center justify-center text-xl duration-300 hover:bg-gray-100";

  function handlePageParams(isPositive: boolean, value?: number) {
    let newPage;

    if (isPositive && page >= Math.ceil(roomsCount / 10) && !value) return;
    if (!isPositive && page <= 1 && !value) return;

    if (value) newPage = value;
    else newPage = isPositive ? page + 1 : page - 1;

    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("page", String(newPage));
    setSearchParams(urlSearchParams);
  }

  return (
    <div className="mt-16 flex items-center justify-center">
      <button className={style} onClick={() => handlePageParams(false)}>
        <FaArrowLeft />
      </button>

      {Array.from({ length: Math.ceil(roomsCount / 10) }).map(
        (_, idx: number) => (
          <button
            className={`${style} ${page === idx + 1 ? "text-yellow-gold" : ""}`}
            onClick={() => handlePageParams(true, idx + 1)}
          >
            {idx + 1}
          </button>
        ),
      )}

      <button className={style} onClick={() => handlePageParams(true)}>
        <FaArrowRight />
      </button>
    </div>
  );
}

export default PaginateRooms;
