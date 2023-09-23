const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

const useAvatarController = {

  update: async (req, res) => {
    const user_id = req.user.id
    const avatarfilename = req.file.filename

      const [user] = await knex("users").where({ id: user_id })

      if (!user) {
        throw new Error('apenas usuarios cadastrados podem mudar o avatar')
      }

      if (user.avatar) {
        await DiskStorage.deleteFile(user.avatar)
      }

      const filename = await DiskStorage.saveFile(avatarfilename)

      user.avatar = filename

      await knex("users").where({ id: user_id }).update("avatar", user.avatar)

      return res.json([user])

  },
}

module.exports = useAvatarController