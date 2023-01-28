import express from "express";
import {
    createJob,
    deleteJob,
    getAllJobs,
    updateJob,
    showStats,
} from "../controllers/jobControllers.js";

const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);
// place before :id, 防止永远无法到达 ":id"
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
