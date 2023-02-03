import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "Please provide company name"],
            maxlength: 50,
        },
        position: {
            type: String,
            required: [true, "Please provide position"],
            maxlength: 100,
        },
        status: {
            type: String,
            enum: ["Interviewing", "Applied", "Declined"],
            default: "Applied",
        },
        jobType: {
            type: String,
            enum: ["full-time", "part-time", "internship"],
            default: "full-time",
        },
        jobLocation: {
            type: String,
            default: "US",
            required: true,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [
                true,
                "Please provide an user who created this job",
            ],
        },
    },
    { timestamps: true }
);

const JobModel = mongoose.model("Job", JobSchema);
export default JobModel;
