const z = require("zod");

exports.roomSchema = z
  .object({
    name: z.string().trim().min(3).max(100),
    description: z.string().trim().min(10).max(1000),
    thumbnail: z.string().url().trim().max(500),
    images: z.array(z.string().url().trim().max(500)).max(10),
    isAvailable: z.boolean(),
    capacity: z.object({
      guests: z.number().min(1).max(100),
      rooms: z.number().min(1).max(100),
    }),
    extras: z.array(z.string().trim().max(30)),
    location: z.object({
      country: z.string().trim().max(25),
      city: z.string().trim().max(25),
      address: z.string().trim().max(200),
    }),
    pricePerNight: z.number().positive(),
    rating: z.number().min(0).max(5),
    reviewsCount: z.number().min(0),
  })
  .strict();
