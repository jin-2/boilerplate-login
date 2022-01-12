const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
       type: String,
       maxLength: 50
   },
    email: {
       type: String,
        trim: true,
        unique: 1
    },
    password: {
       type: String,
        minLength: 5
    },
    lastname: {
       type: String,
        maxLength: 50
    },
    role: {
       type: Number,
        default: 0 // 0: 일반유저, 0 아니면 관리자
    },
    image: String,
    token: {
       type: String
    },
    tokenExp: {
       type: Number
    }
});

// DB에 save 하기 전에 pre 실행
// next() 함수로 save 실행
userSchema.pre("save", function (next) {
    const user = this;
    // 비밀번호를 변경할 때만
    // 비밀번호를 암호화 시킨다.
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
};

userSchema.methods.generateToken = function(cb) {
    const user = this;

    // user._id + "secretToken" = token
    const token = jwt.sign(user._id.toString(), "secretToken");
    user.token = token;
    user.save(function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

userSchema.methods.findByToken = function(token, cb) {
    const user = this;

    // 토큰 decode
    jwt.verify(token, "secretToken", function(err, decoded) {
        // 유저 아이디로 유저를 찾은 다음
        // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
}

const User = mongoose.model("User", userSchema);

module.exports = { User };