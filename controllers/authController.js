import User from "../model/User.js";
import { BadRequestError } from "../errors/index.js";

const register = async (req, res) => {
    const { email, name, password } = req.body;
    // if the required fields are empty, throw error directly from server side with the help of defined error handlers
    if (!name || !password || !email) {
        throw new BadRequestError(
            "Please provide all values - from server error handler"
        );
    }
    // if the user already exists, throw error directly from server side with the help of defined error handlers
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        throw new BadRequestError(
            "User already in use - from server error handler"
        );
    }
    // create the new user
    const newUser = await User.create(req.body);
    const token = newUser.createJWT();
    res.status(201).json({
        user: {
            email: newUser.email,
            lastName: newUser.lastName,
            location: newUser.location,
            name: newUser.name,
        },
        token,
    });
};
const login = async (req, res) => {
    res.send("log in route works");
};

const updateUser = async (req, res) => {
    res.send("update route works");
};

export { register, updateUser, login };
