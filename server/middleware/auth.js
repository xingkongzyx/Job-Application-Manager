import jwt from "jsonwebtoken";
import { NotAuthenticationError } from "../errors/index.js";

const authenticateUser = async (req, res, next) => {
    /* 
    # 针对某些 route 进行 user authorization, 如果发送的 request 的 headers 中没有包含正确的 token, 则不允许对某些 routes 进行 access
    */
    let token = req.headers.authorization;
    // token: "Bearer ****"

    if (!token || !token.startsWith("Bearer")) {
        throw new NotAuthenticationError(
            "need JWT in req.headers or authorization token prefix is not correct - from server error handler "
        );
    }
    // 提取 "Bearer **" 后面 "**" 部分的真正想要进行验证部分的数据
    let tokenData = token.split(" ")[1];
    try {
        const payload = jwt.verify(tokenData, process.env.JWT_SECRET);
        /* 
        payload: {
                userId: '63d9956408455c7ed9bb164c',
                iat: 1675203985,
                exp: 1675290385
            }
        */
        // * 给 request 加上新的 userId field, 确保在 /updateUser 中能够根据 userId 找到对应的 user 并进行 profile update
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        throw new NotAuthenticationError(
            "Token is not match - from server error handler "
        );
    }
};

export default authenticateUser;
