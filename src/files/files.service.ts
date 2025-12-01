import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

@Injectable()
export class FilesService {
  private uploadPath = join(process.cwd(), 'uploads');

  constructor(private db: DatabaseService) {
    // Create uploads directory if it doesn't exist
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async getUserFiles(userId: number, folderId?: number) {
    const query = folderId
      ? 'SELECT * FROM files WHERE user_id = ? AND folder_id = ? AND deleted_at IS NULL ORDER BY created_at DESC'
      : 'SELECT * FROM files WHERE user_id = ? AND folder_id IS NULL AND deleted_at IS NULL ORDER BY created_at DESC';
    
    const params = folderId ? [userId, folderId] : [userId];
    const [files] = await this.db.query<RowDataPacket[]>(query, params);
    return files;
  }

  async getUserFolders(userId: number, parentId?: number) {
    const query = parentId
      ? 'SELECT * FROM folders WHERE user_id = ? AND parent_id = ? AND deleted_at IS NULL ORDER BY name ASC'
      : 'SELECT * FROM folders WHERE user_id = ? AND parent_id IS NULL AND deleted_at IS NULL ORDER BY name ASC';
    
    const params = parentId ? [userId, parentId] : [userId];
    const [folders] = await this.db.query<RowDataPacket[]>(query, params);
    return folders;
  }

  async uploadFile(userId: number, file: Express.Multer.File, folderId?: number) {
    // Check user storage quota (100MB limit)
    const [userStats] = await this.db.query<RowDataPacket[]>(
      'SELECT COALESCE(SUM(size), 0) as total_size FROM files WHERE user_id = ? AND deleted_at IS NULL',
      [userId]
    );
    
    const currentSize = userStats[0]?.total_size || 0;
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    
    if (currentSize + file.size > maxSize) {
      throw new BadRequestException('Storage quota exceeded (100MB limit)');
    }

    // Generate unique filename
    const uniqueId = uuidv4();
    const fileExtension = file.originalname.split('.').pop();
    const storedFilename = `${uniqueId}.${fileExtension}`;
    const filePath = join(this.uploadPath, storedFilename);

    // Save file metadata to database
    const [result] = await this.db.query<ResultSetHeader>(
      'INSERT INTO files (user_id, folder_id, original_name, stored_name, mime_type, size, path) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, folderId || null, file.originalname, storedFilename, file.mimetype, file.size, filePath]
    );

    return {
      id: result.insertId,
      original_name: file.originalname,
      size: file.size,
      mime_type: file.mimetype,
      created_at: new Date(),
    };
  }

  async createFolder(userId: number, name: string, parentId?: number) {
    // Check if folder with same name exists
    const [existing] = await this.db.query<RowDataPacket[]>(
      'SELECT id FROM folders WHERE user_id = ? AND name = ? AND parent_id <=> ? AND deleted_at IS NULL',
      [userId, name, parentId || null]
    );

    if (existing.length > 0) {
      throw new BadRequestException('Folder with this name already exists');
    }

    const [result] = await this.db.query<ResultSetHeader>(
      'INSERT INTO folders (user_id, parent_id, name) VALUES (?, ?, ?)',
      [userId, parentId || null, name]
    );

    return {
      id: result.insertId,
      name,
      parent_id: parentId || null,
      created_at: new Date(),
    };
  }

  async deleteFile(fileId: number, userId: number) {
    const [files] = await this.db.query<RowDataPacket[]>(
      'SELECT * FROM files WHERE id = ? AND user_id = ? AND deleted_at IS NULL',
      [fileId, userId]
    );

    if (files.length === 0) {
      throw new NotFoundException('File not found');
    }

    const file = files[0];

    // Soft delete in database
    await this.db.query('UPDATE files SET deleted_at = NOW() WHERE id = ?', [fileId]);

    // Delete physical file
    try {
      if (existsSync(file.path)) {
        unlinkSync(file.path);
      }
    } catch (error) {
      console.error('Failed to delete physical file:', error);
    }

    return { message: 'File deleted successfully' };
  }

  async deleteFolder(folderId: number, userId: number) {
    const [folders] = await this.db.query<RowDataPacket[]>(
      'SELECT * FROM folders WHERE id = ? AND user_id = ? AND deleted_at IS NULL',
      [folderId, userId]
    );

    if (folders.length === 0) {
      throw new NotFoundException('Folder not found');
    }

    // Soft delete folder (files inside will become orphaned or also deleted)
    await this.db.query('UPDATE folders SET deleted_at = NOW() WHERE id = ?', [folderId]);

    return { message: 'Folder deleted successfully' };
  }

  async getFile(fileId: number, userId: number) {
    const [files] = await this.db.query<RowDataPacket[]>(
      'SELECT * FROM files WHERE id = ? AND user_id = ? AND deleted_at IS NULL',
      [fileId, userId]
    );

    if (files.length === 0) {
      throw new NotFoundException('File not found');
    }

    return files[0];
  }

  async getUserStorageStats(userId: number) {
    const [stats] = await this.db.query<RowDataPacket[]>(
      'SELECT COUNT(*) as file_count, COALESCE(SUM(size), 0) as total_size FROM files WHERE user_id = ? AND deleted_at IS NULL',
      [userId]
    );

    const maxSize = 100 * 1024 * 1024; // 100MB
    const used = stats[0]?.total_size || 0;

    return {
      used_bytes: used,
      total_bytes: maxSize,
      used_mb: (used / (1024 * 1024)).toFixed(2),
      total_mb: 100,
      percentage: ((used / maxSize) * 100).toFixed(2),
      file_count: stats[0]?.file_count || 0,
    };
  }
}
