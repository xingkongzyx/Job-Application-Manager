import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data }) => {
    // ResponsiveContainer 是一个容器型的组件，用来处理图表的宽高需要适配父节点宽高的问题。建议宽度、高度至少有一个属性是百分比，否则可以直接指定图表的宽度、高度。
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 50 }}>
                <CartesianGrid strokeDasharray="10 10 " />
                {/* dataKey 中填入的值对应下面 object 的属性 {count: 1, date: "Jul 2021"} */}
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                {/* 传入每个 bar 具体的数据 */}
                <Bar dataKey="count" fill="#c4b5fd" barSize={75} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
