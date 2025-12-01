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
  Res,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { AuthGuard } from '../guards/guard';
import type { Response } from 'express';
import { memoryStorage } from 'multer';
import { pipeline } from 'stream/promises';

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
      storage: memoryStorage(),
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
    @Res() res: Response,
  ) {
    const file = await this.filesService.getFile(id, req.user.id);

    res.set({
      'Content-Type': file.mime_type,
      'Content-Disposition': `attachment; filename="${file.original_name}"`,
    });

    const remoteStream = await this.filesService.getRemoteStream(file.path);
    await pipeline(remoteStream, res);
  }
}
