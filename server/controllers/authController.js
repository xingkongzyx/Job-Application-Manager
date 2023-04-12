import User from "../model/User.js";
import {
    BadRequestError,
    NotAuthenticationError,
} from "../errors/index.js";
import { yellow, green, bgCyan, underline } from "console-log-colors";

const register = async (req, res) => {
    const { email, name, password } = req.body;
    // # 这里 throw 的 error 都会进入到 error-handler middleware 里。之所以会这样是因为使用了 "express-async-errors" module
    // if the required fields are empty, throw error directly from server side validation with the help of defined error handlers
    if (!name || !password || !email) {
        throw new BadRequestError(
            "Please provide all values - from server error handler"
        );
    }
    // if the user already exists, throw error directly from server side validation with the help of defined error handlers
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        throw new BadRequestError(
            "User already in use - from server error handler"
        );
    }
    // create the new user
    const newUser = await User.create(req.body);

    // use the Instance Methods with Mongoose to create json web token based on the password property
    const token = newUser.createJWT();
    console.log(bgCyan.yellow.underline("New user registered!"));
    newUser.password = undefined;

    res.status(201).json({
        user: newUser,
        token,
        location: newUser.location,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // if the required fields are empty, throw error directly from server side validation with the help of defined error handlers
    if (!email || !password) {
        throw new BadRequestError(
            "Please provide all values - from server error handler"
        );
    }
    // If the user exists, we will need to validate the password then. But if the user doesn't exist, we want to send back vague unauthenticated error response.
    // 使用 "+password" 用于获取 password field。否则默认情况下因为设置了 "select: false", password是无法被获取的
    let foundUser = await User.findOne({ email }).select("+password");
    if (!foundUser) {
        throw new NotAuthenticationError(
            "No such user in the db - from server error handler"
        );
    }
    const isPasswordMatch = await foundUser.validatePassword(
        password
    );

    if (!isPasswordMatch) {
        throw new NotAuthenticationError(
            "Password not match - from server error handler"
        );
    }

    console.log(bgCyan.green.underline("An user logged in!"));

    // After successful validation, we will create the jwt token, and send back that with the response
    const token = foundUser.createJWT();
    foundUser.password = undefined;
    res.status(200).json({
        token,
        user: foundUser,
        location: foundUser.location,
    });
};

const updateUser = async (req, res) => {
    const { email, lastName, location, name } = req.body;
    if (!email || !name || !lastName || !location) {
        throw new BadRequestError(
            "Please provide all values when updating profile - from server error handler"
        );
    }
    // 在 authorize user(详情见 /middleware/auth.js) 过程中添加了 "req.user = { userId: payload.userId }"
    const userId = req.user.userId;

    // * 根据 userId 寻找对应的 user 并对他的各个 field 进行更新
    const updatedUser = await User.findOne({ _id: userId });
    updatedUser.email = email;
    updatedUser.name = name;
    updatedUser.lastName = lastName;
    updatedUser.location = location;

    await updatedUser.save();

    // * 这一步骤是 optional, 我们使用的目的是为了重新设置 jwt 的 expire time
    const token = updatedUser.createJWT();
    res.status(200).json({
        token,
        user: updatedUser,
        location: updatedUser.location,
    });
};

export { register, updateUser, login };
