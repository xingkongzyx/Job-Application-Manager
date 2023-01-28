const createJob = async (req, res) => {
    res.send("createJob route works");
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
