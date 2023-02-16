const { GraphQLList, GraphQLID } = require("graphql");
const { models } = require("../libs/sequelize");
const MovieType = require("./types");

const movies = {
  type: new GraphQLList(MovieType),
  description: "Return movies",
  resolve() {
    return models.Movie.findAll();
  },
};

const movie = {
  type: MovieType,
  description: "Get a movie by id",
  args: {
    id: { type: GraphQLID },
  },
  resolve(_, args) {
    return models.Movie.findByPk(args.id);
  },
};

module.exports = { movies, movie };
