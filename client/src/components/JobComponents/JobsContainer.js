import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import Loading from "../Loading";
import JobCard from "./JobCard";
import Wrapper from "../../assets/wrappers/JobsContainer";

const JobsContainer = () => {
    const { getAllJobs, jobs, isLoading, numOfJobs, searchKeyWord } =
        useAppContext();

    useEffect(() => {
        getAllJobs();
    }, [searchKeyWord]);

    if (isLoading) {
        return <Loading center />;
    }
    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h5>
                {numOfJobs} job{jobs.length > 1 && "s"} found
            </h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <JobCard key={job._id} {...job} />;
                })}
            </div>
        </Wrapper>
    );
};

export default JobsContainer;
