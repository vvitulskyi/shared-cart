import { Schema, model } from "mongoose";

const SharedCartSchema = new Schema({
  items: {
    type: [
      {
        item_id: { type: Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
    index: { expires: "30d" },
  },
});

export default model("SharedCart", SharedCartSchema);
