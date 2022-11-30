import dotenv from "dotenv";
import connect from "./config/db.config.js";
import Recipe from "./models/Recipe.model.js";
import data from "./data.json" assert { type: "json" };

dotenv.config();

async function init() {
  const connection = await connect();

  let recipe1 = await Recipe.create({
    title: "Sourdough Pancakes",
    level: "Easy Peasy",
    ingredients: [
      "1 1/2 cup (180g) all-purpose flour",
      "3 tablespoons (48g) sugar",
      "1/2 teaspoon baking powder",
      "1/2 teaspoon baking soda",
      "1/2 teaspoon salt",
      "3 large eggs, separated",
      "1 1/4 to 1 3/4 cup whole milk",
      "1/2 cup (113g) sourdough starter",
      "1 teaspoon vanilla extract",
      "3 tablespoons (42g) butter, melted and cooled",
      "4 tablespoons (56g) vegetable oil",
    ],
    cuisine: "american",
    dishType: "breakfast",
    image:
      "https://www.simplyrecipes.com/thmb/2nAw1xlcDLMpfm5_g9d65IhPL1Y=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Sourdough-Pancakes-LEAD-06-b2c033d3e5714d52a1fc7507082f66fb.jpg",
    duration: "15",
    creator: "Hannah dela Cruz",
  });
  console.log(`Recipe ${recipe1.title} submitted successfully`);

  let populate = await Recipe.insertMany(data);
  console.log(populate.map((recipe) => recipe.title).join(", "));

  await Recipe.findOneAndUpdate(
    { title: "Rigatoni alla Genovese" },
    { duration: 100 },
    { new: true, runValidators: true }
  );
  console.log("Rigatoni alla Genovese successfully updated.");

  await Recipe.deleteOne({ title: "Carrot Cake" });
  console.log("Carrot Cake successfully removed.");

  connection.disconnect();
}

init();
