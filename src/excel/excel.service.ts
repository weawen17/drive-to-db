// src/excel/excel.service.ts
import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {
  parseExcel(fileBuffer: Buffer): Record<string,any[]> {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    console.log("Sheets in the workbook:", workbook.SheetNames); // debug log

    const sheetData: Record<string, any[]> = {};

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      sheetData[sheetName] = data;
    });

    return sheetData;;
  }
}