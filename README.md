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

### Auth 기능 만들기리
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

## React JS
- 라이브러리
- 컴포넌트
- Virtual DOM

#### 선언형(무엇을) VS 명령형(어떻게)
면접 보러 가야하는데 여기에서 강남역까지 어떻게 가야할까?
- 선언형: 강남역 5번 출구(어떻게 가는지 추상적으로 구현되어 있다.)
- 명령형: 집 앞에서 100번 버스를 타고 홍대입구를 가서 지하철 2호선을 타고 강남역에서 내린 후 5번 출구 표지판을 찾아서 걸어가세요.

### Create-React-App

```text
npx create-react-app
```

#### npm(관리) vs npx(실행)
npx는 npm registry에서 create-react-app을 찾아서(look up) 다운로드 없이 실행 시켜준다.
- disk space를 낭비하지 않고
- 항상 최신 버전을 사용할 수 있다.

### CRA to Our Bolierplate

#### 디렉토리 구조 설명
- _actions: Redux를 위한 폴더
- _reducer: Redux를 위한 폴더
- components/views: 이 안에 page들을 넣는다.
- components/views/sections: css파일, component들을 넣는다.
- App.js: routing 관련 일을 처리한다.
- Config.js: 환경 변수 같은 것들을 정하는 곳이다.
- hoc: higher order component의 약자
- utils: 여러 군데에서 쓰일 수 있는 것들을 이곳에 넣어둬서 어디서든 쓸 수 있게 해준다.

### React Router Dom

```text
npm install --save react-router-dom
```

### 데이터 Flow & Axios

```text
npm install axios —save
```

### CORS 이슈, Proxy 설정

```text
npm install http-proxy-middleware --save
```

[Configuring the Proxy Manually](https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually)

### Proxy server
- ip 변경
- 데이터도 임의 변경
- 방화벽 기능
- 웹 필터 기능
- 캐쉬 데이터, 공유 데이터 제공 기능

#### 사용 이유
- 회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어
- 캐쉬를 이용해 더 빠른 인터넷 이용 제공
- 더 나은 보안 제공
- 이용 제한된 사이트 접근 가능

### Concurrently
- 여러개의 commands를 동시에 작동 시킬 수 있게 해주는 tool
- 목적: 프론트, 백 서버 한번에 켜기

```text
npm install concurrently —save
```

```json
"start": "concurrently \"npm run backend\" \"npm run start --prefix client\""
```

### Antd CSS Framework

```text
npm install antd
```

### Redux
상태 관리 라이브러리
state container

#### props vs state

##### properties
- 부모 자식 컴포넌트 사이에 무언가를 주고 받을 수 있다.
- 위에서 아래로 내려준다. 소통 방향
- 자식에게 간 props는 변할 수 없다.(immutable)

##### state
- 컴포넌트 안에서 데이터를 공유할 수 있다
- state is mutable
- state가 변하면 re-render된다.

### Redux UP

```text
npm install redux react-redux redux-promise redux-thunk --save
```

- store의 state를 변경하려면 dispatch를 해야한다.
- action은 객체 형식이여야 한다.
- 하지만 promise, function 형태도 받을 때가 있다.
- 리덕스 스토어는 plain object action만 허용한다.
- 리덕스 스토어가 받을 수 없다.
- 미들웨어는 dispatch에게 plain object가 아닌 무언가를 허용하는 방법을 알려준다.
- redux-thunk는 function을 허용하는 방법을 dispatch에게 알려준다.
- redux-promise는 promise를 허용하는 방법을 dispatch에게 알려준다.

### React vs React Hooks

| Class Component       | Functional Component  |
|-----------------------|-----------------------|
| Provide more features | Provide less features |
| Longer Code           | Shorter Code          |
| More Complex Code     | Simpler Code          |
| Slower Performance    | Faster Performance    |

## Feature

### 로그인 페이지
