const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");


const dbUrl = `mongodb+srv:${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`

//const dbUrl = `mongodb://127.0.0.1:27017/`


const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: String
});

const Movie = mongoose.model("Movie", movieSchema);

async function connect() {
  await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function initializeMovies() {
  await connect();
  const movies = [
    {
        title: "Cars",
        year: 2006,
        rating: "PG"
    },
    {
        title: "Cinderella",
        year: 1950,
        rating: "PG"
    },
    {
        title: "The Little Mermaid",
        year: 1989,
        rating: "PG"
    }
  ];

  await Movie.insertMany(movies);
}

async function getMovies() {
  await connect();
  return await Movie.find({});
}

async function updateMovieRating(title, newRating) {
  await connect();
  return await Movie.updateOne({ title }, { rating: newRating });
}

async function deleteMoviesByRating(rating) {
  await connect();
  return await Movie.deleteMany({ rating });
}

module.exports = {
  initializeMovies,
  getMovies,
  updateMovieRating,
  deleteMoviesByRating
};
