import type { ProcessedBookingData } from "./CheckoutForm";

interface ChechoutSummeryProps {
  bookingData: ProcessedBookingData;
}

function ChechoutSummery({ bookingData }: ChechoutSummeryProps) {
  return (
    <div>
      <h2 className="mt-8 mb-4 text-2xl font-semibold">Booking Summary</h2>
      <div className="mb-8 rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-2 gap-4 border-b border-gray-100 p-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Check In</p>
            <p className="text-base">
              {new Date(bookingData.checkIn).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Check Out</p>
            <p className="text-base">
              {new Date(bookingData.checkOut).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Duration</p>
            <p className="text-base">{bookingData.nightsCount} nights</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Rooms & Guests</p>
            <p className="text-base">
              {bookingData.room} {bookingData.room === 1 ? "room" : "rooms"} ·{" "}
              {bookingData.guests}{" "}
              {bookingData.guests === 1 ? "guest" : "guests"}
            </p>
          </div>
        </div>

        {bookingData.extras && (
          <div className="border-b border-gray-100 p-4">
            <h4 className="mb-2 text-sm font-medium text-gray-600">
              Additional Services
            </h4>
            <div className="space-y-2">
              {bookingData.extras.map(
                (extra: { name: string; price: number }, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{extra.name}</span>
                    <span className="font-medium">${extra.price}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {bookingData.notes && (
          <div className="border-b border-gray-100 p-4">
            <h4 className="mb-1 text-sm font-medium text-gray-600">
              Special Requests
            </h4>
            <p className="text-sm text-gray-600">{bookingData.notes}</p>
          </div>
        )}

        <div className="flex items-center justify-between p-4">
          <span className="text-base font-medium">Total Amount</span>
          <span className="text-accent-600 text-lg font-semibold">
            ${bookingData.totalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChechoutSummery;
