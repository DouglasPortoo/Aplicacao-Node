import pkg from 'bcryptjs';
const { compare } = pkg;
import { connection } from "../database/knex/index.js"

import { jwt } from "../configs/auth.js"
import pkg2 from 'jsonwebtoken';
const { sign } = pkg2;

export const sessionController = {
  create: async (req, res) => {
    const { email, password } = req.body

    try {
      const user = await connection("users").where({ email }).first()
      console.log( user)

      if (!user) {
        throw new Error("email ou senha invalida")
      }

      if (password) {
        const comparePassword = await compare(password, user.password)

        if (!comparePassword) {
          throw new Error("email ou senha invalida")
        }

      }

      const { secret } = jwt

      const token = sign({}, secret,{
        subject: String(user.id),
        expiresIn:"1d"
      })


      return res.json({user,token})

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  }
}