import { connection } from "../database/knex/index.js";
import { DiskStorage } from "../providers/DiskStorage.js";

export const useAvatarController = {

  create: async (req, res) => {
    const user_id = req.user.id
    const avatarfilename = req.file.filename

    try {
      const [user] = await connection("users").where({ id: user_id })

      if (!user) {
        throw new Error('apenas usuarios cadastrados podem mudar o avatar')
      }

      if (user.avatar) {
        await DiskStorage.deleteFile(user.avatar)
      }

      const filename = await DiskStorage.saveFile(avatarfilename)

      user.avatar = filename

      await connection("users").where({ id: user_id }).update("avatar", user.avatar)

      return res.json([user])

    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }




    res.json(avatarfilename)

  },
}