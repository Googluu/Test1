const { GraphQLString, GraphQLID } = require("graphql");
const { models } = require("../libs/sequelize");

const createMovie = {
  type: GraphQLString,
  description: "A new movie",
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    duration: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { name, description, image, duration } = args;

    const newMovie = new models.Movie({
      name,
      description,
      image,
      duration,
    });
    await newMovie.save();
    return "Success";
  },
};

const updateMovie = {
  type: GraphQLString,
  description: "Update a movie",
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    duration: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { id, name, description, image, duration } = args;

    if (!id) throw new Error("Post not found");

    const movie = await models.Movie.findByPk(id);
    const rta = await movie.update(
      {
        name,
        description,
        image,
        duration,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log(id, name, description, image, duration);
    return "Update success";
  },
};

const deleteMovie = {
  type: GraphQLString,
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
