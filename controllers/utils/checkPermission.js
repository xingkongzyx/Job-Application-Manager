import { NotAuthenticationError } from "../../errors/index.js";

const checkPermission = (requestUser, userIdOfCurJob) => {
    // * 就是因为假设后面加上了一个 admin user, 对于 admin 即使 id 不匹配, 也有权限删除所有的工作
    // if (requestUser.role === "admin") return;

    if (requestUser.userId === userIdOfCurJob.toString()) return;

    throw new NotAuthenticationError(
        "You do not have permission to EDIT/DELETE this job"
    );
};

export default checkPermission;
