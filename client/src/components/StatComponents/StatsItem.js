import Wrapper from "../../assets/wrappers/StatItem";

function StatItem({ count, title, icon, color, bcg }) {
    return (
        // pass the props(color and background) to the styled component, so that styled component can use it for styling.
        <Wrapper color={color} bcg={bcg}>
            <header>
                <span className="count">{count}</span>
                <div className="icon">{icon}</div>
            </header>
            <h5 className="title">{title}</h5>
        </Wrapper>
    );
}

export default StatItem;
