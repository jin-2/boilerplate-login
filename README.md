# boilerplate-login
Node.js, React

[인프런: 따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://inf.run/btGV)

## Node JS

### NODE JS와 EXPRESS JS 다운로드 하기
1. Node.js 설치 확인
2. 디렉토리 생성 후
3. `npm init`
4. `npm install express --save`
5. [Express: Hello world 예제 테스트](https://expressjs.com/ko/starter/hello-world.html)
6. package.json scripts에 추가 `"start": "node index.js"`

### MongoDB 연결
1. [MongoDB 회원가입, 클러스터 만들기](https://www.mongodb.com/)
2. MongoDB 유저 생성(아이디와 비번 기억), 어플리케이션과 DB를 연결하는 코드 복사
3. Mongoose 설치 `npm install mongoose --save`
4. App에 MongoDB 연결

**추가**
- dotenv 환경 변수 관리 설치함 `npm i dotenv`
- MongoDB 연결 중 에러 -> MongoDB > Network Access 내 IP 추가

### MongoDB Model & Schema
User에 대한 모델 정의

1. `mongoose.Schema();`
2. `mongoose.model();`

### BodyParser & PostMan
body-parser: Body 데이터를 분석(parse)해서 req.body로 출력해 주는 것

1. `npm i body-parser`
2. 회원가입 Route 만들기: post
3. postman 설치(테스트 용도) 및 테스트


