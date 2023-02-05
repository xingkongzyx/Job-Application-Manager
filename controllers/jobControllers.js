import { BadRequestError, NotFoundError } from "../errors/index.js";
import Job from "../model/Job.js";

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

const deleteJob = async (req, res) => {
    res.send("deleteJob route works");
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
    const { company, position } = req.body;

    // * 这两个 value 是 required，必须在前端进行提供
    if (!company || !position) {
        throw new BadRequestError(
            "Please provide position and company values when update"
        );
    }

    const foundJob = await Job.findOne({ _id: jobId });
    if (!foundJob) {
        console.log("asdasdsa");
        throw new NotFoundError("Can not find job with id: ", jobId);
    }
    console.log(foundJob);
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

const showStats = async (req, res) => {
    res.send("showStats route works");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
