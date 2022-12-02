import mongoose from "mongoose";
import Recipe from "../models/Recipe.model.js";

export default async function connect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfuly connected to " + dbConnection.connection.name);
    return dbConnection;
  } catch (err) {
    console.log("Error connecting to the database", err.errors);
  }
}
