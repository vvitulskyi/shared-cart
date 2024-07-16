import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  shared_carts: {
    type: [Schema.Types.ObjectId],
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "The user must contain at least one shared_cart!",
    },
  },
});

export default model("User", UserSchema);
