import React, { useEffect } from "react";

function Dashboard() {
    useEffect(() => {
        const fetchData = () => {
            fetch("/api/v1")
                .then((res) => res.json())
                .then((data) => console.log(data));
        };
        try {
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return <div>Dashboard</div>;
}

export default Dashboard;
