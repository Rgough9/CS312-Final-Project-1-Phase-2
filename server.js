import express from 'express';
import session from "express-session";
import recipeRoutes from './routes/recipe_routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bookmarkRoutes from './routes/recipe_routes.js';
import authRoutes from "./routes/authentication_routes.js";
import profileRoutes from "./routes/profile_routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "super-secret-key",
  resave: false,
  saveUninitialized: false
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use('/', recipeRoutes);
app.use("/bookmark", bookmarkRoutes);
app.use("/", authRoutes);
app.use("/", profileRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
