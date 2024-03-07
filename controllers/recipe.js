const Recipe = require("../models/Recipe");

class RecipeController {
  // 1 Create a new recipe
  async createRecipe(req, res, next) {
    try {
      const { title, description, ingredients, instructions } = req.body;

      if (!(title && description && ingredients && instructions)) {
        return res.status(400).json({
          msg: "All fields are required",
        });
      }

      const recipe = new Recipe(title, description, ingredients, instructions);
      const result = await recipe.save();

      res.status(201).json({
        msg: "Recipe created successfully",
        recipe: result,
      });
    } catch (error) {
      next(
        res.status(500).json({
          msg: error.message,
        })
      );
    }
  }

  // 2 Get all recipes
  async getAllRecipes(req, res, next) {
    try {
      const recipes = await Recipe.getAllRecipes();
      res.status(200).json({
        recipes: recipes,
        msg: "Success",
      });
    } catch (error) {
      next(
        res.status(500).json({
          msg: error.message,
        })
      );
    }
  }

  // 3 Get a recipe by ID
  async getRecipeById(req, res, next) {
    try {
      const { recipeId } = req.params;
      const recipe = await Recipe.getRecipeById(recipeId);

      if (!recipe) {
        return res.status(404).json({
          msg: "Recipe not found",
        });
      }

      res.status(200).json({
        recipe: recipe,
        msg: "Success",
      });
    } catch (error) {
      next(
        res.status(500).json({
          msg: error.message,
        })
      );
    }
  }

  // 4 Update a recipe by ID
  async updateRecipe(req, res, next) {
    try {
      const { recipeId } = req.params;
      const { title, description, ingredients, instructions } = req.body;

      const recipe = new Recipe(title, description, ingredients, instructions);
      const updatedRecipe = await recipe.updateRecipe(recipeId);

      if (!updatedRecipe) {
        return res.status(404).json({
          msg: "Recipe not found",
        });
      }

      res.status(200).json({
        msg: "Recipe updated successfully",
        recipe: updatedRecipe,
      });
    } catch (error) {
      next(
        res.status(500).json({
          msg: error.message,
        })
      );
    }
  }

  // 5 Delete a recipe by ID
  async deleteRecipe(req, res, next) {
    try {
      const { recipeId } = req.params;
      const deletedRecipe = await Recipe.deleteRecipe(recipeId);

      if (!deletedRecipe) {
        return res.status(404).json({
          msg: "Recipe not found",
        });
      }

      res.status(200).json({
        msg: "Recipe deleted successfully",
      });
    } catch (error) {
      next(
        res.status(500).json({
          msg: error.message,
        })
      );
    }
  }
}

module.exports = new RecipeController();
