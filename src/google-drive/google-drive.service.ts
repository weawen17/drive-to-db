// src/google-drive/google-drive.service.ts
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { promises as fs } from 'fs';

@Injectable()
export class GoogleDriveService {
  private drive;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_DRIVE_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    this.drive = google.drive({ version: 'v3', auth });
  }

  // 구글 닥스 형식을 위한 기능
  async exportFile(fileId, mimeType) {
    try {
      const res = await this.drive.files.export(
        {
          fileId: fileId, // Google 문서 파일의 ID
          mimeType: mimeType, // 변환할 MIME 타입 (예: PDF, MS Word)
        },
        { responseType: 'arraybuffer' } // 바이너리로 다운로드
      );
  
      console.log('File exported successfully!');
      return Buffer.from(res.data); // 다운로드된 파일 데이터 반환
    } catch (error) {
      console.error('Error exporting file:', error.message);
    }
  }
  
  // 파일 다운로드 기능
  async downloadFile(fileId: string, mimeType: string): Promise<Buffer> {
    try {

      const fileDetails = await this.drive.files.get({
        fileId,
        fields: 'id, name, mimeType',
      });
    
      console.log(`File ID: ${fileDetails.data.id}`);
      console.log(`File Name: ${fileDetails.data.name}`);
      console.log(`File MimeType: ${fileDetails.data.mimeType}`);

      if (fileDetails.data.mimeType.startsWith('application/vnd.google-apps')) {
        console.log('This is a Google Drive file.'); // debug log
        return await this.exportFile(fileId, mimeType);
      } else {
        console.log('This is a Binary file.'); // debug log
        const response = await this.drive.files.get(
          { fileId, alt: 'media' },
          { responseType: 'arraybuffer' },
        );
        console.log(`File found: ${response.data.name} (${response.data.id})`);
  
        return Buffer.from(response.data as ArrayBuffer);
      }      
    } catch (error) {
      console.log(`File not found: ${fileId}`);
      console.log("error: ", error.message);
    }
  }  
  async getListFiles() {
      const res = await this.drive.files.list({
          //q: "name contains 'xlsx'", // 파일 이름 조건
          pageSize: 1000,
          fields: 'files(id, name)',
      });
      res.data.files.forEach(file => {
          console.log(`Name: ${file.name}, ID: ${file.id}`);
      });
  }
}