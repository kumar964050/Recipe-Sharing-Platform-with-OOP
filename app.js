require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const app = express();
app.use(express.json());
db.connect();

// routes and  its  middleware
const UserRoutes = require("./routes/user");
const RecipeRoutes = require("./routes/recipe");
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/recipe", RecipeRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
