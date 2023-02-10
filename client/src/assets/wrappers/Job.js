import styled from "styled-components";

const Wrapper = styled.article`
    background: var(--white);
    border-radius: var(--borderRadius);
    display: grid;
    grid-template-rows: 1fr auto;
    box-shadow: var(--shadow-2);

    header {
        padding: 1rem 1.5rem;
        padding-right: 0;
        border-bottom: 1px solid var(--grey-100);
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        h5 {
            letter-spacing: 0;
        }
    }
    .main-icon {
        width: 60px;
        height: 60px;
        display: grid;
        place-items: center;
        background: var(--primary-500);
        border-radius: var(--borderRadius);
        font-size: 1.5rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--white);
        margin-right: 2rem;
    }
    .info {
        h5 {
            margin-bottom: 0.25rem;
        }
        p {
            margin: 0;
            text-transform: capitalize;
            color: var(--grey-400);
            letter-spacing: var(--letterSpacing);
        }
    }
    .Applied {
        background: #fcefc7;
        color: #e9b949;
    }
    .Interviewing {
        background: #e0e8f9;
        color: #647acb;
    }
    .Declined {
        color: #d66a6a;
        background: #ffeeee;
    }
    .content {
        padding: 1rem 1.5rem;
    }
    .content-center {
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 0.5rem;
        @media (min-width: 576px) {
            grid-template-columns: 1fr 1fr;
        }
        @media (min-width: 992px) {
            grid-template-columns: 1fr;
        }
        @media (min-width: 1120px) {
            grid-template-columns: 1fr 1fr;
        }
    }

    .status {
        border-radius: var(--borderRadius);
        text-transform: capitalize;
        letter-spacing: var(--letterSpacing);
        text-align: center;
        width: 100px;
        height: 30px;
    }
    .top-status {
        border-radius: var(--borderRadius);
        text-transform: capitalize;
        letter-spacing: var(--letterSpacing);
        height: 100%;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: large;
        place-self: end right;
    }
    footer {
        margin-top: 1rem;
    }
    .edit-btn,
    .delete-btn {
        letter-spacing: var(--letterSpacing);
        cursor: pointer;
        height: 30px;
    }
    .edit-btn {
        color: var(--green-dark);
        background: var(--green-light);
        margin-right: 0.5rem;
    }
    .delete-btn {
        color: var(--red-dark);
        background: var(--red-light);
    }
    &:hover .actions {
        visibility: visible;
    }
    .actions {
        display: flex;
        justify-content: flex-start;
        gap: 10%;
    }
`;

export default Wrapper;
