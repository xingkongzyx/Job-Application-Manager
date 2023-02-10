import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
    {
        id: 1,
        text: "Statistics",
        // * 这里的 path 对应着 <App /> 中设置的 <SharedLayout /> 中的各个 link
        path: "/",
        icon: <IoBarChartSharp />,
    },
    {
        id: 2,
        text: "All Applications",
        path: "all-jobs",
        icon: <MdQueryStats />,
    },
    // {
    //     id: 3,
    //     text: "add job",
    //     path: "add-job",
    //     icon: <FaWpforms />,
    // },
    {
        id: 3,
        text: "Profile",
        path: "profile",
        icon: <ImProfile />,
    },
];

export default links;
