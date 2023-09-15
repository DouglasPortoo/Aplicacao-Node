const knex = require("../database/knex")

const movieTagsControllers = {

  index: async (req, res) => {

    const user_id = req.user.id

    const tags = await knex("movie_tags").where({ user_id }).groupBy("name")

    res.json(tags)

  },
}

module.exports = movieTagsControllers