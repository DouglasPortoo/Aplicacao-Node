const { compare } = require("bcryptjs")
const knex = require("../database/knex")

const AuthConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

const sessionController = {
  create: async (req, res) => {
    const { email, password } = req.body

    try {
      const user = await knex("users").where({ email }).first()
      

      if (!user) {
        throw new Error("email ou senha invalida")
      }

      if (password) {
        const comparePassword = await compare(password, user.password)
     

        if (!comparePassword) {
          throw new Error("email ou senha invalida")
        }

      }
      const { secret } = AuthConfig

      const token = sign({}, secret, {
        subject: String(user.id),
        expiresIn: "1d"
      })


      return res.json({ user, token })

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  }
}

module.exports = sessionController