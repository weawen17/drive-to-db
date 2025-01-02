// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('process-excel')
  async processExcel(): Promise<string> {
    await this.appService.processExcelFile();
    return 'Excel data has been processed and saved to the database.';
  }
}