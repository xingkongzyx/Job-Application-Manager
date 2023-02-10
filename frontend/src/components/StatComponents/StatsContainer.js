import { useAppContext } from "../../context/appContext";
import StatItem from "./StatsItem";
import {
    FaSuitcaseRolling,
    FaCalendarCheck,
    FaBug,
} from "react-icons/fa";
import Wrapper from "../../assets/wrappers/StatsContainer";
const StatsContainer = () => {
    const { jobStats } = useAppContext();
    const defaultStats = [
        {
            title: "Applied Jobs",
            count: jobStats.Applied || 0,
            icon: <FaSuitcaseRolling />,
            color: "#e9b949",
            bcg: "#fcefc7",
        },
        {
            title: "During Interview",
            count: jobStats.Interviewing || 0,
            icon: <FaCalendarCheck />,
            color: "#647acb",
            bcg: "#e0e8f9",
        },
        {
            title: "Declined Jobs",
            count: jobStats.Declined || 0,
            icon: <FaBug />,
            color: "#d66a6a",
            bcg: "#ffeeee",
        },
    ];

    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <StatItem key={index} {...item} />;
            })}
        </Wrapper>
    );
};

export default StatsContainer;
