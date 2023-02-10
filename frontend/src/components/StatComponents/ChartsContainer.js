import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/ChartsContainer";
import { useAppContext } from "../../context/appContext";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";

function ChartsContainer() {
    const { monthlyJobApplications } = useAppContext();
    const [showBarChart, setShowBarChart] = useState(true);
    return (
        <Wrapper>
            <h3>Monthly Applications Statistics</h3>
            <button
                type="button"
                onClick={() => {
                    setShowBarChart(!showBarChart);
                }}
            >
                {showBarChart ? "Area Chart" : "Bar Chart"}
            </button>
            {showBarChart ? (
                <BarChart data={monthlyJobApplications} />
            ) : (
                <AreaChart data={monthlyJobApplications} />
            )}
        </Wrapper>
    );
}

export default ChartsContainer;
