import z from "zod";

export const reservationSchema = z
  .object({
    roomId: z.string().length(24, "Invalid room id"),
    checkIn: z.string().datetime("Invalid Date for checkin"),
    checkOut: z.string().datetime("Invalid Date for checkout"),
    extras: z.array(z.string().max(40)),
    guests: z.number().min(1),
    room: z.number().min(1),
    notes: z.string().max(50).default(""),
  })
  .refine(
    (data) =>
      new Date(data.checkIn).getTime() < new Date(data.checkOut).getTime(),
    "checkIn is later than checkOut"
  )
  .strict();
