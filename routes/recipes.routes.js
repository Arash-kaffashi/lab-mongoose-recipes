import express from "express";
import Recipe from "../models/Recipe.model.js";
import User from "../models/User.model.js";
import data from "../data.json" assert { type: "json" };

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ msg: "Sorry, something is wrong. Try again later!" });
  }
});

router.post("/insert", async (req, res) => {
  try {
    const insertRecipes = await Recipe.insertMany(data);

    return res.status(201).json(insertRecipes);
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ msg: "Sorry, something is wrong. Try again later!" });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const update = await Recipe.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(update);
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ msg: "Sorry, something is wrong. Try again later!" });
  }
});
/* 
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteRecipe = await Recipe.findByIdAndDelete(id);

    return res.status(200).json(deleteRecipe);
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ msg: "Sorry, something is wrong. Try again later!" });
  }
}); */

router.post("/create/:userId", async (req, res) => {
  try {
    const newRecipe = await Recipe.create(...req.body);
    await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { recipes: newRecipe._id } },
      { new: true, runValidators: true }
    );

    return res.status(201).json(newRecipe);
  } catch (error) {
    return res
      .status(404)
      .json({ msg: "Sorry, something is wrong. Try again later!" });
  }
});

router.delete("/delete/:recipeId", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.recipeId);
    await User.updateMany(
      { recipes: { $in: [req.params.recipeId] } },
      { $pull: { recipes: req.params.recipeId } }
    );
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ msg: "Sorry, something is wrong. Try again later!" });
  }
});

export default router;
