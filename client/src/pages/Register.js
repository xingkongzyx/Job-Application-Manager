import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialValues = {
    name: "",
    email: "",
    password: "",
    // 用于检查当前用户是否已经在注册过
    isMember: true,
};

function Register() {
    const [values, setValues] = useState(initialValues);
    const navigate = useNavigate();
    const contextValues = useAppContext();

    const {
        showAlert,
        isLoading,
        displayAlert,
        registerUser,
        user,
        loginUser,
    } = contextValues;

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // 用于改变当前的状态
    const toggleMember = function () {
        setValues({ ...values, isMember: !values.isMember });
    };

    const onSubmit = function (event) {
        event.preventDefault();
        const { name, email, password, isMember } = values;

        // 首先检查, 这些 value 不为空
        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            return;
        }
        let currentUser = { name, email, password };

        // 根据 isMember 状态的不同决定调用哪个方法
        if (isMember) {
            loginUser(currentUser);
        } else {
            // 调用从 appContext 中传入的 registerUser method
            registerUser(currentUser);
        }
    };

    // we will invoke this one on initial render and every time the user or navigate changes.
    // * 成功添加功能：一旦用户注册或登录，用户最终将从注册页面导航到dashboard，也就是我们的主页。
    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [user, navigate]);

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                {/* <Logo /> */}
                {showAlert ? <Alert /> : ""}
                <h3>{values.isMember ? "Login" : "Register"}</h3>

                {/* name field */}
                <FormRow
                    inputType="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                />
                {/* name field, only display when register(means isMember == false) */}
                {!values.isMember && (
                    <FormRow
                        inputType="name"
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}

                {/* password field */}
                <FormRow
                    inputType="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                />

                <button
                    type="submit"
                    className="btn btn-block"
                    disabled={isLoading}
                >
                    submit
                </button>

                {/* if it is a member, display login, else display register */}
                <p>
                    {values.isMember
                        ? "Not a member yet?"
                        : "Already a member?"}

                    <button
                        type="button"
                        onClick={toggleMember}
                        className="member-btn"
                    >
                        {values.isMember ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}

export default Register;
