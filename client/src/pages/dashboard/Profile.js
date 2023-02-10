import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert, FormRow } from "../../components/";

function Profile() {
    const { displayAlert, user, updateUser, isLoading, showAlert } =
        useAppContext();

    const [name, setName] = useState(user.name || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [location, setLocation] = useState(user.location || "");
    const [email, setEmail] = useState(user.email || "");

    const onSubmit = (event) => {
        event.preventDefault();
        if (!name || !email || !lastName || !location) {
            // test and remove temporary
            displayAlert();
            return;
        }

        updateUser({ name, email, lastName, location });
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={onSubmit}>
                <h3>Profile</h3>
                {showAlert ? <Alert /> : ""}
                <div className="form-center">
                    <FormRow
                        inputType="text"
                        value={name}
                        handleChange={(e) => {
                            setName(e.target.value);
                        }}
                        name="name"
                    />
                    <FormRow
                        inputType="text"
                        value={lastName}
                        handleChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        name="lastName"
                    />
                    <FormRow
                        inputType="text"
                        value={location}
                        handleChange={(e) => {
                            setLocation(e.target.value);
                        }}
                        name="location"
                    />
                    <FormRow
                        className="form-center"
                        inputType="email"
                        value={email}
                        handleChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        name="email"
                    />
                    <button
                        className="btn btn-block"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Please Wait..."
                            : "save changes"}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
}

export default Profile;
