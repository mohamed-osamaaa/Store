import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'products' },
          (error, result: UploadApiResponse) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          },
        )
        .end(file.buffer);
    });
  }
}
