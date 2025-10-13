import type { Reservation } from "../../../services/reservationAPI";

function BookInfoCard({
  checkIn,
  checkOut,
  extras,
  guests,
  intentId,
  nightsCount,
  notes,
  room,
  roomId,
  status,
  totalPrice,
}: Reservation) {
  return (
    <li className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex flex-wrap-reverse items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Booking #{intentId}</h3>
          <p className="text-sm text-gray-600">Room ID: {roomId}</p>
        </div>
        <span
          className={`ml-auto block rounded-full px-3 py-1 text-sm font-medium ${
            status === "paid"
              ? "bg-green-100 text-green-800"
              : status === "canceled"
                ? "bg-red-100 text-red-800"
                : status === "check-in"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Check In</p>
          <p className="text-base">{new Date(checkIn).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Check Out</p>
          <p className="text-base">{new Date(checkOut).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Nights</p>
          <p className="text-base">{nightsCount} nights</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Rooms & Guests</p>
          <p className="text-base">
            {room} {room === 1 ? "room" : "rooms"} · {guests}{" "}
            {guests === 1 ? "guest" : "guests"}
          </p>
        </div>
      </div>

      {extras.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-medium text-gray-600">Extras</h4>
          <div className="space-y-2">
            {extras.map((extra, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{extra.name}</span>
                <span className="font-medium">${extra.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {notes && (
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-medium text-gray-600">Notes</h4>
          <p className="text-sm text-gray-700">{notes}</p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <span className="text-base font-medium">Total Price</span>
        <span className="text-accent-600 text-lg font-semibold">
          ${totalPrice}
        </span>
      </div>
    </li>
  );
}

export default BookInfoCard;
