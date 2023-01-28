import mongoose from "mongoose";
import validator from "validator";
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

// create a User collection based on userSchema
export default mongoose.model("User", UserSchema);
