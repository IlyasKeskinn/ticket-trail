import { Schema, Types, model, models, Document } from "mongoose";

interface IEvent extends Document {
  _id: string;
  title: string;
  desc: string;
  country: { _id: string; name: string };
  city: { _id: string; name: string };
  location?: string;
  createdAt: Date;
  image: String;
  seatPlan?: String;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  isFree: boolean;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firtname: string; lastname: string; photo: string };
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: "Country", required: true },
  city: { type: Schema.Types.ObjectId, ref: "City", required: true },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, required: true },
  seatPlan: { type: String },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: true },
  organizer: { type: Schema.Types.ObjectId, required: true },
});

const Event = models.Event || model("Event", eventSchema);

export default Event;
