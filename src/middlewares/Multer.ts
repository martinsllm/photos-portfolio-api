import multer from 'fastify-multer'
import crypto from 'crypto'
import { verifyDirectoryPath } from '../services/FileService'

export default {
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const { authorization } = req.headers

      if (authorization) {
        const dirPath = await verifyDirectoryPath(authorization)
        cb(null, dirPath)
      }
    },
    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(6).toString('hex')
      cb(null, `${hash}-${file.originalname}`)
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimes = ['image/jpeg', 'image/png']

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type!'))
    }
  },
}
