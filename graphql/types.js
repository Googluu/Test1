const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const MovieType = new GraphQLObjectType({
  name: "MovieType",
  description: "the movie type",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    duration: { type: GraphQLString },
    created_at: { type: GraphQLString },
  },
});

module.exports = MovieType;
