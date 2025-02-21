import { Schema, model } from "mongoose";

const SharedCartLinkSchema = new Schema({
  link: String,
  cart_id: String,
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
    index: { expires: "24h" },
  },
});

export default model("SharedCartLink", SharedCartLinkSchema);
