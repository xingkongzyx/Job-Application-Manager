import { BadRequestError, NotFoundError } from "../errors/index.js";
import Job from "../model/Job.js";

const createJob = async (req, res) => {
    const { position, company } = req.body;

    // 检查 db required 的两个property是否有缺失
    if (!position || !company) {
        throw new BadRequestError(
            "Please Provide required position and company values"
        );
    }
    // req.user.userId 是来自于 auth middle 中的关于 req.userId 的设置
    req.body.createdBy = req.user.userId;

    // 根据 req.body 在 db 中创建一个新的 job
    const job = await Job.create(req.body);
    res.status(201).json({ job });
};

const deleteJob = async (req, res) => {
    res.send("deleteJob route works");
};

const getAllJobs = async (req, res) => {
    res.send("getAllJobs route works");
};

const updateJob = async (req, res) => {
    res.send("updateJob route works");
};

const showStats = async (req, res) => {
    res.send("showStats route works");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
