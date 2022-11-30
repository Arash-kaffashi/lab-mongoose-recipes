import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
