const express = require('express')
const app = express()
const port = 5000
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const { User } = require("./models/user");

const config = require("./config/key");

// application/x-www-form-urlencoded 코드로 된 것을 가져올 수 있게 설정
app.use(bodyParser.urlencoded({extended: true}));

// application/json 코드로 된 것을 가져올 수 있게 설정
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require("mongoose")
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected.."))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello World! nodemon!')
})

app.post("/api/users/register", (req, res) => {
    // 회원가입에 필요한 정보를 client에서 가져오면
    // DB에 넣어준다.
    // bodyParser를 통해서 req.body로 클라이언트에서 보내는 정보를 받아준다.
    const user = new User(req.body);

    // req.body 정보들이 user 모델에 저장된 것
    // save -> 몽고DB 메소드?
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

app.post("/api/users/login", (req, res) => {
    // email 찾기
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        // 비밀번호 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                });
            }

            // 토큰 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰을 저장한다. 쿠키, 세션, 로컬스토리지
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    });
            });
        });
    })
});

app.get("/api/users/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role !== 0,
        isAuth: true,
        email: req.user.email,
        name: req.user,name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})