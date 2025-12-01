import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
  Request,
  StreamableFile,
  Res,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { AuthGuard } from '../guards/guard';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get('my-files')
  async getMyFiles(@Request() req, @Query('folderId') folderId?: string) {
    const userId = req.user.id;
    const folderIdNum = folderId ? parseInt(folderId) : undefined;
    
    const [files, folders] = await Promise.all([
      this.filesService.getUserFiles(userId, folderIdNum),
      this.filesService.getUserFolders(userId, folderIdNum),
    ]);

    return { files, folders };
  }

  @Get('storage-stats')
  async getStorageStats(@Request() req) {
    return this.filesService.getUserStorageStats(req.user.id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB per file
      },
    })
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
    @Body('folderId') folderId?: string,
  ) {
    const userId = req.user.id;
    const folderIdNum = folderId ? parseInt(folderId) : undefined;
    return this.filesService.uploadFile(userId, file, folderIdNum);
  }

  @Post('folders')
  async createFolder(@Request() req, @Body() body: { name: string; parentId?: number }) {
    return this.filesService.createFolder(req.user.id, body.name, body.parentId);
  }

  @Delete(':id')
  async deleteFile(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.filesService.deleteFile(id, req.user.id);
  }

  @Delete('folders/:id')
  async deleteFolder(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.filesService.deleteFolder(id, req.user.id);
  }

  @Get('download/:id')
  async downloadFile(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const file = await this.filesService.getFile(id, req.user.id);

    if (!existsSync(file.path)) {
      throw new Error('File not found on disk');
    }

    res.set({
      'Content-Type': file.mime_type,
      'Content-Disposition': `attachment; filename="${file.original_name}"`,
    });

    const fileStream = createReadStream(file.path);
    return new StreamableFile(fileStream);
  }
}
