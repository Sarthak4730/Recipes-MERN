import express from "express";
import { createRecipe, getAllRecipes, getRecipeById, editRecipe, deleteRecipe } from "../controllers/recipeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createRecipe);
router.get("/get-all", getAllRecipes);
router.get("/get-one/:id", getRecipeById);
router.put("/edit/:id", protect, editRecipe);
router.delete("/delete/:id", protect, deleteRecipe);

export default router;