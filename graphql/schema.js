const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { movies, movie } = require("./queries");
const { createMovie, updateMovie, deleteMovie } = require("./mutations");

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    movies,
    movie,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    createMovie,
    updateMovie,
    deleteMovie,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
