import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

/*
 * Create a new schema instance, defining the various fields inside it in the constructor's object parameter.
 */
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
        // { select : false } means the field will not be queried from the database at all. Thus, you cannot have access to it inside the method unless you specifically override that setting.
        select: false,
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

/* 
* 在 auth 中调用 register user(User.create()) 和 update user(User.save()) 时候会运行下面的代码.
! 但是在调用 findOneAndUpdate 时不会进行 trigger
*/
UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

/*
 * Create the jwt and return it
 */
UserSchema.methods.createJWT = function () {
    // "this" refers to the specific instance of the Model, in this cas it refers to a specific User.
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};

// "compiled" UserSchema into models using the mongoose.model() method.
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
