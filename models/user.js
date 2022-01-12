const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
        default: 0
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
    console.log(user);
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
    }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };