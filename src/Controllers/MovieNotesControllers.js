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

    return res.json("Filme cadastrado")

  },
  
  show: async (req, res) => { 
    const { id } = req.params

    const note = await connection("movie_notes").where({id}).first()
    const tag = await connection("movie_tags").where({note_id:id}).orderBy("name")

    return res.json ({
      ...note,
      tag
    })
  },
  delete: async (req, res) => { },
  index: async (req, res) => { },
}