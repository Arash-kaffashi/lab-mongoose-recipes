import mongoose from "mongoose";
// import { deleteMany } from "../models/Recipe.model.js";

export default async function connect() {
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfuly connected to " + dbConnection.connection.name);
  } catch (err) {
    console.log("Error connecting to the database", err.errors);
  }
  /*  try {
    await deleteMany();
  } catch (err) {
    console.log("Error cleaning database");
  } */
}
