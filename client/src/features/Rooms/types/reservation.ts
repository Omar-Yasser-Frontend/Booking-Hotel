import z from "zod";

export const reservation = z.object({
  reservationDate: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    "Please Select date",
  ),
  extras: z.array(z.string().max(30)),
  guests: z
    .string()
    .min(1, "Guests can't be less than 1")
    .max(25, "Exceeded max guests capacity"),
  room: z
    .string()
    .min(1, "Rooms can't be less than 1")
    .max(12, "Exceeded max rooms capacity"),
  notes: z.string().max(50, "Please, Keep notes short(Max 50 letter)"),
});

export type ReservationType = z.infer<typeof reservation>;
