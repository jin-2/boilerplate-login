const { User } = require("../models/user");

// 인증 처리
let auth = (req, res, next) => {

    let token = req.cookies.x_auth;

    // 토큰 복호화 한 후 유저를 찾기
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({
            isAuth: false,
            error: true
        });
        req.token = token;
        req.user = user;
        next();
    });
}

module.exports = { auth };