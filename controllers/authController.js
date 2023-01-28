const register = async (req, res) => {
    res.send("register route works");
};
const login = async (req, res) => {
    res.send("log in route works");
};

const updateUser = async (req, res) => {
    res.send("update route works");
};

export { register, updateUser, login };
