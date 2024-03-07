const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: String, required: true },
});
const recipeModel = mongoose.model("Recipe", recipeSchema);

class Recipe {
  constructor(title, description, ingredients, instructions) {
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }

  //   create a new Recipe
  async save() {
    try {
      const newRecipe = await recipeModel.create({
        title: this.title,
        description: this.description,
        ingredients: this.ingredients,
        instructions: this.instructions,
      });
      return newRecipe;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //   get all recipes
  static async getAllRecipes() {
    try {
      return await recipeModel.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //   get recipe by id
  static async getRecipeById(recipeId) {
    try {
      return await recipeModel.findById(recipeId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //   update
  async updateRecipe(recipeId) {
    try {
      const updatedRecipe = await recipeModel.findByIdAndUpdate(
        recipeId,
        {
          title: this.title,
          description: this.description,
          ingredients: this.ingredients,
          instructions: this.instructions,
        },
        { new: true }
      );
      return updatedRecipe;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //   delete recipe by id
  static async deleteRecipe(recipeId) {
    try {
      return await recipeModel.findByIdAndDelete(recipeId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Recipe;
