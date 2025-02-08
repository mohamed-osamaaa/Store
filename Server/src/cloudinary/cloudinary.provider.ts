import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'products', // Ensure correct folder setup
    format: 'png', // Set default format
    public_id: file.originalname.split('.')[0], // Extract name before extension
  }),
});

export const multerOptions = {
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
};
