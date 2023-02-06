import { BadRequestError, NotFoundError } from "../errors/index.js";
import Job from "../model/Job.js";
import checkPermission from "./utils/checkPermission.js";
import mongoose from "mongoose";
const createJob = async (req, res) => {
    const { position, company } = req.body;

    // 检查 db required 的两个property是否有缺失
    if (!position || !company) {
        throw new BadRequestError(
            "Please Provide required position and company values when create"
        );
    }
    // req.user.userId 是来自于 auth middle 中的关于 req.userId 的设置
    req.body.createdBy = req.user.userId;

    // 根据 req.body 在 db 中创建一个新的 job
    const job = await Job.create(req.body);
    res.status(201).json({ job });
};

const getAllJobs = async (req, res) => {
    // 根据 userId 寻找当前用户创造的所有 jobs
    const jobs = await Job.find({ createdBy: req.user.userId });
    res.send({ jobs, numOfJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
    // * url: /api/v1/jobs/:id
    // * 从 url 获取当前正在修改的 job 的 Id
    const jobId = req.params.id;

    if (mongoose.Types.ObjectId.isValid(jobId) === false) {
        throw new NotFoundError(
            `jobId ${jobId} is invalid. UPDATE failed`
        );
    }

    const { company, position } = req.body;

    // * 这两个 value 是 required, 必须在前端进行提供
    if (!company || !position) {
        throw new BadRequestError(
            "Please provide position and company values when update"
        );
    }

    const foundJob = await Job.findOne({ _id: jobId });
    if (!foundJob) {
        throw new NotFoundError(
            `Can not find job with id: ${jobId}. UPDATE failed`
        );
    }

    // * 对当前 user 的 permission 进行检查, 如果当前 User 不是创建工作的原 user, 不允许它对当前 job data 进行更改. 但是为了防止后续添加 admin 的角色, 所以不在 mongoose 的function中进行检查, 而是单独创建一个方程, 其中更方便包含针对 admin 的处理逻辑
    checkPermission(req.user, foundJob.createdBy);

    // * 根据 jobId 寻找对应的 job 并根据 req.body 中的 value 进行更新
    const updatedJob = await Job.findOneAndUpdate(
        { _id: jobId },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({ updatedJob });
};

const deleteJob = async (req, res) => {
    // * url: /api/v1/jobs/:id
    // * 从 url 获取当前正在修改的 job 的 Id
    const jobId = req.params.id;
    if (mongoose.Types.ObjectId.isValid(jobId) === false) {
        throw new NotFoundError(
            `jobId ${jobId} is invalid. DELETE failed`
        );
    }
    const foundJob = await Job.findOne({ _id: jobId });
    if (!foundJob) {
        throw new NotFoundError(
            `Can not find job with id: ${jobId}. DELETE failed`
        );
    }

    // * 对当前 user 的 permission 进行检查, 如果当前 User 不是创建工作的原 user, 不允许它对当前 job data 进行更改. 但是为了防止后续添加 admin 的角色, 所以不在 mongoose 的function中进行检查, 而是单独创建一个方程, 其中更方便包含针对 admin 的处理逻辑
    checkPermission(req.user, foundJob.createdBy);

    await foundJob.remove();

    res.status(200).json({ msg: "Success, job removed!" });
};

const showStats = async (req, res) => {
    res.send("showStats route works");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
