const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

const db = require("./modules/db");

const app = express();
const port = process.env.PORT || "3000";

// Set up application template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", async (request, response) => {
  let movieList = await db.getMovies();
  if (!movieList.length) {
    await db.initializeMovies();
    movieList = await db.getMovies();
  }
  response.render("index", { movies: movieList });
});

app.get("/update", async (request, response) => {
  await db.updateMovieRating("Cars", "PG");
  response.send("Updated movie rating.");
});

app.get("/delete", async (request, response) => {
  await db.deleteMoviesByRating("R");
  response.send("Deleted movies with rating R.");
});

// Server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
