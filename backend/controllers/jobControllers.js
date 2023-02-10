import { BadRequestError, NotFoundError } from "../errors/index.js";
import Job from "../model/Job.js";
import checkPermission from "./utils/checkPermission.js";
import mongoose from "mongoose";
import moment from "moment";

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
    let queryObj = { createdBy: req.user.userId };

    // 检查访问的 url 中是否含有 search query, 有的话将 searchKeyword 也加入搜索标准中
    const searchKeyword = req.query.search;
    if (searchKeyword) {
        queryObj.position = { $regex: searchKeyword, $options: "i" };
    }

    const jobs = await Job.find(queryObj);

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

    // * 首先判断 url 中传入的 jobId 是否是mongodb能够接受的合法 id
    if (mongoose.Types.ObjectId.isValid(jobId) === false) {
        throw new NotFoundError(
            `jobId ${jobId} is invalid. DELETE failed`
        );
    }
    // * 其次判断根据这个 jobId 能够找到对应的 job, 如果不能, 直接报错
    const foundJob = await Job.findOne({ _id: jobId });
    if (!foundJob) {
        throw new NotFoundError(
            `Can not find job with id: ${jobId}. DELETE failed`
        );
    }

    // * 在这之后, 对当前 user 的 permission 进行检查, 如果当前 User 不是创建工作的原 user, 不允许它对当前 job data 进行更改. 但是为了防止后续添加 admin 的角色, 所以不在 mongoose 的function中进行检查, 而是单独创建一个方程, 其中更方便包含针对 admin 的处理逻辑
    checkPermission(req.user, foundJob.createdBy);

    // * 最后, 将这个 job 从数据库中移除
    await foundJob.remove();

    res.status(200).json({ msg: "Success, job removed!" });
};

const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        {
            // * We find all the jobs that belong to a certain user.
            $match: {
                createdBy: mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            // * after the above matching, then group them by the application status and count the number of each status
            $group: { _id: "$status", count: { $sum: 1 } },
        },
    ]);
    /* 
    此时的 stats:
    {
        "stats": [
            {
                "_id": "Declined",
                "count": 36
            },
            {
                "_id": "Interviewing",
                "count": 34
            },
            {
                "_id": "Applied",
                "count": 32
            }
        ]
    }
    */

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});
    /* 
    经过 reduce function 整理之后:
    {
        "stats": {
            "Declined": 36,
            "Interviewing": 34,
            "Applied": 32
        }
    }
    */

    const defaultStats = {
        Interviewing: stats.Interviewing || 0,
        Applied: stats.Applied || 0,
        Declined: stats.Declined || 0,
    };
    /* 
    // * create defaultStats 的意义在于: 如果用户刚刚注册处于没有数据的状态, 后端也要给与各个 status 默认值, 否则前端会出现错误
    {
        "defaultStats": {
            "Interviewing": 0,
            "Applied": 0,
            "Declined": 0
        }
    }
    
    */

    // * 从 db 中获取 monthlyApplications 的数据(为了前端显示方便, 只获取最新的六个)
    let monthlyApplications = await Job.aggregate([
        {
            $match: {
                createdBy: mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group: {
                _id: {
                    year: {
                        $year: "$createdAt",
                    },
                    month: {
                        $month: "$createdAt",
                    },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 },
    ]);
    // 对于在上面获取的 monthlyApplications data 进行格式化, 方便前端使用数据
    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;
            // accepts 0-11
            const date = moment()
                .month(month - 1)
                .year(year)
                .format("MMM Y");
            return { date, count };
        })
        .reverse();
    res.status(201).json({ monthlyApplications, defaultStats });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
