import User from "../model/User.js";

const register = async (req, res) => {
    // console.log("req body is: ", req.body);
    try {
        console.log("req body is: ", req.body);
        const newUser = await User.create(req.body);
        res.status(201).json({ newUser });
    } catch (e) {
        console.log("error");
        res.status(500).json({ msg: e });
    }
};
const login = async (req, res) => {
    res.send("log in route works");
};

const updateUser = async (req, res) => {
    res.send("update route works");
};

export { register, updateUser, login };
