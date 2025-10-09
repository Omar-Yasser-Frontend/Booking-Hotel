import { DayPicker } from "react-day-picker";
import { Controller, type Control } from "react-hook-form";
import type { ReservationType } from "../types/reservation";

interface ReservationDateFormProps {
  pricePerNight: number;
  control: Control<ReservationType>;
  error: string | undefined;
  disabled: { from: Date; to: Date }[];
}

function ReservationDateForm({
  pricePerNight,
  control,
  error,
  disabled,
}: ReservationDateFormProps) {
  return (
    <div>
      <label className="mb-1 block text-sm opacity-80" htmlFor="checkIn">
        Reservation Date (Night Price: {pricePerNight})
      </label>
      <Controller
        name="reservationDate"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => {
          const date = new Date();
          date.setDate(date.getDate() + 2);

          return (
            <>
              <DayPicker
                onSelect={onChange}
                selected={value}
                onDayBlur={onBlur}
                disabled={[{ before: date }, ...disabled]}
                animate
                mode="range"
                footer={
                  value ? (
                    <p>
                      Selected: From <b>{value.from.toLocaleDateString()}</b> To{" "}
                      <b>{value.to.toLocaleDateString()}</b>
                    </p>
                  ) : (
                    ""
                  )
                }
              />
              {error && <p className="text-sm text-red-700">{error}</p>}
            </>
          );
        }}
      />
    </div>
  );
}

export default ReservationDateForm;
