import { connection } from "../database/knex/index.js";

export const movieNotesControllers = {
  create: async (req, res) => {
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params

    const [note_id] = await connection("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    })

    const insertTags = tags.map((name)=>{
      return{
        note_id,
        name,
        user_id
      }
    })

    await connection("movie_tags").insert(insertTags)

    res.json("Filme cadastrado")

    
  },
  
  show: async (req, res) => { },
  delete: async (req, res) => { },
  index: async (req, res) => { },
}