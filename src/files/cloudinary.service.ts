import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiOptions, UploadApiResponse } from 'cloudinary';

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  bytes: number;
}

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.getOrThrow<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.getOrThrow<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<CloudinaryUploadResult> {
    const options: UploadApiOptions = {
      folder: this.configService.get<string>('CLOUDINARY_FOLDER') ?? 'crud-adet-storage',
      resource_type: 'auto',
      use_filename: false,
      unique_filename: true,
    };

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error || !result) {
          this.logger.error('Cloudinary upload failed', error);
          return reject(new InternalServerErrorException('Failed to upload file to storage'));
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          bytes: result.bytes,
        });
      });

      uploadStream.end(file.buffer);
    });
  }

  async deleteFile(publicId: string): Promise<void> {
    if (!publicId) {
      return;
    }

    try {
      await cloudinary.uploader.destroy(publicId, { invalidate: true, resource_type: 'auto' });
    } catch (error) {
      this.logger.warn(`Cloudinary deletion failed for ${publicId}`, error?.message ?? error);
    }
  }
}
