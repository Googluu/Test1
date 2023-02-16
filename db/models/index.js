const { Movie, MovieSchema } = require("./movie.model");

function setupModels(sequelize) {
  Movie.init(MovieSchema, Movie.config(sequelize));
}

module.exports = setupModels;
