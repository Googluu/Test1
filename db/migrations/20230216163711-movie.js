"use strict";

const { MOVIE_TABLE, MovieSchema } = require("../models/movie.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(MOVIE_TABLE, MovieSchema);
  },

  async down(queryInterface) {
    await queryInterface.drop(MOVIE_TABLE);
  },
};
