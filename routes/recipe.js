const routes = require("express").Router();
const authenticate = require("../middlewares/Auth");
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe");

routes.route("/").post(createRecipe).get(authenticate, getAllRecipes);
routes
  .route("/:recipeId")
  .get(getRecipeById)
  .put(authenticate, updateRecipe)
  .delete(authenticate, deleteRecipe);

module.exports = routes;
