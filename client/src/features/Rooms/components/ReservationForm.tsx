import { zodResolver } from "@hookform/resolvers/zod";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import PrimaryBtn from "../../../components/PrimaryBtn";
import { useBooking } from "../hooks/useBooking";
import useRoom from "../hooks/useRoom";
import { reservation, type ReservationType } from "../types/reservation";
import { formatFormPrice } from "../utils/formatPrice";
import ExtrasFormInput from "./ExtrasFormInput";
import FormTextInputs from "./FormTextInputs";
import ReservationDateForm from "./ReservationDateForm";
import { useReserved } from "../hooks/useReserved";
import Loading from "../../../components/Loading";

function ReservationForm() {
  const { mutate: book, isPending } = useBooking();
  const {
    data: reservedRooms,
    isPending: isPendingDates,
    isError,
    error,
  } = useReserved();
  const navigate = useNavigate();
  const { data } = useRoom();
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<ReservationType>({
    mode: "all",
    resolver: zodResolver(reservation),
  });

  return (
    <form
      onSubmit={handleSubmit(async (bookingForm) => {
        const buildBooking = {
          roomId: data?.room._id as string,
          checkIn: bookingForm.reservationDate.from,
          checkOut: bookingForm.reservationDate.to,
          extras: bookingForm.extras,
          notes: bookingForm.notes,
          guests: Number(bookingForm.guests),
          room: Number(bookingForm.room),
        };

        book(buildBooking, {
          onSuccess: (data) => {
            sessionStorage.setItem("clientSecret", JSON.stringify(data));
            navigate("/checkout");
          },
        });

        reset();
      })}
      className="space-y-3"
    >
      {isPendingDates ? (
        <Loading />
      ) : isError ? (
        error.message
      ) : (
        <ReservationDateForm
          control={control}
          disabled={reservedRooms.dates}
          error={errors.reservationDate?.message}
          pricePerNight={data?.room.pricePerNight as number}
        />
      )}

      <ExtrasFormInput
        control={control}
        extras={
          data?.room.extras as unknown as { name: string; price: number }[]
        }
      />

      <FormTextInputs errors={errors} register={register} />

      <hr className="bg-black" />

      <p className="flex items-center justify-between text-xl font-semibold">
        <span>Total:</span>{" "}
        <span>
          {data && watch().reservationDate && formatFormPrice(data, watch)}$
        </span>
      </p>

      <PrimaryBtn className="w-full" isPending={isPending}>
        Checkout
      </PrimaryBtn>
    </form>
  );
}

export default ReservationForm;
