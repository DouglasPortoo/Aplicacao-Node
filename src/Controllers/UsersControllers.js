const knex = require("../database/knex")
const { hash, compare } = require('bcryptjs')


const usersControllers = {
  create: async (req, res) => {
    const { name, email, password } = req.body

    try {

      let [checkEmailExists] = await knex.select('email')
        .fromRaw('(select * from "users" where "email" = (?))', [email])

      if (checkEmailExists && checkEmailExists.email == email) {
        throw new Error("Este e-mail já está em uso.")
      }

      const hashPassword = await hash(password, 8)

      await knex("users").insert({
        name,
        email,
        password: hashPassword
      })

      res.status(201).json({ name, email, hashPassword })


    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  update: async (req, res) => {

    const { name, email, password, oldPassword } = req.body
    const user_id = req.user.id

    try {

      let [user] = await knex.select('*')
        .from('users').where({ id: user_id })
        

      if (!user) {
        throw new Error("usuario inexistente")
      }

      const [userWithUpdatedEmail] = await knex.select('*')
        .from('users').where({ email })


      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new Error("Este e-mail já está em uso.")
      }

      user.name = name ?? user.name
      user.email = email ?? user.email

      if (password && !oldPassword) {
        throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
      }

      if (password && oldPassword) {
        const checkPassoword = await compare(oldPassword, user.password)

        if (!checkPassoword) {
          throw new Error("senha antiga incorreta")
        }
      }

      const hashPassword = await hash(password, 8)

      await knex('users').where({ id: user_id }).update("name", name ?? user.name)

      await knex('users').where({ id: user_id }).update("email", email ?? user.email)

      await knex('users').where({ id: user_id }).update("password", hashPassword)

      res.status(201).json('Atualizado')

    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }

  },

  show: async (req, res) => {
    const user_id = req.user.id
    try {
      let [user] = await knex.select('*')
        .from('users').where({ id: user_id })


      res.status(201).json(user)

    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },

  delete: async (req, res) => {
    const user_id = req.user.id

    try {
      await knex('users').where({ id: user_id }).delete()

      res.status(201).json('Deletado')
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },
}

module.exports = usersControllers