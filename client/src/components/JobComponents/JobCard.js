// * 使用 moment 的用处是在于以更好的形式展现时间
import moment from "moment";
import {
    FaLocationArrow,
    FaBriefcase,
    FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/Job";
import JobCardInfo from "./JobCardInfo";

const JobCard = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    status,
}) => {
    const { setEditJob, deleteJob } = useAppContext();

    let date = moment(createdAt);
    date = date.format("MMM Do, YYYY");

    return (
        <Wrapper>
            <header>
                <div className="main-icon">
                    {company.substring(0, 2)}
                </div>
                <div className={`top-status ${status}`}>{status}</div>
                <div className="info">
                    <h5>
                        {position.charAt(0).toUpperCase() +
                            position.slice(1)}
                    </h5>
                    <p>Company: {company}</p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    {/* 这里创建的是 关于 job 的一些 information */}
                    <JobCardInfo
                        icon={<FaLocationArrow />}
                        text={jobLocation}
                    />
                    <JobCardInfo
                        icon={<FaCalendarAlt />}
                        text={date}
                    />
                    <JobCardInfo
                        icon={<FaBriefcase />}
                        text={jobType}
                    />
                    {/* <div className={`status ${status}`}>{status}</div> */}
                </div>
                <footer>
                    {/* footer 中创建的是两个 buttons */}
                    <div className="actions">
                        {/* 点击这个 button 时希望回到 addJob 界面，只不过在这个界面此时应该有的功能是 edit job */}
                        <Link
                            to="/add-job"
                            onClick={() => setEditJob(_id)}
                            className="btn edit-btn"
                        >
                            Edit
                        </Link>
                        <button
                            type="button"
                            className="btn delete-btn"
                            onClick={() => deleteJob(_id)}
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
};

export default JobCard;
