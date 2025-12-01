import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { DatabaseModule } from '../database/database.module';
import { AuthGuard } from '../guards/guard';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule,
  ],
  controllers: [FilesController],
  providers: [FilesService, AuthGuard, CloudinaryService],
  exports: [FilesService],
})
export class FilesModule {}
