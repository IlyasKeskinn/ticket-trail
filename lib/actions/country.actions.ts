"use server";

import { connectToDatabase } from "../database";
import Country from "../database/models/country.model";
import { handleError } from "../utils";

export async function getAllCountry() {
  try {
    await connectToDatabase();

    const countries = await Country.find();

    return JSON.parse(JSON.stringify(countries));
  } catch (error) {
    handleError(error);
  }
}
