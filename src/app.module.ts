import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleDriveService } from './google-drive/google-drive.service';
import { ExcelService } from './excel/excel.service';
import { ExcelData } from './entities/data.entity';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // .env 파일 로드
    DatabaseModule,
    TypeOrmModule.forFeature([ExcelData]),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleDriveService, ExcelService],
})
export class AppModule {}
