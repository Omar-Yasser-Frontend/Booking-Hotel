import PrimaryBtn from "../../../components/PrimaryBtn";

function ReservationForm() {
  return (
    <form className="space-y-3">
      <div>
        <label className="mb-1 block text-sm opacity-80" htmlFor="checkIn">
          Check-in
        </label>
        <input
          id="checkIn"
          type="date"
          className="w-full rounded-md bg-white px-3 py-2 focus:outline-none"
          placeholder="Select date"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm opacity-80" htmlFor="checkOut">
          Check-out
        </label>
        <input
          id="checkOut"
          type="date"
          className="w-full rounded-md bg-white px-3 py-2 focus:outline-none"
          placeholder="Select date"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm opacity-80" htmlFor="guests">
            Guests
          </label>
          <input
            id="guests"
            type="number"
            min={1}
            className="w-full rounded-md bg-white px-3 py-2 focus:outline-none"
            placeholder="2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm opacity-80" htmlFor="rooms">
            Rooms
          </label>
          <input
            id="rooms"
            type="number"
            min={1}
            className="w-full rounded-md bg-white px-3 py-2 focus:outline-none"
            placeholder="1"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm opacity-80" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          className="w-full resize-none rounded-md bg-white px-3 py-2 focus:outline-none"
          placeholder="Any special requests"
        />
      </div>
      <PrimaryBtn className="w-full">Reserve</PrimaryBtn>
    </form>
  );
}

export default ReservationForm;
