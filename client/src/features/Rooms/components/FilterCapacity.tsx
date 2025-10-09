import { useRef, useState } from "react";
import Input from "../../../components/Input";
import { useSyncSearchParams } from "../hooks/useSyncSearchParams";
import { useSearchParams } from "react-router";
import { preventStringsInInputs } from "../utils/preventStringsInInputs";

function FilterCapacity() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomCap, setRoomCap] = useState(() => {
    return searchParams.get("rooms[lte]") || "";
  });
  const [guestCap, setGuestCap] = useState(() => {
    return searchParams.get("guests[lte]") || "";
  });
  const updateRoomCapParams = useSyncSearchParams(setRoomCap, "rooms[lte]");
  const updateGuestsCapParams = useSyncSearchParams(setGuestCap, "guests[lte]");
  const roomTimeoutID = useRef<null | NodeJS.Timeout>(null);
  const guestTimeoutID = useRef<null | NodeJS.Timeout>(null);

  return (
    <div>
      <h3 className="mt-4 text-xl font-semibold">Capacity</h3>

      <Input
        type="number"
        id="rooms-cap"
        value={roomCap}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;

          if (roomTimeoutID.current !== null)
            clearTimeout(roomTimeoutID.current);

          setRoomCap(e.target.value);
          roomTimeoutID.current = setTimeout(() => {
            updateRoomCapParams(value);
          }, 300);
        }}
        onKeyDown={preventStringsInInputs}
        maxLength={2}
        placeholder="Rooms capacity"
        label="Max Rooms Capacity (<= 12)"
      />
      <Input
        label="Max guests Capacity (<= 25)"
        type="number"
        id="guests-cap"
        value={guestCap}
        onKeyDown={preventStringsInInputs}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;

          if (guestTimeoutID.current !== null)
            clearTimeout(guestTimeoutID.current);

          setGuestCap(e.target.value);
          guestTimeoutID.current = setTimeout(() => {
            updateGuestsCapParams(value);
          }, 300);
        }}
        maxLength={2}
        placeholder="Guests capacity"
      />
      <button
        onClick={() => {
          updateRoomCapParams("");
          updateGuestsCapParams("");
          const urlSearchParams = new URLSearchParams(searchParams);
          urlSearchParams.delete("rooms[lte]");
          urlSearchParams.delete("guests[lte]");
          setSearchParams(urlSearchParams);
        }}
        className="cursor-pointer hover:underline"
      >
        Reset
      </button>
    </div>
  );
}

export default FilterCapacity;
