import express from "express";
import {
    updateUser,
    login,
    register,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
// 使用 authenticateUser middleware 确保只有在用户得到验证的情况下才能访问这个 route
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
