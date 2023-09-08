import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { jwt } from "../configs/auth.js"

export function ensureAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error("Token nao informado")
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, jwt.secret)

    req.user = {
      id: Number(user_id)
    }

    return next()

  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
