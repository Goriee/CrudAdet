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
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME') || process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY') || process.env.CLOUDINARY_API_KEY;
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET') || process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Missing Cloudinary credentials. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET');
    }

    this.logger.log(`Cloudinary config - Cloud: ${cloudName}, Key: ${apiKey}, Secret length: ${apiSecret?.length || 0}`);

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    this.logger.log(`Cloudinary configured successfully`);
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
