import { connection } from "../database/knex/index.js";

export const movieNotesControllers = {
  create: async (req, res) => {
    const { title, description, rating, tags } = req.body
    const user_id = req.user.id

    const [note_id] = await connection("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    })

    const insertTags = tags.map((name) => {
      return {
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

    const note = await connection("movie_notes").where({ id }).first()
    const tag = await connection("movie_tags").where({ note_id: id }).orderBy("name")

    return res.json({
      ...note,
      tag
    })
  },
  delete: async (req, res) => {
    const { id } = req.params

    await connection("movie_notes").where({ id }).delete()

    return res.json("Nota deletada")
  },
  index: async (req, res) => {
    const { title } = req.query
    const user_id = req.user.id

    // let notes

    // if (tags) {
    //   const filterTags = tags.split(',').map(tag => tag.trim())

    //   notes = await connection("movie_tags")
    //     .select([
    //       "movie_notes.id",
    //       "movie_notes.title",
    //       "movie_notes.user_id",
    //     ])
    //     .where("movie_notes.user_id", user_id)
    //     .whereLike("movie_notes.title", `%${title}%`)
    //     .whereIn("movie_tags.name", filterTags)
    //     .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
    //     .groupBy("movie_notes.id")
    //     .orderBy("movie_notes.title")

    // } else {}

    const notes = await connection("movie_notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("created_at")


    const userTags = await connection("movie_tags").where({ user_id })
    const notesWhithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    return res.json(notesWhithTags)
  }
}