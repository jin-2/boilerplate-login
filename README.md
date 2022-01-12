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

### BodyParser & PostMan & 회원 가입 기능
body-parser: Body 데이터를 분석(parse)해서 req.body로 출력해 주는 것

1. `npm i body-parser`
2. 회원가입 Route 만들기: post
    ```
    app.post("/api/user/register", (req, res)=>{});
    
    user.save(); // DB에 저장
    ```
3. postman 설치(테스트 용도) 및 테스트

### Nodemon 설치
코드 변경을 감지하여 자동으로 서버를 재시작 해줌
1. 설치 `npm i nodemon --save-dev`
2. scripts 추가 `"dev": "nodemon index.js"`

### 비밀 설정 정보 관리
1. 노출되면 안되는 설정 정보를 config 디렉토리에서 관리
2. 배포된 환경에서는 (예를들어)히로쿠 설정을 가져와야 함

**추가**
- dotenv 삭제

### Bcrypt로 비밀번호 암호화 하기
DB에 저장된 비밀번호가 안전하지 않으므로 암호화 한 후 DB에 저장
1. bcrypt 설치 `npm i bcrypt --save`
2. userSchema.pre(”save”) save 하기 전에 콜백을 실행하게 함
   1. 10자리인 salt를 먼저 만들어서 암호화

### 로그인 기능 with Bcrypt
1. 라우터 추가 `app.post("/login", (req, res) => {})`
2. 이메일 찾기 `User.findOne`
3. 비밀번호 비교 `comparePassword` 메소드 생성: `bcrypt.compare` 이용

### 토큰 생성 with jsonwebtoken
1. 비밀번호까지 같다면 token 생성 메소드 추가: `generateToken`
   1. 토큰 생성을 위해서 jsonwebtoken 설치 `npm install jsonwebtoken —save`
2. [example code 따라하기](https://github.com/auth0/node-jsonwebtoken) `jwt.sign(user._id.toString(), "secretToken");`
3. 쿠키를 쉽게 추출하기 위해 cookie-parser 설치 `npm i cookie-parser --save`

### Auth 기능 만들기
권한 체크

1. 라우터 추가 `app.get("/api/users/auth", auth, (req, res) => {})`
   1. 두번째 매개변수 auth -> 미들웨어
2. 미들웨어 auth에서 cookie에 저장된 정보를 가져와서 
3. 추가한 `findByToken` 메소드에서 토큰 일치 체크: `jwt.verify`

**추가**
> 모델 메소드는 두 종류로 만들 수가 있습니다. 
> `.statics`와 `.methods`인데요, 
> 각 종류는 서로 가르키는 `this` 값이 다른데요, 
> 전자의 경우엔 모델 자체를 가르키고, 후자의 경우엔 데이터 인스턴스를 가르킵니다.

[출처: https://backend-intro.vlpt.us/3/03.html](https://backend-intro.vlpt.us/3/03.html)

### 로그아웃 기능 만들기
1. 라우터 추가 `app.get("/api/user/logout", auth, (req, res) => {})`
2. 아이디를 찾고 토큰을 지워줌: `User.findOneAndUpdate`