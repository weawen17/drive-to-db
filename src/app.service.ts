// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExcelData } from './entities/data.entity';
import { GoogleDriveService } from './google-drive/google-drive.service';
import { ExcelService } from './excel/excel.service';

@Injectable()
export class AppService {
  constructor(
    private readonly googleDriveService: GoogleDriveService,
    private readonly excelService: ExcelService,
    @InjectRepository(ExcelData)
    private readonly excelDataRepository: Repository<ExcelData>,
  ) {}

  async processExcelFile(): Promise<void> {

    const fileId = process.env.GOOGLE_DRIVE_FILE_ID;
    const mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    this.googleDriveService.getListFiles();

    // 파일을 가져온다
    const fileBuffer = await this.googleDriveService.downloadFile(fileId, mimeType);

    // Excel 데이터를 분석해서 담는다
    const excelData = this.excelService.parseExcel(fileBuffer);
    console.log(excelData); // debug log

    // 대상 테이블에 기존 데이터를 삭제하고 받은 데이터를 저장한다
    await this.excelDataRepository.clear();
    
    for (const [sheetName, data] of Object.entries(excelData)) {
      const entities = data.map((row) => this.excelDataRepository.create(row));
      const flattendEntities = entities.flat();

      //console.log(`Data from sheet: ${sheetName}`);
      //console.log(data);

      await this.excelDataRepository.save(flattendEntities);
    }

  }
}