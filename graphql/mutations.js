const { GraphQLString, GraphQLID, GraphQLInt } = require("graphql");

const MovieType = require("./types");
const { models } = require("../libs/sequelize");

const createMovie = {
  type: MovieType,
  description: "Create a new post",
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    relaseData: { type: GraphQLString },
  },
  async resolve(_, { name, description, image, relaseData }) {
    const newMovie = new models.Movie({
      name,
      description,
      image,
      relaseData,
    });
    return await newMovie.save();
  },
};

const updateMovie = {
  type: MovieType,
  description: "Update a movie",
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    relaseData: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { id, name, description, image, relaseData } = args;

    if (!id) throw new Error("Post not found");

    const movie = await models.Movie.findByPk(id);
    const rta = await movie.update(
      {
        name,
        description,
        image,
        relaseData,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return "Update success";
  },
};

const deleteMovie = {
  type: GraphQLInt,
  description: "remove movie",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, { id }) {
    if (!id) throw new Error("Post not found");

    const removeMovie = await models.Movie.findByPk(id);
    await removeMovie.destroy({
      _id: id,
    });

    return "Movie deleted";
  },
};

module.exports = { createMovie, updateMovie, deleteMovie };
