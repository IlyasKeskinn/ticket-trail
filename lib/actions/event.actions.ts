"use server";
import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import { revalidatePath } from "next/cache";

export async function createEvent({ userId, event, path }: CreateEventParams) {
  await connectToDatabase();

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      country: event.countryId,
      city: event.cityId,
      organizer : userId
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}
