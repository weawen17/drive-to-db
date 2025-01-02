# drive-to-db
Configuring functions to import Google Drive sheet files

## 구성 정보

서비스 계정 키 정보
* 구글 클라우드 콘솔에서 서비스 계정을 설정하고 인증 정보를 받아서 사용해야 한다.
* 해당 계정에 구글 드라이브 접근 권한이 필요하다.
* 해당 문서에 대한 공개 접근이 필요하다.

API 접속 정보
* https://{host}/process-excel

대상 파일 정보
* 구글 문서의 시트 를 대상으로 한다.
* 대상 파일에 대한 FILE_ID 가 필요하다.
  * 문서 공유 링크 주소의 정보 또는 문서 접근 후 URL을 통해서 확인할 수 있다.

출력 디비 정보
* mariadb 를 대상으로 한다.

## Environment Variables

To set up the project, create a `.env` file in the root directory of your project.  
Use the provided `.env.sample` file as a template.

### Steps:
1. Copy the `.env.sample` file:
   ```bash
   cp .env.sample .env
2.	Open the .env file and configure the values according to your environment  
   (e.g., database credentials, API keys, etc.).

## 참조 정보

구글 드라이브 에서는 파일 형식에 따라 다운로드 방식이 다릅니다.
1. 바이너리 파일 : file.get method
2. Google Docs 형식 :
   - 구글 내부 형식으로 저장되어 직접 다운로드 불가
   - file.export method 를 사용해서 변환 후 다운로드
