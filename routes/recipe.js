const routes = require("express").Router();
const authenticate = require("../middlewares/Auth");
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe");

routes
  .route("/")
  .post(authenticate, createRecipe)
  .get(authenticate, getAllRecipes);
routes
  .route("/:recipeId")
  .get(authenticate, getRecipeById)
  .put(authenticate, updateRecipe)
  .delete(authenticate, deleteRecipe);

module.exports = routes;
