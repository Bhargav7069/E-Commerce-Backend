import mongoose, { Schema } from "mongoose";

export interface Icatory extends Document {
  name: string;
  description?: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

export default mongoose.model<Icatory>("Category", CategorySchema);
