import React, { useState } from "react";
import UserForm from "./UserForm";
import api from "../utils/axios";

const AddUser = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleOnSubmit = (user) => {
        api.post(`/v1/users/`, { ...user })
            .then((res) => {
                setError("");
                setSuccess("Added.");
            })
            .catch((err) => {
                setSuccess("");
                setError(err.response.data.error);
            });
    };

    return (
        <React.Fragment>
            <UserForm
                handleOnSubmit={handleOnSubmit}
                error={error}
                success={success}
            />
        </React.Fragment>
    );
};

export default AddUser;
