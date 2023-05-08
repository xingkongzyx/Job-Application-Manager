import styled from "styled-components";

const Wrapper = styled.aside`
    display: none;
    @media (min-width: 992px) {
        display: block;
        box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
        .sidebar-container {
            background: var(--white);
            min-height: 100vh;
            height: 100%;
            width: 250px;
            margin-left: -250px;
            transition: var(--transition);
        }
        .content {
            position: sticky;
            top: 0;
        }
        .show-sidebar {
            margin-left: 0;
        }
        header {
            height: 6rem;
            display: flex;
            align-items: center;
            padding-left: 2.5rem;
        }
        .logo {
            width: 85%;
        }
        .nav-links {
            padding-top: 2rem;
            display: flex;
            flex-direction: column;
            height: 60vh;
            justify-content: space-around;
        }
        .nav-link {
            display: flex;
            align-items: center;
            color: var(--grey-500);
            padding: 1rem 0;
            padding-left: 2.5rem;
            text-transform: capitalize;
            transition: var(--transition);
        }
        .nav-link-add-button {
            display: flex;
            align-items: center;
            color: var(--grey-500);
            margin-top: 15vh;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            padding: 1rem 0;
            padding-left: 1.5rem;
            text-transform: capitalize;
            transition: var(--transition);
            background: var(--grey-200);
            border-radius: 30px;
            border: 1px solid black;
            font-weight: bold;
        }
        .nav-link-add-button:hover {
            background: var(--grey-400);
            padding-left: 2rem;
            color: var(--black);
            border: 1px solid black;
            font-weight: bold;
        }
        .nav-link:hover {
            background: var(--grey-50);
            padding-left: 3rem;
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
        .active {
            color: var(--grey-900);
            background: gainsboro;
        }
        .active .icon {
            color: var(--primary-500);
        }
    }
`;
export default Wrapper;
