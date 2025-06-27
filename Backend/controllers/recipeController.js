import Recipe from "../models/Recipe.js";

export const createRecipe = async (req, res) => {
    try{
        console.log(req);
        console.log(req.user);
        const { title, image, mealOfTheDay, typeOfDiet, ingredients, instructions } = req.body;
        const newRecipe = await Recipe.create( { 
            title, image, mealOfTheDay, typeOfDiet, ingredients, instructions, 
            createdBy: req.user._id 
        } );

        res.status(201).json( { message: "Recipe Created Succesfully", newRecipe } );
    }catch(err){
        res.status(400).json( { message: "Recipe Creation Failed", error: err.message } );
    }
}

export const getAllRecipes = async (req, res) => {
    try{
        const recipes = await Recipe.find();
        res.status(201).json( { message: "All Recipes Fetched Succesfully", recipes } );
    }catch(err){
        res.status(500).json( { message: "All Recipes Fetch Failed", error: err.message } );
    }
}

export const getRecipeById = async (req, res) => {
    try{
        const recipe = await Recipe.findById(req.params.id);
        if( !recipe ) return res.status(404).json( { message: "Recipe Not Found" } );
        res.status(200).json( { message: "Recipe Fetched Successfully" } );
    }catch(err){
        res.status(500).json( { message: "Recipe Fetch Failed", error: err.message } );
    }
}

export const editRecipe = async (req, res) => {
    try{
        const recipe = await Recipe.findById(req.params.id);
        if( !recipe ) return res.status(404).json( { message: "Recipe Not Found" } );

        if( recipe.createdBy.toString() !== req.user._id.toString() ) return res.status(403).json( { message: "Access Denied, Unauthorized Request" } );
        
        const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true } );
        res.status(200).json( { message: "Recipe Edited Succesfully", updated } );
    }catch(err){
        res.status(400).json( { message: "Recipe Edit Failed", error: err.message } );
    }
}

export const deleteRecipe = async (req, res) => {
    try{
        const recipe = await Recipe.findById(req.params.id);

        if( recipe.createdBy.toString() !== req.user._id.toString() ) return res.status(403).json( { message: "Access Denied, Unauthorized Request" } );
        
        await recipe.deleteOne();
        res.status(200).json( { message: "Recipe Deleted Succesfully"} );
    }catch(err){
        res.status(500).json( { message: "Recipe Deletion Failed", error: err.message } );
    }
}