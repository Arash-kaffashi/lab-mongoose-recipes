import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  bio: String,
  age: Number,
  email: { type: String, required: true, unique: true },
  isChef: { type: Boolean, default: false },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

export default model("User", UserSchema);
