import { Router } from "express";
import userModel from "../models/User.model.js";
import recipeModel from "../models/Recipe.model.js";

const userRouter = Router();

userRouter.post("/create", async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Sorry, something is wrong. Try again later!" });
  }
});

userRouter.get("/read/:userId", async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.userId)
      .populate("recipes");
    res.status(200).json(user);
  } catch (err) {
    res
      .status(402)
      .json({ msg: "Sorry, something is wrong. Try again later!" });
  }
});

userRouter.put("/update/:userId", async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.userId,
      { ...req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res
      .status(402)
      .json({ msg: "Sorry, something is wrong. Try again later!" });
  }
});

userRouter.delete("/delete/:userId", async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.userId);

    await recipeModel.deleteMany({
      _id: { $in: [...user.recipes] },
    });
    res.status(204).json(user);
  } catch (err) {
    res
      .status(402)
      .json({ msg: "Sorry, something is wrong. Try again later!" });
  }
});

export default userRouter;
