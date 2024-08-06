import { Schema, model, models, Document, Types } from "mongoose";

export interface ICity extends Document {
  _id: string;
  name: string;
  country: { _id: string; name: string };
}

const citySchema = new Schema<ICity>({
  name: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
});

const City = models.City || model("City", citySchema);

export default City;
