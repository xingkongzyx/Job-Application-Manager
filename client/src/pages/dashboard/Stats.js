import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
    StatsContainer,
    Loading,
    ChartsContainer,
} from "../../components";

const Stats = () => {
    const {
        showJobStats,
        isLoading,
        monthlyJobApplications,
        jobStats,
    } = useAppContext();
    useEffect(() => {
        showJobStats();
    }, []);

    if (isLoading) {
        return <Loading center />;
    }

    return (
        <>
            <StatsContainer />
            {/*  */}
            {monthlyJobApplications.length > 0 ? (
                <ChartsContainer />
            ) : (
                ""
            )}
        </>
    );
};

export default Stats;
