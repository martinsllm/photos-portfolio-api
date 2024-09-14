import type { File } from 'fastify-multer/lib/interfaces'
import Photo from '../database/models/Photo'
import type { IPhotoRepository } from './interfaces/IPhotoRepository'

class PhotoRepository implements IPhotoRepository {
  async create(file: File, id: number): Promise<Photo> {
    const { filename, path: url } = file

    const uploadedPhoto = await Photo.create({
      filename,
      url,
      userId: id,
    })

    return uploadedPhoto
  }
}

export default PhotoRepository
