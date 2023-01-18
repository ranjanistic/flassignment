import React, { useContext, useEffect, useState } from "react";
import UserForm from "./UserForm";
import { useParams } from "react-router-dom";
import api from "../utils/axios";

const EditUser = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { id } = useParams();
    useEffect(() => {
        api.get(`/v1/users/${id}`)
            .then((res) => {
                setError("");
                setUser(res.data);
            })
            .catch((err) => {
                setSuccess("");
                setError(err.data.error);
            });
    }, []);

    const handleOnSubmit = (user) => {
        api.put(`/v1/users/${id}`, { ...user })
            .then((res) => {
                setError("");
                setSuccess("User updated.");
            })
            .catch((err) => {
                setSuccess("");
                setError(err.data.error);
            });
    };

    return (
        <div>
            <UserForm
                user={user}
                handleOnSubmit={handleOnSubmit}
                error={error}
                success={success}
            />
        </div>
    );
};

export default EditUser;
