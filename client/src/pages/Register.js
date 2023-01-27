import React from "react";
import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialValues = {
    name: "",
    email: "",
    password: "",
    // 用于检查是否已经在这个网站注册过
    isMember: true,
};

function Register() {
    const [values, setValues] = useState(initialValues);
    const contextValues = useAppContext();
    const { showAlert, isLoading, displayAlert } = contextValues;
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
        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            return;
        }
        console.log(values);
    };

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                {showAlert ? <Alert /> : ""}
                <h3>{values.isMember ? "Login" : "Register"}</h3>

                {/* name field */}
                <FormRow
                    inputType="name"
                    name="name"
                    value={values.name}
                    handleChange={handleChange}
                />
                {/* email field, only display when register(means isMember == false) */}
                {!values.isMember && (
                    <FormRow
                        inputType="email"
                        name="email"
                        value={values.email}
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

                <button type="submit" className="btn btn-block">
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
