# Recipe Sharing Platform

## Table of Contents

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Run the Application](#run-the-application)
- [API Routes](#api-routes)
- [Models](#models)
  - [User Model](#user-model)
  - [Recipe Model](#recipe-model)
  - [Public Routes](#public-routes)
  - [Authenticated Routes](#authenticated-routes)

## Dependencies

- [bcryptjs](https://www.npmjs.com/package/bcryptjs) v2.4.3
- [dotenv](https://www.npmjs.com/package/dotenv) v16.4.5
- [express](https://www.npmjs.com/package/express) v4.18.3
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) v9.0.2
- [mongoose](https://www.npmjs.com/package/mongoose) v8.2.1

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
MONGO_URL= "add your url here"
JWT_SECRET=your_code_secret_key
JWT_EXPIRE=24h
```

## Run the Application

```
for production     npm start
fot development    npm run dev
```

# API Routes

## User Routes

### Public Routes

#### POST /api/v1/user/register

- **Description:** Register a new user.
- **Body:** `{ "username": "example", "password": "password" }`

#### POST /api/v1/user/login

- **Description:** Authenticate and log in a user.
- **Body:** `{ "username": "example", "password": "password" }`

### Authenticated Routes

#### GET /api/v1/user/profile

- **Description:** Get the profile of the authenticated user.

#### PUT /api/v1/user/profile

- **Description:** Update the profile of the authenticated user.
- **Body:** `{ "username": "new_username", "password": "new_password" }`

#### DELETE /api/v1/user/profile

- **Description:** Delete the profile of the authenticated user.

## Recipe Routes

### Authenticated Routes

#### POST /api/v1/recipe

- **Description:** Create a new recipe.
- **Authenticated:** Yes
- **Body:** `{ "title": "Recipe Title", "description": "Recipe Description", "ingredients": ["Ingredient1", "Ingredient2"], "instructions": "Recipe Instructions" }`

#### GET /api/v1/recipe

- **Description:** Get all recipes.
- **Authenticated:** Yes

#### GET /api/v1/recipe/:recipeId

- **Description:** Get a specific recipe by ID.
- **Authenticated:** Yes

#### PUT /api/v1/recipe/:recipeId

- **Description:** Update a specific recipe by ID.
- **Authenticated:** Yes
- **Body:** `{ "title": "Updated Title", "description": "Updated Description", "ingredients": ["Updated Ingredient1", "Updated Ingredient2"], "instructions": "Updated Instructions" }`

#### DELETE /api/v1/recipe/:recipeId

- **Description:** Delete a specific recipe by ID.
- **Authenticated:** Yes

# Models

## User Model

The User model represents the structure of user data in the MongoDB database. It is defined in `models/User.js`.

### Schema:

- `username`: String, required, unique
- `password`: String, required

### Methods:

1. **`save()`**

   - **Description:** Saves a new user to the database.
   - **Usage:** `await user.save();`

2. **`authenticate()`**

   - **Description:** Authenticates a user during login.
   - **Usage:** `await user.authenticate();`

3. **`generateJwtToken()`**

   - **Description:** Generates a JWT token for the user.
   - **Usage:** `const token = user.generateJwtToken();`

4. **`verifyJwtToken(token)`**

   - **Description:** Verifies a JWT token.
   - **Usage:** `const decodedUser = await user.verifyJwtToken(token);`

5. **`updateUsername(newUsername)`**

   - **Description:** Updates the username of the user.
   - **Usage:** `await user.updateUsername(newUsername);`

6. **`updatePassword(newPassword)`**

   - **Description:** Updates the password of the user.
   - **Usage:** `await user.updatePassword(newPassword);`

7. **`deleteUser()`**

   - **Description:** Deletes the user from the database.
   - **Usage:** `await user.deleteUser();`

## Recipe Model

The Recipe model represents the structure of recipe data in the MongoDB database. It is defined in `models/Recipe.js`.

### Schema:

- `title`: String, required
- `description`: String, required
- `ingredients`: Array, required
- `instructions`: String, required

### Methods:

1. **`save()`**

   - **Description:** Saves a new recipe to the database.
   - **Usage:** `await recipe.save();`

2. **`getAllRecipes()`**

   - **Description:** Retrieves all recipes from the database.
   - **Usage:** `const recipes = await Recipe.getAllRecipes();`

3. **`getRecipeById(recipeId)`**

   - **Description:** Retrieves a specific recipe by its ID.
   - **Usage:** `const recipe = await Recipe.getRecipeById(recipeId);`

4. **`updateRecipe(recipeId)`**

   - **Description:** Updates a specific recipe by its ID.
   - **Usage:** `const updatedRecipe = await recipe.updateRecipe(recipeId);`

5. **`deleteRecipe(recipeId)`**

   - **Description:** Deletes a specific recipe by its ID.
   - **Usage:** `const deletedRecipe = await Recipe.deleteRecipe(recipeId);`
