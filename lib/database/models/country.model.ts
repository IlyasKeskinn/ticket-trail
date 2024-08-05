import { Schema, model, models, Document } from "mongoose";

export interface ICountry extends Document {
  _id: string;
  name: string;
}

const countrySchema = new Schema<ICountry>({
  name: { type: String, required: true, unique: true },
});

const Country = models.Country || model("Country", countrySchema);

export default Country;
