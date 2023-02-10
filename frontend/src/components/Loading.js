// 用于在 JobsContainer 界面使用
const Loading = ({ center }) => {
    return (
        <div
            className={center ? "loading loading-center" : "loading"}
        ></div>
    );
};

export default Loading;
