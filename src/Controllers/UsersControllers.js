import { connection } from "../database/knex/index.js";
import pkg from 'bcryptjs';
const { hash, compare } = pkg;

export const usersControllers = {
  create: async (req, res) => {
    const { name, email, password } = req.body

    try {

      let checkEmailExists = await connection.select('email')
        .fromRaw('(select * from "users" where "email" == ?)', email)

      if (checkEmailExists.length > 0) {
        throw new Error("Este e-mail já está em uso.")
      }

      const hashPassword = await hash(password, 8)

      await connection("users").insert({
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
  show: async (req, res) => { },
  index: async (req, res) => { },
  update: async (req, res) => { },
  delete: async (req, res) => { },
}