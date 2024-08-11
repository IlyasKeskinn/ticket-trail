import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(150, { message: "Title must be less than 150 characters." }),
  desc: z
    .string()
    .min(3, { message: "Desc must be at least 3 characters. " })
    .max(750, {
      message: "Description must be less than 750 characters.",
    }),
  countryId: z.string(),
  cityId: z.string(),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters." })
    .max(400, { message: "Location must be less than 400 characters" }),
  image: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string(),
  categoryId: z.string(),
});
