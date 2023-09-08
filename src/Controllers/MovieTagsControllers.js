import { connection } from "../database/knex/index.js";

export const movieTagsControllers = {

  index: async (req, res) => {

    const { user_id } = req.params

    const tags = await connection("movie_tags").where({user_id}).groupBy("name")

    res.json(tags)
    
  },
}