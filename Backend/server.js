import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipe.js";

dotenv.config();

connectDB();

const app = express();

app.use( cors() );
app.use( express.json() );
app.use( "/api/auth", authRoutes );
app.use( "/api/recipe", recipeRoutes );

app.get( '/', (req, res) => res.send("server.js Running at '/' endpoint") );

const PORT = process.env.PORT || 69;
app.listen( PORT, () => console.log(`Server running on PORT=${PORT}`) );