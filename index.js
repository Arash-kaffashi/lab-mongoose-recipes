import dotenv from "dotenv";
import connect from "./config/db.config.js";
import express from "express";
import recipeRouter from "./routes/recipes.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();
connect();

const app = express();

app.use(express.json());

app.use("/recipes", recipeRouter);
app.use("/user", userRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`server listening on PORT`, process.env.PORT);
});
