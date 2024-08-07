"use server";

import { getCitiesByCounrtyId } from "@/types";
import { connectToDatabase } from "../database";
import City from "../database/models/city.model";
import { handleError } from "../utils";

export async function getCitiesByCountryId(country: getCitiesByCounrtyId) {
  try {
    await connectToDatabase();
    console.log(country.country)

    const cities = await City.find({ country: country.country });

    return JSON.parse(JSON.stringify(cities));
  } catch (error) {
    handleError(error);
  }
}
