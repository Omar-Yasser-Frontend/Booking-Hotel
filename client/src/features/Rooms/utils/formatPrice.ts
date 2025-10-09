import type { UseFormWatch } from "react-hook-form";
import type { ReservationType } from "../types/reservation";

export function formatFormPrice(
  data: {
    room: { extras: { name: string; price: number }[]; pricePerNight: number };
  },
  watch: UseFormWatch<ReservationType>,
) {
  const totalPrice =
    data?.room.pricePerNight *
      ((new Date(watch().reservationDate.to).getTime() -
        new Date(watch().reservationDate.from).getTime()) /
        (1000 * 60 * 60 * 24)) +
    data.room.extras
      .filter((extra) => watch().extras.includes(extra.name))
      .reduce((acc, cur) => cur.price + acc, 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);
}
