import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import fs from 'fs'

import { MULTER, TMP_FOLDER, UPLOADS_FOLDER } from "../configs/upload.js"

export const DiskStorage = {
  saveFile: async (file) => {
    await fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(UPLOADS_FOLDER, file)
    )
    return file
  },

  deleteFile: async (file) => {
    const filePath = path.resolve(UPLOADS_FOLDER, file)

    try {
      await fs.promises.stat(filePath)

    } catch (error) {
      return
    }
    await fs.promises.unlink(filePath)
  }
}