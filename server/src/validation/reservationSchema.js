import z from "zod";

export const reservationSchema = z
  .object({
    roomId: z.string().length(24, "Invalid room id"),
    checkIn: z.string().datetime("Invalid Date for checkin"),
    checkOut: z.string().datetime("Invalid Date for checkin"),
    extras: z.array(z.string().max(40)),
  })
  .refine(
    (data) =>
      new Date(data.checkIn).getTime() < new Date(data.checkOut).getTime(),
    "checkIn is later than checkOut"
  )
  .strict();
