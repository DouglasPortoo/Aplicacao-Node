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

      let [userExist] = await knex.select('*')
        .from('users').where({ id: user_id })

      if (!userExist) {
        throw new Error("usuario inexistente")
      }

      const [userWithUpdatedEmail] = await knex.select('*')
        .from('users').where({ email })


      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userExist.id) {
        throw new Error("Este e-mail já está em uso.")
      }

      if (!oldPassword) {
        throw new Error("informar senha antiga")
      }

      if (!password) {
        throw new Error("informar senha nova")
      }

      if (password && oldPassword) {
        const checkPassoword = await compare(oldPassword, userExist.password)

        if (!checkPassoword) {
          throw new Error("senha antiga incorreta")
        }
      }

      const hashPassword = await hash(password, 8)

      await knex('users').where({ id: user_id }).update("name", name ?? userExist.name)

      await knex('users').where({ id: user_id }).update("email", email ?? userExist.email)

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
      let [userExist] = await knex.select('*')
        .from('users').where({ id: user_id })


      res.status(201).json(userExist)

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