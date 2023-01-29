import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
        validate: {
            // from the external npm validator model
            validator: validator.isEmail,
            message: "Please provide valid email",
        },
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
        select: true,
    },
    lastName: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "lastName",
    },
    location: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "US",
    },
});
// 在 auth 中调用 register user(User.create()) 和 update user(User.save()) 时候会运行下面的代码.
// ! 但是在调用 findOneAndUpdate 时不会进行 trigger
UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};

// create a User collection based on userSchema
export default mongoose.model("User", UserSchema);
