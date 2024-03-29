import styled from "styled-components";

const Wrapper = styled.aside`
    @media (min-width: 992px) {
        display: none;
    }
    .sidebar-container {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: -1;
        opacity: 0;
        transition: var(--transition);
    }
    .show-sidebar {
        z-index: 99;
        opacity: 1;
    }
    .content {
        background: var(--white);
        width: var(--fluid-width);
        /* height: 95vh; */
        border-radius: var(--borderRadius);
        padding: 4rem 2rem;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .close-btn {
        position: absolute;
        top: 10px;
        left: 10px;
        background: transparent;
        border-color: transparent;
        font-size: 2rem;
        color: var(--red-dark);
        cursor: pointer;
    }
    .nav-links {
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        width: 45vw;
    }
    .nav-link {
        display: flex;
        align-items: center;
        color: var(--grey-500);
        padding: 1rem 0;
        text-transform: capitalize;
        transition: var(--transition);
    }
    .nav-link:hover {
        color: var(--grey-900);
    }
    .nav-link:hover .icon {
        color: var(--primary-500);
    }
    .icon {
        font-size: 1.5rem;
        margin-right: 1rem;
        display: grid;
        place-items: center;
        transition: var(--transition);
    }
    .nav-link-add-button {
        display: flex;
        align-items: center;
        margin-top: 3vh;
        text-transform: capitalize;
        transition: var(--transition);
        border-radius: 50%;

        font-weight: bold;
        color: var(--white);
        background: var(--primary-500);
    }
    .nav-link-add-button.active {
        display: flex;
        align-items: center;
        margin-top: 3vh;
        text-transform: capitalize;
        transition: var(--transition);
        border-radius: 50%;

        font-weight: bold;
        background: gainsboro;
        color: #8e9195f7;
    }
    .nav-link-add-button::before {
        content: "+";
        height: 3rem;
        width: 3rem;
        font-size: 3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-family: courier;

        border-radius: 50%;
    }
    .nav-link-add-button:hover {
        background: var(--primary-300);
        /* padding-left: 2rem;
        color: var(--black);
        border: 1.5px solid black;
        font-weight: bold; */
    }

    .active {
        color: var(--grey-900);
        background: gainsboro;
    }
    .active .icon {
        color: var(--primary-500);
    }
`;
export default Wrapper;
