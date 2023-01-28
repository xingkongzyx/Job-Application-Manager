const register = (req, res) => {
    res.send("register");
};
const login = (req, res) => {
    res.send("log in");
};

const updateUser = (req, res) => {
    res.send("update");
};

export { register, updateUser, login };
