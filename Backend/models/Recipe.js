import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: String,
    image: String,
    mealOfTheDay: { type: String, enum: ["Breakfast", "Lunch", "Snack", "Dinner"] },
    typeOfDiet: { type: String, enum: ["Vegan", "Vegetarian", "Non-Veg"] },
    ingredients: String,
    instructions: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Recipe', recipeSchema);